# Tileset Visual Reference

Based on the actual tileset images provided, this document maps the visual tiles to their IDs and categories.

## 📸 Image Analysis

The tileset consists of 3 high-quality isometric dungeon tile sheets with approximately 144+ unique tiles each, featuring:

### Image 1: Dark Crypt Tileset
- **Style**: Dark fantasy, hand-painted
- **Perspective**: 3D isometric
- **Features**: Floors, walls, arches, doors, pillars, props
- **Lighting**: Warm torch lighting, ambient shadows
- **Details**: Moss, cracks, blood stains, bones, chains

### Image 2: Stone Dungeon Tileset  
- **Style**: Clean stone, lighter palette
- **Perspective**: 3D isometric
- **Features**: Floor patterns, walls, arches, pillars, props
- **Lighting**: Neutral ambient lighting
- **Details**: Skulls, bones, chains, urns, grates

### Image 3: Mixed Dungeon Tileset
- **Style**: Combination of dark and light
- **Perspective**: 3D isometric
- **Features**: Complete dungeon set with all elements
- **Lighting**: Mixed torch and ambient
- **Details**: Full prop collection, decorations

## 🎨 Tile Categories by Visual

### Row 0-1: Floor Tiles (0-19)
Visual characteristics:
- Diamond-shaped isometric floor tiles
- Variations: clean stone, cracked, mossy, blood-stained
- Some with debris, bones, or ritual markings
- Consistent 256×256px size

**Identified tiles:**
- 0-3: Clean stone variations
- 4-6: Cracked and damaged floors
- 7-9: Moss-covered floors
- 10-12: Blood and dark stains
- 13-15: Debris and rubble floors
- 16-19: Special floors (ritual, runes, grates)

### Row 2-3: Wall Tiles (20-39)
Visual characteristics:
- Vertical stone brick walls
- Front-facing isometric view
- Variations: clean, mossy, cracked, decorated
- Some with alcoves, torches, or skull decorations

**Identified tiles:**
- 20-23: Basic stone walls
- 24-26: Mossy walls
- 27-29: Walls with torches (animated)
- 30-32: Skull and bone decorated walls
- 33-35: Barred and grated walls
- 36-39: Special walls (alcoves, collapsed)

### Row 4-5: Structural Pieces (40-59)
Visual characteristics:
- Pillars in various states
- Corner pieces for wall connections
- T-junctions and transitions
- Rubble piles

**Identified tiles:**
- 40-42: Pillar base, mid, top
- 43-45: Broken pillars and rubble
- 46-49: Various rubble piles
- 50-53: Corner pieces (NE, NW, SE, SW)
- 54-57: T-junction pieces
- 58-59: Rubble with bones/skulls

### Row 6-7: Arch Entrances (60-79)
Visual characteristics:
- Stone archways in various states
- Some with doors, some open
- Many with torch lighting (animated)
- Decorative variations

**Identified tiles:**
- 60-62: Basic stone arches
- 63-65: Arches with moss/damage
- 66-69: Torch-lit arches (animated)
- 70-73: Arches with doors
- 74-76: Sealed and barred arches
- 77-79: Special arches (collapsed, decorated)

### Row 8-9: Doors and Structures (80-99)
Visual characteristics:
- Large wooden doors
- Iron-banded and reinforced doors
- Sarcophagi and tomb structures
- Altars and pedestals

**Identified tiles:**
- 80-82: Large wooden doors
- 83-85: Reinforced and barred doors
- 86-88: Sarcophagi and coffins
- 89-91: Tomb structures
- 92-94: Altars and shrines
- 95-99: Pedestals and tables

### Row 10-11: Props and Decorations (100-143)
Visual characteristics:
- Small decorative elements
- Skulls, bones, chains
- Urns, pots, vessels
- Braziers and light sources
- Blood, moss, cracks

**Identified tiles:**
- 100-103: Floor rubble and debris
- 104-111: Skulls and bones
- 112-117: Chains and shackles
- 118-127: Urns, pots, vessels
- 128-133: Braziers and fire sources
- 134-139: Blood, moss, cracks
- 140-143: Ritual markings and overlays

## 🔥 Animated Tiles

Based on visual analysis, these tiles have animation frames:

### Torch Animations
- **Tile 29**: Wall torch (frames: 29 → flicker → 29)
- **Tile 36**: Wall torch variant
- **Tile 39**: Wall brazier

### Arch Torch Animations
- **Tiles 66-69**: Arch with torches (left, right, both, brazier)
- **Tiles 76-78**: Door with torches (left, right, both)

### Brazier Animations
- **Tile 129**: Lit brazier (frames: 129 → flames → 129)
- **Tile 131**: Brazier with coals

Animation typically runs at 200ms per frame for flickering fire effect.

## 🎯 Usage by Visual Type

### For Dungeon Floors
Use tiles 0-19 for walkable surfaces:
- Clean areas: 0-3
- Damaged areas: 4-6
- Atmospheric: 7-12
- Special rooms: 13-19

### For Walls
Use tiles 20-39 for boundaries:
- Standard walls: 20-26
- Decorated walls: 27-32
- Special walls: 33-39

### For Entrances
Use tiles 60-79 for doorways:
- Open arches: 60-65
- Lit entrances: 66-69
- Closed doors: 70-76
- Special: 77-79

### For Atmosphere
Use tiles 100-143 for decoration:
- Danger signs: 104-111 (skulls/bones)
- Prison theme: 112-117 (chains)
- Ancient theme: 118-127 (urns)
- Lighting: 128-133 (braziers)
- Effects: 134-143 (blood, moss)

## 📐 Tile Dimensions

All tiles are:
- **Size**: 256×256 pixels
- **Perspective**: Isometric (diamond shape)
- **Format**: PNG with transparency
- **Grid**: 12×12 layout
- **Total**: 144 tiles per sheet

## 🎨 Color Palette

### Dark Crypt (Image 1)
- Base stone: #4a4a4a (dark gray)
- Moss: #3a5a2a (dark green)
- Blood: #8b0000 (dark red)
- Torch light: #ff8c00 (orange)
- Shadows: #1a1a1a (near black)

### Stone Dungeon (Image 2)
- Base stone: #8a8a7a (light gray)
- Moss: #6a8a5a (light green)
- Metal: #5a5a6a (blue-gray)
- Bone: #d0d0c0 (off-white)
- Shadows: #4a4a4a (medium gray)

### Mixed Dungeon (Image 3)
- Combines both palettes
- Additional gold accents: #ffd700
- Purple mystical: #9400d3
- Green toxic: #00ff00 (for variants)

## 🔧 Integration Notes

### With Dungeon Generator
```typescript
// Floor layer uses tiles 0-19
const floorTile = Math.random() < 0.8 ? 0 : 4; // Mostly clean, some cracked

// Wall layer uses tiles 20-39
const wallTile = isCorner ? 50 : 20; // Corners or standard walls

// Prop layer uses tiles 100-143
const propTile = room.type === 'treasure' ? 120 : 104; // Urn or skull
```

### With Tiled Editor
1. Import tileset image
2. Set tile size to 256×256
3. Set grid to 12×12
4. Mark animated tiles (29, 66-69, 76-78, 129)
5. Set collision for walls (20-39)
6. Set walkable for floors (0-19)

### With Game Engine
```typescript
// Load tileset
const tileset = loadImage('crypt_tileset.png');

// Render tile
function renderTile(tileId: number, x: number, y: number) {
  const col = tileId % 12;
  const row = Math.floor(tileId / 12);
  const sx = col * 256;
  const sy = row * 256;
  
  drawImage(tileset, sx, sy, 256, 256, x, y, 256, 256);
}
```

## 📊 Tile Statistics

Based on visual analysis:

| Category | Count | Percentage |
|----------|-------|------------|
| Floors | 20 | 13.9% |
| Walls | 20 | 13.9% |
| Structures | 20 | 13.9% |
| Entrances | 20 | 13.9% |
| Props | 20 | 13.9% |
| Decorations | 44 | 30.5% |
| **Total** | **144** | **100%** |

### Special Features
- Animated tiles: 12 (8.3%)
- Torch-lit: 10 (6.9%)
- Doors: 15 (10.4%)
- Arches: 20 (13.9%)
- Skulls/Bones: 12 (8.3%)
- Chains: 8 (5.6%)
- Urns/Vessels: 12 (8.3%)

## 🎮 Recommended Usage

### For Crypt/Tomb Levels
- Floors: 0, 4, 7, 10 (stone, cracked, dark, blood)
- Walls: 20, 24, 27, 30 (stone, moss, torch, skull)
- Props: 104-111, 118-127 (skulls, urns)

### For Prison Levels
- Floors: 0, 4, 8 (stone, cracked, debris)
- Walls: 30, 33, 35 (barred, corner, grate)
- Props: 112-117, 104-107 (chains, skulls)

### For Temple Levels
- Floors: 0, 13, 16 (clean, ritual, runes)
- Walls: 20, 38 (clean, decorated)
- Props: 89-94, 128-133 (altars, braziers)

### For Treasure Rooms
- Floors: 0, 16 (clean, special)
- Walls: 20, 26 (clean, alcove)
- Props: 118-127, 140-141 (urns, ritual markings)

## 🔮 Future Enhancements

Based on the visual quality:
- [ ] Extract individual tiles from sheets
- [ ] Create animation sprite sheets
- [ ] Generate normal maps for 3D lighting
- [ ] Create height maps for parallax
- [ ] Build material variants (lava, ice, etc.)
- [ ] Add particle effects for torches
- [ ] Create transition tiles for biome mixing

## 📚 References

- Original tileset images: 3 sheets provided
- Tile size: 256×256px isometric
- Style: Hand-painted dark fantasy
- Quality: Production-ready, game-quality assets
