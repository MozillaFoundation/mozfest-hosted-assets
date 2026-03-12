import { context, build } from "esbuild";
import { readdirSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const arg = process.argv.indexOf("--node-env");
const mode =
  arg > 0 ? process.argv[arg + 1] : process.env.NODE_ENV || "development";
const inProduction = mode === "production";

console.log("ESBuild running in production mode?", inProduction);

// JS entry point
const entry = "main";
const entryPoint = path.join(__dirname, `./src/js/${entry}.js`);
const outFile = path.join(__dirname, `./dist/hosted/js/${entry}.compiled.js`);

const buildTimestamp = new Date().toISOString();

const mainOpts = {
  entryPoints: [entryPoint],
  outfile: outFile,
  bundle: true,
  sourcemap: !inProduction,
  minify: inProduction,
  banner: { js: `/* mozfest-hosted-assets | Accelevents | ${entry} | built: ${buildTimestamp} */` },
  define: {
    "process.env.NODE_ENV": JSON.stringify(mode),
  },
};

// Widget JS — each .js file in src/js/widgets/ becomes its own compiled output
const widgetsDir = path.join(__dirname, "./src/js/widgets");
let widgetEntries = [];
try {
  widgetEntries = readdirSync(widgetsDir)
    .filter((f) => f.endsWith(".js"))
    .map((f) => path.join(widgetsDir, f));
} catch (err) {
  if (err.code !== "ENOENT") {
    console.error("Failed to read widgets directory:", err.message);
    process.exit(1);
  }
}

const widgetOpts = widgetEntries.map((entryFile) => {
  const widgetName = `widget-${path.basename(entryFile, ".js")}`;
  return {
    entryPoints: [entryFile],
    outfile: path.join(__dirname, `./dist/embed/${widgetName}.compiled.js`),
    bundle: true,
    sourcemap: !inProduction,
    minify: false,
    banner: { js: `/* mozfest-hosted-assets | Accelevents | ${widgetName} | built: ${buildTimestamp} */` },
    define: {
      "process.env.NODE_ENV": JSON.stringify(mode),
    },
  };
});

if (inProduction) {
  await build(mainOpts);
  console.log(`Built JS: ${entry}`);
  for (const opts of widgetOpts) {
    await build(opts);
    console.log(`Built JS: ${path.basename(opts.outfile)} → dist/embed/`);
  }
} else {
  const ctx = await context(mainOpts);
  await ctx.watch();
  console.log(`Watching JS: ${entry}...`);
  for (const opts of widgetOpts) {
    const widgetCtx = await context(opts);
    await widgetCtx.watch();
    console.log(`Watching JS: ${path.basename(opts.outfile)}...`);
  }
}
