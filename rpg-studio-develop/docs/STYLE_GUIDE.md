# Documentation and Code Style Guide

## Documentation Style

- Prefer short sections with explicit headings.
- Keep commands copy-paste ready.
- Use repo-relative paths where possible.
- State assumptions and platform caveats clearly.

## Code Style

- Follow existing ESLint/Prettier settings.
- Prefer explicit typing at module boundaries.
- Keep side-effectful logic in main process guarded and validated.
- Keep renderer logic focused on state and view concerns.

## Commit Hygiene

- One concern per commit where possible.
- Reference changed files in PR summaries.
- Include verification steps and outcomes.
