# MozFest Hosted Assets

Static assets for MozFest third-party platforms, built and hosted on S3.

## Platforms

- Accelevent

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

Compiled assets are deployed to GitHub Pages on every push to `main` that changes source files. The deploy workflow builds the assets and publishes them via GitHub Actions.

**Testing URL pattern:**

```text
https://mozillafoundation.github.io/mozfest-hosted-assets/{project}/{css|js}/{filename}
```

**Production** assets are served from S3.

## Scripts

| Script | Description |
| --- | --- |
| `build` | Clean and compile CSS and JS for production |
| `build:css` | Compile SCSS to CSS |
| `build:js` | Bundle JS with esbuild |
| `dev` | Watch CSS and JS for changes |
| `clean` | Remove all compiled output |
| `lint` | Run ESLint and Stylelint |
| `lint:js` | Lint JS with ESLint |
| `lint:scss` | Lint SCSS with Stylelint |
| `fix` | Auto-fix ESLint and Stylelint issues |
| `format` | Format JS and SCSS with Prettier |
| `check-format` | Check formatting without writing changes |
