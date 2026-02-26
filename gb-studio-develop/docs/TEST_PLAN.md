# Test Plan

## Scope

- Editor startup and window lifecycle.
- Project create/open/switch.
- Asset import and resource loading.
- Script and scene editing workflows.
- Build/export pipelines.

## Test Types

- Unit tests for core logic and helpers.
- Integration tests for project/resource pipelines.
- Manual smoke tests for editor UX and packaging.

## Smoke Suite

1. Launch app from clean environment.
2. Create new template project.
3. Edit scene and add interaction.
4. Save, close, reopen project.
5. Build target output.
6. Validate generated artifacts.

## Regression Focus Areas

- Path normalization across OSes.
- IPC channel contracts and payload validation.
- Resource checksum and migration behavior.
- Music/sfx compile and preview flows.

## Exit Criteria

- No blocking crashes in smoke suite.
- Build outputs generated for required targets.
- No high-severity regressions in core authoring workflows.
