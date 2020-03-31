# Tabey

> ⚠️ Warning ⚠️
> Super duper beta no grantees about anything at all, let alone it working.

## Development

### Prerequisites

A currently supported version of Node.js and NPM must be installed.

[Parcel](https://parceljs.org/getting_started.html) must be installed.

### Dev build

```bash
cp src/manifest.json dist/manifest.json&cp -r icon/* dist&parcel src/*.html
```

Output will be in `dist` directory.

### Prod build

```bash
parcel build src/*.html
cp src/manifest.json dist/manifest.json
cp -r icon/* dist
```

Output will be in `dist` directory.
