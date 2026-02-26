# Core Systems Design

## Subsystems

## Project System

- Loads and validates `.gbsproj` and asset references.
- Handles project metadata and migration strategy.
- Owns dirty-state, autosave trigger points, and save diagnostics.

## Asset System

- Maintains indexed asset manifests for sprites, backgrounds, music, SFX, palettes.
- Validates format constraints and pre-build compatibility.
- Supports import/export operations with error reporting.

## Script/Event System

- Encodes gameplay logic as event/script structures.
- Provides command schema, form metadata, and compile-time validation.
- Compiles to runtime-friendly intermediate command representation.

## Build System

- Coordinates export for ROM, web, and pocket outputs.
- Tracks job status, logs, cancellation, and final artifact paths.
- Encapsulates toolchain details behind stable editor actions.

## UI/Navigation System

- Manages section routing (`world`, `sprites`, `backgrounds`, etc.).
- Keeps sidebars, split panes, tabs, and panel layouts consistent.
- Provides editor-level search, shortcuts, and command menus.

## Plugin/Theme System

- Loads global plugin manifests and theme descriptors.
- Merges plugin theme overrides with base system themes.
- Applies runtime updates safely without restart when possible.

## Responsibility Boundaries

- Main process: privileged IO and OS integration.
- Renderer process: authoring UX, state transitions, validation feedback.
- Shared models: portable types/contracts used in both contexts.
