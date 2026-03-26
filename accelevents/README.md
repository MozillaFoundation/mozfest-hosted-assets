# Accelevents

Build tooling for MozFest static assets hosted on Accelevents.

## Widget assets

Some Accelevents features are embedded via iframe. Because iframes block external stylesheets and scripts, widget assets cannot be loaded by URL — they must be pasted directly into the Accelevents dashboard.

**Sources:**

- CSS: `src/scss/widgets/` — one `.scss` file per widget
- JS: `src/js/widgets/` — one `.js` file per widget

**Compiled output:** `dist/embed/` — generated automatically by `build:css` and `build:js`

**Deployment workflow:**

1. Edit the relevant file(s) in `src/scss/widgets/` or `src/js/widgets/`
2. Run `build` (or `build:css` / `build:js`) to compile
3. Copy the contents of `dist/embed/<widget>.compiled.css` or `dist/embed/<widget>.compiled.js` and paste into the Accelevents dashboard

## Scripts

| Script | Description |
| --- | --- |
| `build` | Clean and compile CSS, JS, and images for production |
| `build:css` | Compile SCSS to CSS |
| `build:js` | Bundle JS with esbuild |
| `build:images` | Copy images to `dist/hosted/images/` |
| `dev` | Watch CSS and JS for changes |
| `clean` | Remove all compiled output |
| `clean:images` | Remove compiled image output (`dist/hosted/images/`) |
| `clean:widgets` | Remove compiled widget output (`dist/embed/`) |
| `lint` | Run ESLint and Stylelint |
| `lint:js` | Lint JS with ESLint |
| `lint:scss` | Lint SCSS with Stylelint |
| `fix` | Auto-fix ESLint and Stylelint issues |
| `format` | Format JS and SCSS with Prettier |
| `check-format` | Check formatting without writing changes |
