# Data Flow Design

## Core Flow

1. User action in UI dispatches Redux action.
2. Reducer updates state and marks affected entities dirty.
3. Middleware performs side effects (IPC, filesystem, build requests).
4. Main process executes privileged operation and returns structured result.
5. Renderer applies result and updates views.

## Save Flow

1. Trigger: manual save, autosave, or pre-build checkpoint.
2. Snapshot normalized state and resolved asset references.
3. Validate schema and referential integrity.
4. Persist project + related generated data in deterministic order.
5. Emit save status (`idle`, `saving`, `error`) and write progress.

## Build Flow

1. User triggers run/export.
2. Build request composed with current project path and build type.
3. Main process invokes build worker/toolchain.
4. Console stream forwarded to renderer for progress.
5. On completion, output path and status dispatched to state.

## Data Ownership Rules

- UI state: transient and view-specific.
- Project state: persisted source of truth.
- Generated artifacts: rebuildable outputs, not direct source-of-truth content.

## Failure Handling

- All IPC responses should be typed and include an error envelope.
- Recoverable validation errors should stay in renderer and be user-actionable.
- Fatal build/save errors should include operation context and fallback guidance.
