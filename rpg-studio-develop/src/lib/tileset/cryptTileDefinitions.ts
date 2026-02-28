/**
 * Crypt Tileset Definitions
 * 12×12 grid (144 tiles) with categories and collision data
 */

import { CryptTileDefinition, TileCategory, CollisionType, TilesetConfig } from './types';

export const CRYPT_TILESET_CONFIG: TilesetConfig = {
  name: 'Isometric Crypt',
  imagePath: 'assets/tilesets/crypt_tileset.png', // Default path, can be overridden
  tileWidth: 256,
  tileHeight: 256,
  columns: 12,
  rows: 12,
  spacing: 0,
  margin: 0,
  tileCount: 144
};

// Tile ID mapping (0-143 for 12×12 grid)
export const CRYPT_TILES: CryptTileDefinition[] = [
  // Row 0: Floor Variants (0-11)
  { id: 0, name: 'Stone Floor', category: 'floor', variant: 'clean', collision: 'none', walkable: true, transparent: true, description: 'Ancient stone floor' },
  { id: 1, name: 'Cracked Floor', category: 'floor', variant: 'damaged', collision: 'none', walkable: true, transparent: true, description: 'Cracked stone floor' },
  { id: 2, name: 'Moss Floor', category: 'floor', variant: 'moss', collision: 'none', walkable: true, transparent: true, description: 'Moss-covered floor' },
  { id: 3, name: 'Broken Floor', category: 'floor', variant: 'broken', collision: 'none', walkable: true, transparent: true, description: 'Broken stone floor' },
  { id: 4, name: 'Bone Floor', category: 'floor', variant: 'bones', collision: 'none', walkable: true, transparent: true, description: 'Bone-embedded floor' },
  { id: 5, name: 'Blood Floor', category: 'floor', variant: 'blood', collision: 'none', walkable: true, transparent: true, description: 'Blood-stained floor' },
  { id: 6, name: 'Ritual Circle', category: 'floor', variant: 'ritual', collision: 'none', walkable: true, transparent: true, description: 'Ritual circle floor' },
  { id: 7, name: 'Rune Floor', category: 'floor', variant: 'runes', collision: 'none', walkable: true, transparent: true, description: 'Rune-etched floor' },
  { id: 8, name: 'Metal Grate', category: 'floor', variant: 'grate', collision: 'none', walkable: true, transparent: true, description: 'Metal grate floor' },
  { id: 9, name: 'Sarcophagus Lid', category: 'floor', variant: 'sarcophagus', collision: 'none', walkable: true, transparent: true, description: 'Sarcophagus lid floor' },
  { id: 10, name: 'Chained Floor', category: 'floor', variant: 'chains', collision: 'none', walkable: true, transparent: true, description: 'Chained floor' },
  { id: 11, name: 'Dark Floor', category: 'floor', variant: 'dark', collision: 'none', walkable: true, transparent: true, description: 'Dark stone floor' },

  // Row 1: Wall Tiles (12-23)
  { id: 12, name: 'Stone Wall', category: 'wall', variant: 'clean', collision: 'full', walkable: false, transparent: false, description: 'Stone brick wall' },
  { id: 13, name: 'Mossy Wall', category: 'wall', variant: 'moss', collision: 'full', walkable: false, transparent: false, description: 'Moss-covered wall' },
  { id: 14, name: 'Cracked Wall', category: 'wall', variant: 'cracked', collision: 'full', walkable: false, transparent: false, description: 'Cracked stone wall' },
  { id: 15, name: 'Skull Wall', category: 'wall', variant: 'skulls', collision: 'full', walkable: false, transparent: false, description: 'Skull-decorated wall' },
  { id: 16, name: 'Bone Wall', category: 'wall', variant: 'bones', collision: 'full', walkable: false, transparent: false, description: 'Ossuary bone wall' },
  { id: 17, name: 'Barred Wall', category: 'wall', variant: 'bars', collision: 'full', walkable: false, transparent: false, description: 'Prison bar wall' },
  { id: 18, name: 'Alcove Wall', category: 'wall', variant: 'alcove', collision: 'half', walkable: false, transparent: false, description: 'Wall with alcove' },
  { id: 19, name: 'Archway Wall', category: 'wall', variant: 'arch', collision: 'half', walkable: true, transparent: false, description: 'Archway wall' },
  { id: 20, name: 'Torch Wall', category: 'wall', variant: 'torch', collision: 'full', walkable: false, transparent: false, animated: true, frames: [20, 68, 116], description: 'Wall with torch' },
  { id: 21, name: 'Collapsed Wall', category: 'wall', variant: 'rubble', collision: 'half', walkable: false, transparent: false, description: 'Collapsed wall rubble' },
  { id: 22, name: 'Dark Wall', category: 'wall', variant: 'dark', collision: 'full', walkable: false, transparent: false, description: 'Dark stone wall' },
  { id: 23, name: 'Decorated Wall', category: 'wall', variant: 'decorated', collision: 'full', walkable: false, transparent: false, description: 'Decorated wall' },

  // Row 2: Structural Pieces (24-35)
  { id: 24, name: 'Pillar Base', category: 'structure', variant: 'base', collision: 'full', walkable: false, transparent: false, description: 'Stone pillar base' },
  { id: 25, name: 'Pillar Mid', category: 'structure', variant: 'mid', collision: 'full', walkable: false, transparent: false, description: 'Stone pillar middle' },
  { id: 26, name: 'Pillar Top', category: 'structure', variant: 'top', collision: 'full', walkable: false, transparent: false, description: 'Stone pillar top' },
  { id: 27, name: 'Broken Pillar', category: 'structure', variant: 'broken', collision: 'half', walkable: false, transparent: false, description: 'Broken pillar' },
  { id: 28, name: 'Pillar Rubble', category: 'structure', variant: 'rubble', collision: 'quarter', walkable: true, transparent: true, description: 'Pillar rubble' },
  { id: 29, name: 'Corner NE', category: 'corner', variant: 'ne', collision: 'full', walkable: false, transparent: false, description: 'Northeast corner' },
  { id: 30, name: 'Corner NW', category: 'corner', variant: 'nw', collision: 'full', walkable: false, transparent: false, description: 'Northwest corner' },
  { id: 31, name: 'Corner SE', category: 'corner', variant: 'se', collision: 'full', walkable: false, transparent: false, description: 'Southeast corner' },
  { id: 32, name: 'Corner SW', category: 'corner', variant: 'sw', collision: 'full', walkable: false, transparent: false, description: 'Southwest corner' },
  { id: 33, name: 'T-Junction N', category: 'transition', variant: 't-north', collision: 'full', walkable: false, transparent: false, description: 'T-junction north' },
  { id: 34, name: 'T-Junction S', category: 'transition', variant: 't-south', collision: 'full', walkable: false, transparent: false, description: 'T-junction south' },
  { id: 35, name: 'T-Junction E', category: 'transition', variant: 't-east', collision: 'full', walkable: false, transparent: false, description: 'T-junction east' },

  // Row 3: Entrances & Structures (36-47)
  { id: 36, name: 'Crypt Entrance', category: 'entrance', variant: 'arch', collision: 'half', walkable: true, transparent: false, description: 'Crypt entrance arch' },
  { id: 37, name: 'Sealed Door', category: 'entrance', variant: 'sealed', collision: 'full', walkable: false, transparent: false, description: 'Sealed doorway' },
  { id: 38, name: 'Broken Door', category: 'entrance', variant: 'broken', collision: 'half', walkable: true, transparent: false, description: 'Broken doorway' },
  { id: 39, name: 'Iron Gate', category: 'entrance', variant: 'gate', collision: 'full', walkable: false, transparent: false, description: 'Iron bar gate' },
  { id: 40, name: 'Rune Door', category: 'entrance', variant: 'rune', collision: 'full', walkable: false, transparent: false, description: 'Rune-sealed door' },
  { id: 41, name: 'Ritual Altar', category: 'structure', variant: 'altar', collision: 'full', walkable: false, transparent: false, description: 'Ritual altar' },
  { id: 42, name: 'Sarcophagus Front', category: 'structure', variant: 'sarcophagus', collision: 'full', walkable: false, transparent: false, description: 'Sarcophagus front' },
  { id: 43, name: 'Tomb Niche', category: 'structure', variant: 'niche', collision: 'half', walkable: false, transparent: false, description: 'Tomb niche' },
  { id: 44, name: 'Statue Base', category: 'structure', variant: 'statue-base', collision: 'full', walkable: false, transparent: false, description: 'Statue base' },
  { id: 45, name: 'Brazier Stand', category: 'structure', variant: 'brazier', collision: 'quarter', walkable: false, transparent: true, animated: true, frames: [45, 93, 141], description: 'Stone brazier' },
  { id: 46, name: 'Coffin Closed', category: 'structure', variant: 'coffin', collision: 'full', walkable: false, transparent: false, description: 'Closed coffin' },
  { id: 47, name: 'Coffin Open', category: 'structure', variant: 'coffin-open', collision: 'half', walkable: false, transparent: false, description: 'Open coffin' },

  // Row 4: Props & Interactables (48-59)
  { id: 48, name: 'Skull Single', category: 'prop', variant: 'skull', collision: 'none', walkable: true, transparent: true, description: 'Single skull' },
  { id: 49, name: 'Skull Pile', category: 'prop', variant: 'skull-pile', collision: 'quarter', walkable: true, transparent: true, description: 'Pile of skulls' },
  { id: 50, name: 'Bones Scattered', category: 'prop', variant: 'bones', collision: 'none', walkable: true, transparent: true, description: 'Scattered bones' },
  { id: 51, name: 'Bone Pile', category: 'prop', variant: 'bone-pile', collision: 'quarter', walkable: true, transparent: true, description: 'Pile of bones' },
  { id: 52, name: 'Urn Intact', category: 'prop', variant: 'urn', collision: 'quarter', walkable: false, transparent: true, description: 'Intact urn' },
  { id: 53, name: 'Urn Broken', category: 'prop', variant: 'urn-broken', collision: 'none', walkable: true, transparent: true, description: 'Broken urn' },
  { id: 54, name: 'Chains Hanging', category: 'prop', variant: 'chains', collision: 'none', walkable: true, transparent: true, description: 'Hanging chains' },
  { id: 55, name: 'Shackles', category: 'prop', variant: 'shackles', collision: 'none', walkable: true, transparent: true, description: 'Wall shackles' },
  { id: 56, name: 'Brazier Lit', category: 'prop', variant: 'brazier-lit', collision: 'quarter', walkable: false, transparent: true, animated: true, frames: [56, 104], description: 'Lit brazier' },
  { id: 57, name: 'Ritual Marking', category: 'decoration', variant: 'ritual', collision: 'none', walkable: true, transparent: true, description: 'Ritual floor marking' },
  { id: 58, name: 'Offering Bowl', category: 'prop', variant: 'bowl', collision: 'quarter', walkable: false, transparent: true, description: 'Offering bowl' },
  { id: 59, name: 'Debris Small', category: 'prop', variant: 'debris', collision: 'none', walkable: true, transparent: true, description: 'Small debris' },

  // Row 5: Additional Props (60-71)
  { id: 60, name: 'Debris Large', category: 'prop', variant: 'debris-large', collision: 'quarter', walkable: true, transparent: true, description: 'Large debris' },
  { id: 61, name: 'Cracked Slab', category: 'prop', variant: 'slab', collision: 'half', walkable: false, transparent: false, description: 'Cracked stone slab' },
  { id: 62, name: 'Ancient Plaque', category: 'decoration', variant: 'plaque', collision: 'none', walkable: true, transparent: true, description: 'Ancient wall plaque' },
  { id: 63, name: 'Candelabra', category: 'prop', variant: 'candelabra', collision: 'quarter', walkable: false, transparent: true, animated: true, frames: [63, 111], description: 'Stone candelabra' },
  { id: 64, name: 'Cobweb Corner', category: 'decoration', variant: 'cobweb', collision: 'none', walkable: true, transparent: true, description: 'Corner cobwebs' },
  { id: 65, name: 'Blood Pool', category: 'decoration', variant: 'blood', collision: 'none', walkable: true, transparent: true, description: 'Blood pool' },
  { id: 66, name: 'Crack Small', category: 'decoration', variant: 'crack', collision: 'none', walkable: true, transparent: true, description: 'Small floor crack' },
  { id: 67, name: 'Crack Large', category: 'decoration', variant: 'crack-large', collision: 'none', walkable: true, transparent: true, description: 'Large floor crack' },
  { id: 68, name: 'Torch Anim 1', category: 'decoration', variant: 'torch-1', collision: 'none', walkable: true, transparent: true, description: 'Torch animation frame 1' },
  { id: 69, name: 'Moss Patch', category: 'decoration', variant: 'moss', collision: 'none', walkable: true, transparent: true, description: 'Moss patch' },
  { id: 70, name: 'Rune Glow', category: 'decoration', variant: 'rune-glow', collision: 'none', walkable: true, transparent: true, animated: true, frames: [70, 118], description: 'Glowing rune' },
  { id: 71, name: 'Shadow Overlay', category: 'decoration', variant: 'shadow', collision: 'none', walkable: true, transparent: true, description: 'Shadow overlay' },

  // Rows 6-11: Additional tiles (72-143)
  // These would be filled with more variants, transitions, and decorations
  ...Array.from({ length: 72 }, (_, i) => ({
    id: 72 + i,
    name: `Tile ${72 + i}`,
    category: 'decoration' as TileCategory,
    variant: `variant-${i}`,
    collision: 'none' as CollisionType,
    walkable: true,
    transparent: true,
    description: `Additional tile ${72 + i}`
  }))
];

// Tile categories for easy filtering
export const TILE_CATEGORIES = {
  floors: CRYPT_TILES.filter(t => t.category === 'floor'),
  walls: CRYPT_TILES.filter(t => t.category === 'wall'),
  structures: CRYPT_TILES.filter(t => t.category === 'structure'),
  entrances: CRYPT_TILES.filter(t => t.category === 'entrance'),
  props: CRYPT_TILES.filter(t => t.category === 'prop'),
  decorations: CRYPT_TILES.filter(t => t.category === 'decoration'),
  corners: CRYPT_TILES.filter(t => t.category === 'corner'),
  transitions: CRYPT_TILES.filter(t => t.category === 'transition')
};

// Animated tiles
export const ANIMATED_TILES = CRYPT_TILES.filter(t => t.animated);

// Walkable tiles
export const WALKABLE_TILES = CRYPT_TILES.filter(t => t.walkable);

// Collision tiles
export const COLLISION_TILES = CRYPT_TILES.filter(t => t.collision !== 'none');
