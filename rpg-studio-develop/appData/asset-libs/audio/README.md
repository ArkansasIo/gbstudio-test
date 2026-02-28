Prebuilt Audio Asset Library
============================

This folder contains reusable audio and sound effect library packs for GB Studio projects.

Structure
---------

- `music/` prebuilt music pack definitions (`.uge` / `.mod` targets)
- `sfx/` prebuilt sound effect pack definitions (`.wav` / `.vgm` / `.sav` targets)
- `manifest.json` top-level pack index

How To Use
----------

1. Pick a pack from `music` and/or `sfx`.
2. Copy actual asset files into your project:
   - Music -> `assets/music/`
   - Sound effects -> `assets/sounds/`
3. Keep filenames aligned with the pack manifest so events and references stay consistent.

Notes
-----

- This repo stores pack metadata and folder presets.
- Drop in your real audio files for final content.
