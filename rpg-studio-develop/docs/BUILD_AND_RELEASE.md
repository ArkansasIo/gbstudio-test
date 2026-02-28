# Build and Release

## Prerequisites

- Node.js version matching `.nvmrc`.
- Corepack-enabled package manager support.
- Git and required platform tooling for Electron Forge makers.

## Install

```bash
corepack yarn install
```

## Local Development

```bash
npm start
```

## Packaging

```bash
npm run package
```

## Platform Builds

```bash
npm run make:win
npm run make:mac
npm run make:linux
```

## EXE Output Workflow

Custom helper:

```bash
npm run build:exe
```

Outputs are copied to `buildexe/output`.

## Release Checklist

- Bump version and changelog.
- Validate fresh install path.
- Validate open/create/build project flows.
- Validate asset import, script editing, and save/reopen.
- Produce and archive release artifacts.
