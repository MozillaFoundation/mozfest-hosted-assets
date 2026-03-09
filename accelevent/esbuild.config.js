import { context, build } from "esbuild";
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
const outFile = path.join(__dirname, `./dist/js/${entry}.compiled.js`);

const opts = {
  entryPoints: [entryPoint],
  outfile: outFile,
  bundle: true,
  sourcemap: !inProduction,
  minify: inProduction,
  define: {
    "process.env.NODE_ENV": JSON.stringify(mode),
  },
};

if (inProduction) {
  await build(opts);
  console.log(`Built JS: ${entry}`);
} else {
  const ctx = await context(opts);
  await ctx.watch();
  console.log(`Watching JS: ${entry}...`);
}
