# Save/Load Design

## Objectives

- Ensure project writes are deterministic and recoverable.
- Keep backward compatibility for existing projects.
- Surface actionable errors for partial failures.

## Save Model

- Project file stores metadata and references.
- Asset descriptors store import metadata and editor settings.
- Derived files can be regenerated and should not be required for loading.

## Save Algorithm

1. Validate in-memory state graph.
2. Serialize entities in stable key order.
3. Write to temp files when appropriate.
4. Atomically replace target files.
5. Update recent project metadata and clear dirty flags.

## Load Algorithm

1. Open project root and parse metadata.
2. Load referenced entities/assets.
3. Run migration/coercion for version changes.
4. Validate referential integrity and defaults.
5. Initialize editor state and navigation context.

## Corruption Recovery

- On invalid JSON/schema mismatch, fail with file path + reason.
- Offer restore from autosave/backup when available.
- Keep operation logs for debugging and support.

## Compatibility Strategy

- Every schema change requires:
  - version bump,
  - coercion/migration path,
  - regression fixture for old project samples.
