# Isometric Crypt Tileset Processing System

Complete TypeScript toolkit for processing 12×12 isometric crypt tilesets with slicing, metadata generation, collision rules, variants, and dungeon integration.

## 📁 System Structure

```
src/lib/tileset/
├── types.ts                    # TypeScript interfaces
├── cryptTileDefinitions.ts     # 144 tile definitions with metadata
├── tilesetSlicer.ts           # Slice master tileset into individual tiles
├── tiledExporter.ts           # Generate Tiled .tsx/.tmx files
├── collisionGenerator.ts      # Collision shapes and autotile rules
├── variantGenerator.ts        # Color variants (lava, frost, cursed, etc.)
├── dungeonTileMapper.ts       # Convert procedural dungeons to tilemaps
└── index.ts                   # Main exports

scripts/
└── processTileset.ts          # CLI tool for processing
```

## 🎮 Features

### 1. Tile Definitions (144 tiles)
- **12 Floor Variants**: Stone, cracked, moss, bones, blood, ritual, runes, grates, etc.
- **12 Wall Tiles**: Stone, mossy, cracked, skulls, bars, alcoves, arches, torches
- **12 Structural Pieces**: Pillars, corners, T-junctions, transitions
- **12 Entrances**: Arches, doors, gates, altars, sarcophagi
- **Props & Decorations**: Skulls, bones, urns, chains, braziers, debris
- **Animated Tiles**: Torches, braziers, glowing runes

### 2. Tileset Slicing
- Generate ImageMagick commands for slicing
- Create batch scripts (Windows/Unix)
- Export slice manifest JSON
- Validate tileset dimensions

### 3. Tiled Map Editor Support
- Generate .tsx tileset files
- Generate .tmx map files
- Collision object groups
- Tile properties and metadata
- Animation definitions

### 4. Collision System
- Collision shapes (rectangle, polygon, circle)
- Collision types (none, full, half, quarter, custom)
- Autotile rules (blob, wall, floor, corner)
- Navigation mesh generation
- Walkable tile detection

### 5. Tileset Variants
- **8 Color Variants**: Default, Lava, Frost, Cursed, Toxic, Holy, Shadow, Blood
- ImageMagick batch scripts
- CSS filters for web
- GLSL shaders for game engines
- Variant metadata JSON

### 6. Dungeon Integration
- Convert procedural dungeons to tilemaps
- Multi-layer generation (floor, walls, props, decorations)
- Room-based tile selection
- Feature-based prop placement
- Export to Tiled format

## 🚀 Quick Start

### Install Dependencies

```bash
npm install
```

### Process Tileset

```bash
# Process everything
npm run process:tileset

# Or specific operations
npx ts-node scripts/processTileset.ts --slice
npx ts-node scripts/processTileset.ts --tiled
npx ts-node scripts/processTileset.ts --collision
npx ts-node scripts/processTileset.ts --variants
```

### Use in Code

```typescript
import {
  CRYPT_TILES,
  TILE_CATEGORIES,
  dungeonToTilemap,
  exportDungeonAsTiledMap
} from '@/lib/tileset';

// Get specific tiles
const floorTiles = TILE_CATEGORIES.floors;
const wallTiles = TILE_CATEGORIES.walls;

// Convert dungeon to tilemap
const tilemap = dungeonToTilemap(dungeon);

// Export to Tiled
exportDungeonAsTiledMap(
  dungeon,
  './crypt_tileset.tsx',
  './output/dungeon_map.tmx'
);
```

## 📖 Tile Categories

### Floor Tiles (0-11)
```typescript
0:  Stone Floor (clean)
1:  Cracked Floor
2:  Moss Floor
3:  Broken Floor
4:  Bone Floor
5:  Blood Floor
6:  Ritual Circle
7:  Rune Floor
8:  Metal Grate
9:  Sarcophagus Lid
10: Chained Floor
11: Dark Floor
```

### Wall Tiles (12-23)
```typescript
12: Stone Wall (clean)
13: Mossy Wall
14: Cracked Wall
15: Skull Wall
16: Bone Wall
17: Barred Wall
18: Alcove Wall
19: Archway Wall
20: Torch Wall (animated)
21: Collapsed Wall
22: Dark Wall
23: Decorated Wall
```

### Structural Pieces (24-35)
```typescript
24: Pillar Base
25: Pillar Mid
26: Pillar Top
27: Broken Pillar
28: Pillar Rubble
29: Corner NE
30: Corner NW
31: Corner SE
32: Corner SW
33: T-Junction N
34: T-Junction S
35: T-Junction E
```

### Entrances & Structures (36-47)
```typescript
36: Crypt Entrance
37: Sealed Door
38: Broken Door
39: Iron Gate
40: Rune Door
41: Ritual Altar
42: Sarcophagus Front
43: Tomb Niche
44: Statue Base
45: Brazier Stand (animated)
46: Coffin Closed
47: Coffin Open
```

### Props & Interactables (48-71)
```typescript
48: Skull Single
49: Skull Pile
50: Bones Scattered
51: Bone Pile
52: Urn Intact
53: Urn Broken
54: Chains Hanging
55: Shackles
56: Brazier Lit (animated)
57: Ritual Marking
58: Offering Bowl
59: Debris Small
60: Debris Large
61: Cracked Slab
62: Ancient Plaque
63: Candelabra (animated)
64: Cobweb Corner
65: Blood Pool
66: Crack Small
67: Crack Large
68: Torch Anim Frame
69: Moss Patch
70: Rune Glow (animated)
71: Shadow Overlay
```

## 🎨 Tileset Variants

### Available Variants

| Variant | Base Color | Accent | Description |
|---------|-----------|--------|-------------|
| Default | #4a4a4a | #8b0000 | Standard dark crypt |
| Lava | #2a1a0a | #ff4500 | Volcanic with lava |
| Frost | #d0e8f0 | #4169e1 | Frozen with ice |
| Cursed | #1a0a2e | #9400d3 | Purple miasma |
| Toxic | #1a2a1a | #00ff00 | Poisonous sludge |
| Holy | #f5f5dc | #ffd700 | Golden light |
| Shadow | #0a0a0a | #4b0082 | Void energy |
| Blood | #3a0a0a | #8b0000 | Blood-soaked |

### Generate Variants

```bash
# Run variant generation script
./output/tilesets/generate_variants.bat

# Or use ImageMagick directly
magick convert crypt_tileset.png \
  -modulate 120,150,15 \
  -brightness-contrast 10x15 \
  crypt_tileset_lava.png
```

### Use CSS Filters

```html
<img src="crypt_tileset.png" class="tileset-lava">
```

```css
.tileset-lava {
  filter: hue-rotate(15deg) saturate(1.5) brightness(1.2) contrast(1.3);
}
```

### Use GLSL Shaders

```glsl
// Load variant shader
uniform sampler2D u_texture;
// Apply color transform
// See variants/shaders/variant_lava.frag
```

## 🗺️ Tiled Map Editor Integration

### Generate Tileset File

```typescript
import { generateTiledTileset } from '@/lib/tileset';

generateTiledTileset(
  CRYPT_TILESET_CONFIG,
  './crypt_tileset.png',
  './output/crypt_tileset.tsx'
);
```

### Generate Map File

```typescript
import { generateEmptyMap } from '@/lib/tileset';

generateEmptyMap(
  50,  // width
  40,  // height
  './crypt_tileset.tsx',
  './output/crypt_map.tmx'
);
```

### Open in Tiled

1. Open Tiled Map Editor
2. File → Open → Select `crypt_map.tmx`
3. Tileset is automatically loaded
4. Start painting with tiles

## 💥 Collision System

### Export Collision Data

```typescript
import { exportCollisionJSON } from '@/lib/tileset';

exportCollisionJSON('./output/collision_data.json');
```

### Use Collision Data

```typescript
import { generateCollisionLayer } from '@/lib/tileset';

const tileData = [
  [0, 12, 12, 12],
  [0, 0, 0, 12],
  [0, 0, 0, 12]
];

const collisionObjects = generateCollisionLayer(tileData, 256, 256);
// Returns array of collision rectangles
```

### Generate Navigation Mesh

```typescript
import { generateNavMesh } from '@/lib/tileset';

const navMesh = generateNavMesh(tileData, 256, 256);
// Returns array of walkable nodes with neighbors
```

## 🏰 Dungeon Integration

### Convert Dungeon to Tilemap

```typescript
import { DungeonGenerator } from '@/lib/dungeon';
import { dungeonToTilemap } from '@/lib/tileset';

// Generate dungeon
const config = {
  seed: 12345,
  biome: 'crypt',
  difficulty: 2,
  minRooms: 10,
  maxRooms: 15,
  branchingFactor: 0.3,
  treasureDensity: 0.2,
  trapDensity: 0.15,
  width: 80,
  height: 60
};

const dungeon = new DungeonGenerator(config).generate();

// Convert to tilemap
const tilemap = dungeonToTilemap(dungeon);

// Access layers
console.log(tilemap.layers[0].name); // "Floor"
console.log(tilemap.layers[1].name); // "Walls"
console.log(tilemap.layers[2].name); // "Props"
console.log(tilemap.layers[3].name); // "Decorations"
```

### Export to Tiled

```typescript
import { exportDungeonAsTiledMap } from '@/lib/tileset';

exportDungeonAsTiledMap(
  dungeon,
  './crypt_tileset.tsx',
  './output/generated_dungeon.tmx'
);
```

### Use in Game Engine

```typescript
// Unity/Godot/Unreal
const tilemap = dungeonToTilemap(dungeon);

tilemap.layers.forEach(layer => {
  // Create tilemap layer
  const tilemapLayer = createTilemapLayer(layer.name);
  
  // Set tiles
  layer.data.forEach((row, y) => {
    row.forEach((tileId, x) => {
      if (tileId > 0) {
        tilemapLayer.setTile(x, y, tileId);
      }
    });
  });
});
```

## 📊 Tile Properties

Each tile has the following properties:

```typescript
{
  id: number;              // 0-143
  name: string;            // "Stone Floor"
  category: TileCategory;  // 'floor', 'wall', 'prop', etc.
  variant: string;         // 'clean', 'moss', 'broken', etc.
  collision: CollisionType; // 'none', 'full', 'half', 'quarter'
  walkable: boolean;       // Can player walk on it?
  transparent: boolean;    // Is it see-through?
  animated?: boolean;      // Does it animate?
  frames?: number[];       // Animation frame IDs
  description: string;     // Human-readable description
}
```

## 🔧 CLI Tool Usage

```bash
# Process everything
npx ts-node scripts/processTileset.ts

# Specific operations
npx ts-node scripts/processTileset.ts --slice
npx ts-node scripts/processTileset.ts --tiled
npx ts-node scripts/processTileset.ts --collision
npx ts-node scripts/processTileset.ts --variants

# Custom input
npx ts-node scripts/processTileset.ts path/to/tileset.png --all
```

## 📦 Output Structure

```
output/tilesets/
├── sliced/                    # Individual tile PNGs
│   ├── crypt_tile_000.png
│   ├── crypt_tile_001.png
│   └── ...
├── tiled/                     # Tiled files
│   ├── crypt_tileset.tsx
│   └── crypt_map_template.tmx
├── variants/                  # Color variants
│   ├── crypt_tileset_lava.png
│   ├── crypt_tileset_frost.png
│   ├── variants.json
│   ├── variants.css
│   └── shaders/
│       ├── variant_lava.frag
│       └── ...
├── collision_data.json        # Collision metadata
├── slice_manifest.json        # Slice metadata
├── slice_tileset.bat          # Slice script
└── generate_variants.bat      # Variant script
```

## 🎯 Use Cases

1. **Game Development**: Use in Unity, Godot, Unreal Engine
2. **Level Design**: Create maps in Tiled Map Editor
3. **Procedural Generation**: Auto-generate dungeons with tiles
4. **Web Games**: Use CSS filters for instant variants
5. **Modding**: Easy to extend with new tiles

## 🔮 Future Enhancements

- [ ] Pixel art downscaling (8-bit version)
- [ ] Additional biome tilesets
- [ ] Animated tile sequences
- [ ] Parallax background layers
- [ ] Lighting overlay system
- [ ] Weather effects
- [ ] Destructible tiles

## 📚 References

- Tiled Map Editor: https://www.mapeditor.org/
- ImageMagick: https://imagemagick.org/
- Isometric Projection: https://en.wikipedia.org/wiki/Isometric_projection
- Blob Autotiling: https://gamedevelopment.tutsplus.com/tutorials/how-to-use-tile-bitmasking-to-auto-tile-your-level-layouts--cms-25673

## ✨ Summary

Complete tileset processing system with:
- 144 tile definitions with full metadata
- Slicing tools for individual tiles
- Tiled Map Editor integration
- Collision and autotile systems
- 8 color variants with multiple export formats
- Procedural dungeon integration
- CLI tool for batch processing
- Ready for Unity/Godot/Unreal/Web
