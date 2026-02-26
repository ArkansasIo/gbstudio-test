# Architecture

## High-Level Structure

- Electron main process orchestrates windows, dialogs, filesystem, and compile/build integrations.
- Renderer apps provide UI for splash, project editor, preferences, plugins, and music tooling.
- Shared libraries hold domain logic, schema/types, and cross-layer utilities.

## Main Process Responsibilities

- IPC routing (`ipcMain.handle`).
- Window lifecycle management.
- Project open/create/switch orchestration.
- Build/export and external tool invocation.
- Asset/file sandbox checks for project root safety.

## Renderer Responsibilities

- State management (Redux Toolkit patterns).
- Feature UIs and form workflows.
- Event-driven interactions with main process through typed API wrappers.

## Data and Assets

- Project data and resources are loaded from project root.
- Asset folders are normalized to expected structure.
- Serialization/deserialization flows ensure deterministic build inputs.

## Build System

- Electron Forge with webpack plugin for main/renderer bundles.
- Platform-specific maker targets in `forge.config.js`.
- NPM scripts in `package.json` drive package/make workflows.

## Key Boundaries

- Renderer never directly accesses sensitive filesystem operations.
- Main process validates/guards project-relative paths.
- Shared types define contracts across app layers.

## Extension Points

- Template plugins.
- Theme and language plugin loading.
- Script event handler loading pipeline.
