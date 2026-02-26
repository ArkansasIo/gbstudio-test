# IPC API Reference (High-Level)

This document summarizes major renderer-to-main IPC usage patterns. Use source as ground truth for exact channel signatures.

## App and Dialog

- `open-directory-picker`
- `open-file-picker`
- `open-external`
- `dialog:*` confirm/error dialogs

## Project Lifecycle

- Open project picker.
- Open project by path.
- Create project from template.
- Recent project list operations.

## Settings and Paths

- Get/set/delete setting keys.
- UI scale and tracker keybinding settings.
- Documents/tmp path queries.

## Asset and File Operations

- Open file in OS shell.
- Open files in configured external editors.
- Guarded project-root path operations.

## Audio and Music

- Play UGE tracks.
- Compile/play FX Hammer SFX.
- Tracker and music editor support channels.

## Build and Export

- Build request dispatch.
- Build status/progress callbacks.
- Export target selection and output path interactions.

## Notes

- Main process should validate inputs and normalize paths.
- Renderer should consume typed wrappers from `src/renderer/lib/api/setup.ts`.
