# MozFest Hosted Assets

Static assets for MozFest third-party platforms, built and hosted on S3.

## Development

This repo uses Yarn workspaces. Install dependencies from the root:

```bash
yarn install
```

Then run scripts per platform using `yarn workspace <platform> <script>`:

```bash
yarn workspace accelevent build
```

## Hosting

Hosted assets (`dist/hosted/`) are deployed to GitHub Pages on every push to `main` that changes source files. The deploy workflow builds the assets and publishes them via GitHub Actions. Widget assets (`dist/embed/`) are not deployed.

**Testing URL pattern:**

```text
https://mozillafoundation.github.io/mozfest-hosted-assets/{platform}/{css|js}/{filename}
```

**Production** assets are served from S3.

## Platforms

### Accelevents

#### Widget assets

Some Accelevents features are embedded via iframe. Because iframes block external stylesheets and scripts, widget assets cannot be loaded by URL — they must be pasted directly into the Accelevents dashboard.

**Sources:**

- CSS: `accelevent/src/scss/widgets/` — one `.scss` file per widget
- JS: `accelevent/src/js/widgets/` — one `.js` file per widget

**Compiled output:** `accelevent/dist/embed/` — generated automatically by `build:css` and `build:js`

**Deployment workflow:**

1. Edit the relevant file(s) in `src/scss/widgets/` or `src/js/widgets/`
2. Run `build` (or `build:css` / `build:js`) to compile
3. Copy the contents of `dist/embed/<widget>.compiled.css` or `dist/embed/<widget>.compiled.js` and paste into the Accelevents dashboard

#### Scripts

| Script | Description |
| --- | --- |
| `build` | Clean and compile CSS and JS for production |
| `build:css` | Compile SCSS to CSS |
| `build:js` | Bundle JS with esbuild |
| `dev` | Watch CSS and JS for changes |
| `clean` | Remove all compiled output |
| `clean:widgets` | Remove compiled widget output (`dist/embed/`) |
| `lint` | Run ESLint and Stylelint |
| `lint:js` | Lint JS with ESLint |
| `lint:scss` | Lint SCSS with Stylelint |
| `fix` | Auto-fix ESLint and Stylelint issues |
| `format` | Format JS and SCSS with Prettier |
| `check-format` | Check formatting without writing changes |
