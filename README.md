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

Hosted assets (`dist/hosted/`) are served from S3. Widget assets (`dist/embed/`) are not deployed.

On every push to `main` that changes source files, the CI workflow builds the assets and commits the output to the `compiled` branch. Copy the files from `compiled` to S3 manually.

## Platforms

### [Accelevents](accelevents/README.md)

Static assets for the MozFest Accelevents event platform. See [`accelevents/README.md`](accelevents/README.md) for scripts and deployment details.
