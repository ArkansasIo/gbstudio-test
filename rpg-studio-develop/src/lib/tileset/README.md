# Tileset Processing System

Complete TypeScript toolkit for processing isometric crypt tilesets.

## 📁 Files

- **types.ts** - TypeScript interfaces
- **cryptTileDefinitions.ts** - 144 tile definitions
- **tilesetSlicer.ts** - Slice master tileset
- **tiledExporter.ts** - Generate Tiled files
- **collisionGenerator.ts** - Collision & autotile
- **variantGenerator.ts** - Color variants
- **dungeonTileMapper.ts** - Dungeon integration
- **index.ts** - Main exports

## 🚀 Quick Start

```typescript
import {
  CRYPT_TILES,
  TILE_CATEGORIES,
  dungeonToTilemap,
  exportDungeonAsTiledMap
} from '@/lib/tileset';

// Get tiles
const floors = TILE_CATEGORIES.floors;
const walls = TILE_CATEGORIES.walls;

// Convert dungeon
const tilemap = dungeonToTilemap(dungeon);

// Export to Tiled
exportDungeonAsTiledMap(dungeon, 'tileset.tsx', 'map.tmx');
```

## 📖 Documentation

See root directory:
- **TILESET_SYSTEM.md** - Complete documentation
- **TILESET_QUICK_REFERENCE.md** - Quick reference
- **TILESET_IMPLEMENTATION_SUMMARY.md** - Implementation details

## 🎮 Features

- 144 tile definitions with metadata
- Tileset slicing tools
- Tiled Map Editor integration
- Collision system with autotile rules
- 8 color variants
- Procedural dungeon integration
- CLI processing tool

## 🔧 CLI Tool

```bash
npm run process:tileset
```

## 📦 Exports

```typescript
// Tile data
export { CRYPT_TILES, TILE_CATEGORIES, ANIMATED_TILES }

// Slicing
export { generateSliceBatchScript, generateSliceManifest }

// Tiled
export { generateTiledTileset, generateTiledMap }

// Collision
export { generateCollisionData, generateNavMesh }

// Variants
export { TILESET_VARIANTS, generateVariantBatchScript }

// Dungeon
export { dungeonToTilemap, exportDungeonAsTiledMap }
```

## 🎯 Use Cases

1. Game development (Unity/Godot/Unreal)
2. Level design (Tiled Map Editor)
3. Procedural generation
4. Web games
5. Modding

## 📚 References

- [Tiled Map Editor](https://www.mapeditor.org/)
- [ImageMagick](https://imagemagick.org/)
- [Dungeon Generator](../dungeon/README.md)
