# Crypt Biome Toolkit (TypeScript)

Pipeline to process a **12x12 isometric crypt tileset** and produce:

- Sliced per-tile PNG files
- Tiled `TSX` + template `TMX`
- Collision + autotile rule JSON
- Visual variants (`lava`, `frost`, `cursed`, `8bit`)
- Procedural dungeon `TMX`

## Folder Structure

- `assets/input` - put your source sheet here
- `assets/output` - generated files
- `src` - TypeScript source

## Quick Start

1. Place your tileset image at:
   - `assets/input/crypt_master_12x12.png`
2. Install dependencies:
   - `npm install`
3. Run full pipeline:
   - `npm run pipeline`

Output examples:

- `assets/output/tiles/` (144 sliced PNGs)
- `assets/output/tileset.manifest.json`
- `assets/output/crypt-biome.tsx`
- `assets/output/crypt-biome-template.tmx`
- `assets/output/collision-rules.json`
- `assets/output/autotile-rules-wall-4bit.json`
- `assets/output/variants/*.png`
- `assets/output/procedural-crypt-dungeon.tmx`

## Commands

- `npm run slice` - slice sheet + manifest
- `npm run tmx` - generate `TSX` + template `TMX`
- `npm run rules` - generate collision + autotile JSON
- `npm run variants` - generate lava/frost/cursed/8bit variants
- `npm run dungeon` - generate procedural dungeon TMX
- `npm run pipeline` - run everything

## Custom Arguments

Pass options after command, example:

- `npm run pipeline -- --input "D:/path/crypt.png" --out "D:/path/out" --tile 256 --cols 12 --rows 12 --mapWidth 64 --mapHeight 64`

## Integration Notes

- Orientation is set to `isometric` in TMX output.
- `CollisionWalls` layer is a dedicated collision layer.
- Props are generated on a separate `Props` layer for overlay use.
