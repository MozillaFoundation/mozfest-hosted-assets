# MozFest Hosted Assets

Static assets for MozFest third-party platforms, built and hosted on S3.

## Development

This repo uses Yarn workspaces. Install dependencies from the root:

```bash
yarn install
```

Then run scripts per platform using `yarn workspace <platform> <script>`:

```bash
yarn workspace accelevents build
```

## Hosting

Hosted assets (`dist/hosted/`) are deployed to GitHub Pages on every push to `main` that changes source files. The deploy workflow builds the assets and publishes them via GitHub Actions. Widget assets (`dist/embed/`) are not deployed.

**Testing URL pattern:**

```text
https://mozillafoundation.github.io/mozfest-hosted-assets/{platform}/{css|js}/{filename}
```

**Production** assets are served from S3.

## Platforms

### [Accelevents](accelevents/README.md)

Static assets for the MozFest Accelevents event platform. See [`accelevents/README.md`](accelevents/README.md) for scripts and deployment details.
