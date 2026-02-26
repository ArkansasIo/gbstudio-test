# AI and Scripting Design

## Scope

This document covers gameplay scripting, event execution, and editor-facing AI tooling boundaries.

## Event/Scripting Model

- Scripts are structured commands, not arbitrary runtime code by default.
- Command metadata defines editor form controls and validation.
- Execution engine processes command sequences with deterministic state transitions.

## AI-Assisted Authoring

- AI helpers should produce editable script suggestions, not opaque binaries.
- All generated logic must pass existing script schema validation.
- User remains responsible for applying/approving generated changes.

## Runtime Safety Constraints

- No direct file/network access from gameplay command execution.
- Sandboxed extension points for plugin-authored behavior.
- Versioned command schema to prevent runtime desync.

## Debugging Requirements

- Step execution mode for script command tracing.
- Variable watch list with before/after values.
- Script event source mapping for diagnostics.

## Planned Enhancements

- Visual graph editing for event flow.
- Breakpoint-level debugger overlays in editor context.
- Rule-checker for dead branches and impossible conditions.
