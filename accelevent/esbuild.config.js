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

const mainOpts = {
  entryPoints: [entryPoint],
  outfile: outFile,
  bundle: true,
  sourcemap: !inProduction,
  minify: inProduction,
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

const widgetOpts =
  widgetEntries.length > 0
    ? {
        entryPoints: widgetEntries,
        outdir: path.join(__dirname, "./dist/embed"),
        entryNames: "widget-[name].compiled",
        bundle: true,
        sourcemap: !inProduction,
        minify: false,
        define: {
          "process.env.NODE_ENV": JSON.stringify(mode),
        },
      }
    : null;

if (inProduction) {
  await build(mainOpts);
  console.log(`Built JS: ${entry}`);
  if (widgetOpts) {
    await build(widgetOpts);
    widgetEntries.forEach((e) =>
      console.log(`Built JS: ${path.basename(e)} → dist/embed/`)
    );
  }
} else {
  const ctx = await context(mainOpts);
  await ctx.watch();
  console.log(`Watching JS: ${entry}...`);
  if (widgetOpts) {
    const widgetCtx = await context(widgetOpts);
    await widgetCtx.watch();
    console.log("Watching widget JS...");
  }
}
