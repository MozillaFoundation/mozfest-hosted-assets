import { execSync } from "child_process";
import { mkdirSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isDev = process.env.NODE_ENV !== "production";

// SCSS entry point (filename without extension)
const entry = "main";
const input = path.resolve(__dirname, `./src/scss/${entry}.scss`);
const tempOutput = path.resolve(__dirname, `./dist/temp/${entry}.unprocessed.css`);
const finalOutput = path.resolve(__dirname, `./dist/css/${entry}.compiled.css`);

mkdirSync(path.resolve(__dirname, "./dist/temp"), { recursive: true });
mkdirSync(path.resolve(__dirname, "./dist/css"), { recursive: true });

try {
  const sassCmd = isDev
    ? `sass ${input} ${tempOutput} --source-map --quiet`
    : `sass ${input} ${tempOutput} --style=compressed --quiet`;

  execSync(sassCmd, { stdio: "inherit" });

  const postcssCmd = isDev
    ? `postcss ${tempOutput} -o ${finalOutput} --config ./postcss.config.js --map`
    : `postcss ${tempOutput} -o ${finalOutput} --config ./postcss.config.js`;

  execSync(postcssCmd, { stdio: "inherit" });

  console.log(`Built CSS: ${entry}`);
} catch (err) {
  console.error("Failed to build CSS:", err.message);
  process.exit(1);
}
