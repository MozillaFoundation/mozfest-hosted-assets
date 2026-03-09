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

## Scripts

| Script | Description |
| --- | --- |
| `build` | Clean and compile CSS and JS for production |
| `build:css` | Compile SCSS to CSS |
| `build:js` | Bundle JS with esbuild |
| `dev` | Watch CSS and JS for changes |
| `clean` | Remove all compiled output |
