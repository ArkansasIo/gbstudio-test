# Engine Overview

## Purpose

Enchantment Game Engine is a desktop game-authoring environment for building Game Boy-style games with an Electron editor and a C-based runtime/export pipeline.

## High-Level Architecture

- Editor Frontend: React + Redux editor UI for content authoring.
- Main Process: Electron orchestration for filesystem, windows, menus, and build commands.
- Build Pipeline: Toolchain integration for ROM/web/pocket outputs.
- Runtime Data: Project metadata, assets, scripts, and generated build artifacts.

## Design Goals

- Keep editor iteration fast for non-programmer workflows.
- Preserve deterministic export behavior across platforms.
- Maintain data compatibility across project versions.
- Support plugin/theme extension without breaking core stability.

## Non-Goals

- Full real-time AAA rendering stack.
- Arbitrary runtime mod execution in trusted process context.
- Breaking backward compatibility with project format by default.

## Core Quality Attributes

- Reliability: recoverable save/load and clear error messaging.
- Performance: responsive authoring for medium/large projects.
- Maintainability: explicit module boundaries and schema contracts.
- Extensibility: stable plugin/theme and scripting extension points.
