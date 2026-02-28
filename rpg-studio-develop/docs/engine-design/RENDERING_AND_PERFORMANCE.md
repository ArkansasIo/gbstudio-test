# Rendering and Performance Design

## Editor Performance Targets

- Startup to interactive UI: under 5 seconds on baseline dev hardware.
- Navigation section switch: under 250ms for medium projects.
- Search/filter response: under 100ms for common lists.

## Optimization Strategy

- Keep normalized entity state for cheap selector recomposition.
- Memoize expensive computed lists and derived render models.
- Use virtualization for large list/panel rendering.
- Debounce input-driven global filtering and search.

## Rendering Guidelines

- Prefer composable UI surfaces over deeply nested re-render trees.
- Minimize layout thrash by batching state updates.
- Avoid expensive synchronous operations in render path.

## Build-Time Performance

- Cache unchanged assets where safe.
- Support incremental build paths.
- Track build stage timings in logs for bottleneck analysis.

## Observability

- Add timing marks for load, save, export, and heavy editor actions.
- Keep a lightweight diagnostics panel for performance snapshots.
