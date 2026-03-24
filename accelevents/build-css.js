import { execSync } from "child_process";
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isDev = process.env.NODE_ENV !== "production";

// Build main CSS
buildEntry("main", path.resolve(__dirname, "./src/scss/main.scss"), "./dist/hosted/css", {
  prependCss: path.resolve(__dirname, "./src/css/mofo-site-base.css"),
});

// Build widget CSS — each .scss file in src/scss/widgets/ becomes its own compiled output
const widgetsDir = path.resolve(__dirname, "./src/scss/widgets");
try {
  const widgetFiles = readdirSync(widgetsDir).filter((f) => f.endsWith(".scss"));
  for (const file of widgetFiles) {
    const entry = `widget-${file.replace(".scss", "")}`;
    buildEntry(entry, path.resolve(widgetsDir, file), "./dist/embed", { minify: false });
  }
} catch (err) {
  if (err.code !== "ENOENT") {
    console.error("Failed to read widgets directory:", err.message);
    process.exit(1);
  }
}

function buildEntry(entry, inputPath, outputDir, { minify = false, prependCss = null } = {}) {
  const tempOutput = path.resolve(__dirname, `./dist/temp/${entry}.unprocessed.css`);
  const finalOutput = path.resolve(__dirname, `${outputDir}/${entry}.compiled.css`);

  mkdirSync(path.resolve(__dirname, "./dist/temp"), { recursive: true });
  mkdirSync(path.resolve(__dirname, outputDir), { recursive: true });

  try {
    const sassCmd = isDev
      ? `sass ${inputPath} ${tempOutput} --source-map --quiet`
      : minify
        ? `sass ${inputPath} ${tempOutput} --style=compressed --quiet`
        : `sass ${inputPath} ${tempOutput} --quiet`;

    execSync(sassCmd, { stdio: "inherit" });

    const postcssCmd = isDev
      ? `postcss ${tempOutput} -o ${finalOutput} --config ./postcss.config.js --map`
      : `postcss ${tempOutput} -o ${finalOutput} --config ./postcss.config.js`;

    execSync(postcssCmd, { stdio: "inherit" });

    const banner = `
.do-not-edit---generated-by-mozfest-hosted-assets-build-pipeline {
  /* mozfest-hosted-assets | Accelevents | ${entry} | built: ${new Date().toISOString()} */
  background: transparent;
}
`;
    const prepend = prependCss ? readFileSync(prependCss, "utf8") + "\n" : "";
    writeFileSync(finalOutput, banner + prepend + readFileSync(finalOutput, "utf8"));

    console.log(`Built CSS: ${entry} → ${finalOutput}`);
  } catch (err) {
    console.error(`Failed to build CSS (${entry}):`, err.message);
    process.exit(1);
  }
}
