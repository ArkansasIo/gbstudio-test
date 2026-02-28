# Tileset System Quick Reference

## 🚀 Quick Commands

```bash
# Process entire tileset
npm run process:tileset

# Specific operations
npx ts-node scripts/processTileset.ts --slice      # Slice tiles
npx ts-node scripts/processTileset.ts --tiled      # Generate Tiled files
npx ts-node scripts/processTileset.ts --collision  # Generate collision
npx ts-node scripts/processTileset.ts --variants   # Generate variants
```

## 📖 Common Imports

```typescript
// Tile definitions
import { CRYPT_TILES, TILE_CATEGORIES, ANIMATED_TILES } from '@/lib/tileset';

// Slicing
import { generateSliceBatchScript, generateSliceManifest } from '@/lib/tileset';

// Tiled export
import { generateTiledTileset, generateTiledMap } from '@/lib/tileset';

// Collision
import { generateCollisionData, generateNavMesh } from '@/lib/tileset';

// Variants
import { TILESET_VARIANTS, generateVariantBatchScript } from '@/lib/tileset';

// Dungeon integration
import { dungeonToTilemap, exportDungeonAsTiledMap } from '@/lib/tileset';
```

## 🎮 Tile ID Reference

### Floors (0-11)
```
0: Stone    1: Cracked   2: Moss      3: Broken
4: Bone     5: Blood     6: Ritual    7: Rune
8: Grate    9: Sarcoph   10: Chain    11: Dark
```

### Walls (12-23)
```
12: Stone   13: Moss     14: Crack    15: Skull
16: Bone    17: Bars     18: Alcove   19: Arch
20: Torch*  21: Rubble   22: Dark     23: Decor
```

### Structures (24-35)
```
24: Pillar Base    25: Pillar Mid    26: Pillar Top
27: Broken Pillar  28: Rubble        29: Corner NE
30: Corner NW      31: Corner SE     32: Corner SW
33: T-Junction N   34: T-Junction S  35: T-Junction E
```

### Entrances (36-47)
```
36: Entrance   37: Sealed    38: Broken    39: Gate
40: Rune Door  41: Altar     42: Sarcoph   43: Niche
44: Statue     45: Brazier*  46: Coffin    47: Open
```

### Props (48-71)
```
48: Skull      49: Skull Pile  50: Bones      51: Bone Pile
52: Urn        53: Urn Broken  54: Chains     55: Shackles
56: Brazier*   57: Ritual      58: Bowl       59: Debris
60: Debris Lg  61: Slab        62: Plaque     63: Candle*
64: Cobweb     65: Blood       66: Crack      67: Crack Lg
68: Torch F1   69: Moss        70: Rune*      71: Shadow
```

*Animated tiles

## 🎨 Variants

```typescript
// Available variants
'default' | 'lava' | 'frost' | 'cursed' | 'toxic' | 'holy' | 'shadow' | 'blood'

// CSS usage
<img src="tileset.png" class="tileset-lava">

// Get transform
const transform = getVariantTransform('lava');
// { hueShift: 15, saturation: 1.5, brightness: 1.2, contrast: 1.3 }
```

## 🗺️ Dungeon to Tilemap

```typescript
import { DungeonGenerator } from '@/lib/dungeon';
import { dungeonToTilemap } from '@/lib/tileset';

const dungeon = new DungeonGenerator(config).generate();
const tilemap = dungeonToTilemap(dungeon);

// Access layers
tilemap.layers[0]; // Floor
tilemap.layers[1]; // Walls
tilemap.layers[2]; // Props
tilemap.layers[3]; // Decorations
```

## 💥 Collision

```typescript
// Get collision for tile
const tile = CRYPT_TILES[12]; // Stone wall
console.log(tile.collision); // 'full'
console.log(tile.walkable);  // false

// Generate collision layer
const collisionObjects = generateCollisionLayer(tileData, 256, 256);

// Generate nav mesh
const navMesh = generateNavMesh(tileData, 256, 256);
```

## 📊 Tile Categories

```typescript
TILE_CATEGORIES.floors       // 12 floor tiles
TILE_CATEGORIES.walls        // 12 wall tiles
TILE_CATEGORIES.structures   // Pillars, etc.
TILE_CATEGORIES.entrances    // Doors, gates
TILE_CATEGORIES.props        // Skulls, urns, etc.
TILE_CATEGORIES.decorations  // Blood, cracks, etc.
TILE_CATEGORIES.corners      // 4 corner tiles
TILE_CATEGORIES.transitions  // T-junctions
```

## 🔧 Configuration

```typescript
// Tileset config
CRYPT_TILESET_CONFIG = {
  name: 'Isometric Crypt',
  tileWidth: 256,
  tileHeight: 256,
  columns: 12,
  rows: 12,
  tileCount: 144
}

// Tile properties
{
  id: number,
  name: string,
  category: TileCategory,
  variant: string,
  collision: CollisionType,
  walkable: boolean,
  transparent: boolean,
  animated?: boolean,
  frames?: number[],
  description: string
}
```

## 📦 Output Files

```
output/tilesets/
├── sliced/                    # 144 PNG tiles
├── tiled/
│   ├── crypt_tileset.tsx     # Tileset definition
│   └── crypt_map_template.tmx # Map template
├── variants/
│   ├── crypt_tileset_lava.png
│   ├── variants.json
│   ├── variants.css
│   └── shaders/*.frag
├── collision_data.json
├── slice_manifest.json
├── slice_tileset.bat
└── generate_variants.bat
```

## 🎯 Common Tasks

### Get specific tile
```typescript
const tile = CRYPT_TILES.find(t => t.name === 'Ritual Circle');
```

### Get all walkable tiles
```typescript
const walkable = CRYPT_TILES.filter(t => t.walkable);
```

### Get animated tiles
```typescript
const animated = CRYPT_TILES.filter(t => t.animated);
```

### Export dungeon to Tiled
```typescript
exportDungeonAsTiledMap(dungeon, 'tileset.tsx', 'map.tmx');
```

### Generate variants
```bash
./output/tilesets/generate_variants.bat
```

## 📚 Documentation

- **TILESET_SYSTEM.md** - Full documentation
- **TILESET_IMPLEMENTATION_SUMMARY.md** - Implementation details
- **DUNGEON_GENERATION.md** - Dungeon generator docs

## 🔗 Integration

### With Dungeon Generator
```typescript
const dungeon = new DungeonGenerator(config).generate();
const tilemap = dungeonToTilemap(dungeon);
```

### With Game Engine
```typescript
tilemap.layers.forEach(layer => {
  layer.data.forEach((row, y) => {
    row.forEach((tileId, x) => {
      if (tileId > 0) setTile(x, y, tileId);
    });
  });
});
```

### With Tiled Editor
1. Run `npm run process:tileset`
2. Open `output/tilesets/tiled/crypt_map_template.tmx`
3. Start painting with tiles

## ⚡ Performance

- Tile lookup: O(1)
- Collision check: O(1)
- Tilemap generation: O(width × height)
- Variant generation: ~2-5s per variant

## 🐛 Troubleshooting

**"Tile not found"**
- Check tile ID is 0-143
- Use `CRYPT_TILES.find()` to search

**"Invalid dimensions"**
- Run `validateTilesetDimensions()`
- Expected: 3072×3072 (12×12 @ 256px)

**"Collision not working"**
- Check `tile.collision !== 'none'`
- Verify `tile.walkable === false`

**"Variants not generating"**
- Install ImageMagick
- Run batch script manually
- Check input path exists
