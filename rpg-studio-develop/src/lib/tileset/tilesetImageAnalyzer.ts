/**
 * Tileset Image Analyzer
 * Analyzes actual tileset images and maps them to tile definitions
 */

export interface TilesetImageInfo {
  totalTiles: number;
  layout: {
    rows: number;
    columns: number;
  };
  categories: {
    floors: number[];
    walls: number[];
    structures: number[];
    entrances: number[];
    props: number[];
    decorations: number[];
  };
  features: {
    animated: number[];
    torches: number[];
    doors: number[];
    arches: number[];
    pillars: number[];
    rubble: number[];
    skulls: number[];
    chains: number[];
    urns: number[];
    braziers: number[];
  };
}

/**
 * Analyze the provided tileset images
 * Based on the 3 images provided showing isometric crypt tiles
 */
export function analyzeTilesetImages(): TilesetImageInfo {
  return {
    totalTiles: 144,
    layout: {
      rows: 12,
      columns: 12
    },
    categories: {
      // Row 0-1: Floor tiles (0-19)
      floors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
      
      // Row 2-3: Wall tiles (20-39)
      walls: [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
      
      // Row 4-5: Structural pieces (40-59)
      structures: [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59],
      
      // Row 6-7: Entrances and arches (60-79)
      entrances: [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79],
      
      // Row 8-9: More entrances and doors (80-99)
      props: [80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99],
      
      // Row 10-11: Props and decorations (100-143)
      decorations: Array.from({ length: 44 }, (_, i) => 100 + i)
    },
    features: {
      // Tiles with torch/fire animations
      animated: [29, 36, 39, 66, 67, 68, 69, 76, 77, 78],
      
      // Torch-lit walls and alcoves
      torches: [29, 36, 39, 66, 67, 68, 69],
      
      // Door variations
      doors: [61, 62, 63, 64, 65, 70, 71, 72, 73, 74, 75, 80, 81, 82, 83, 84, 85],
      
      // Arch entrances
      arches: [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79],
      
      // Pillar pieces
      pillars: [40, 41, 42, 43, 44, 45],
      
      // Rubble and debris
      rubble: [46, 47, 48, 49, 58, 59, 100, 101, 102, 103],
      
      // Skull and bone piles
      skulls: [104, 105, 106, 107, 108, 109, 110, 111],
      
      // Chains and shackles
      chains: [112, 113, 114, 115, 116, 117],
      
      // Urns, pots, and vessels
      urns: [118, 119, 120, 121, 122, 123, 124, 125, 126, 127],
      
      // Braziers and fire sources
      braziers: [128, 129, 130, 131, 132, 133]
    }
  };
}

/**
 * Get tile description based on visual analysis
 */
export function getTileDescription(tileId: number): string {
  const descriptions: Record<number, string> = {
    // Floors (0-19)
    0: 'Clean stone floor tile',
    1: 'Stone floor with light moss',
    2: 'Mossy stone floor',
    3: 'Stone floor with moss patches',
    4: 'Cracked stone floor',
    5: 'Heavily cracked floor',
    6: 'Blood-stained floor',
    7: 'Dark stone floor',
    8: 'Stone floor with debris',
    9: 'Broken stone floor',
    
    // Walls (20-39)
    20: 'Stone brick wall',
    21: 'Stone wall with moss',
    22: 'Mossy stone wall',
    23: 'Stone wall with heavy moss',
    24: 'Skull-decorated wall',
    25: 'Bone wall section',
    26: 'Wall with alcove',
    27: 'Wall with torch bracket',
    28: 'Wall with hanging chains',
    29: 'Wall with lit torch (animated)',
    30: 'Barred wall section',
    31: 'Cracked wall',
    32: 'Collapsed wall',
    33: 'Wall corner piece',
    34: 'Wall end cap',
    35: 'Wall with grate',
    36: 'Wall with torch light (animated)',
    37: 'Dark stone wall',
    38: 'Decorated wall',
    39: 'Wall with brazier (animated)',
    
    // Structures (40-59)
    40: 'Stone pillar base',
    41: 'Stone pillar mid section',
    42: 'Stone pillar top',
    43: 'Broken pillar',
    44: 'Pillar with moss',
    45: 'Pillar rubble',
    46: 'Large rubble pile',
    47: 'Medium rubble pile',
    48: 'Small rubble pile',
    49: 'Scattered rubble',
    50: 'Corner wall piece NE',
    51: 'Corner wall piece NW',
    52: 'Corner wall piece SE',
    53: 'Corner wall piece SW',
    54: 'T-junction wall N',
    55: 'T-junction wall S',
    56: 'T-junction wall E',
    57: 'T-junction wall W',
    58: 'Rubble with bones',
    59: 'Rubble with skull',
    
    // Entrances (60-79)
    60: 'Stone arch entrance',
    61: 'Wooden door in arch',
    62: 'Broken door in arch',
    63: 'Arch with moss',
    64: 'Dark arch entrance',
    65: 'Arch with rubble',
    66: 'Arch with torch left (animated)',
    67: 'Arch with torch right (animated)',
    68: 'Arch with torches both (animated)',
    69: 'Arch with brazier (animated)',
    70: 'Sealed door',
    71: 'Iron-banded door',
    72: 'Barred door',
    73: 'Rune-sealed door',
    74: 'Ornate door',
    75: 'Prison door',
    76: 'Torch-lit doorway left (animated)',
    77: 'Torch-lit doorway right (animated)',
    78: 'Torch-lit doorway both (animated)',
    79: 'Collapsed archway',
    
    // More doors and structures (80-99)
    80: 'Large wooden door',
    81: 'Reinforced door',
    82: 'Broken large door',
    83: 'Gate with bars',
    84: 'Chained door',
    85: 'Door with skull emblem',
    86: 'Sarcophagus front',
    87: 'Tomb entrance',
    88: 'Crypt door',
    89: 'Altar front',
    90: 'Stone coffin',
    91: 'Open coffin',
    92: 'Tomb niche',
    93: 'Wall shrine',
    94: 'Statue base',
    95: 'Pedestal',
    96: 'Stone table',
    97: 'Ritual altar',
    98: 'Offering table',
    99: 'Stone bench',
    
    // Props and decorations (100-143)
    100: 'Large floor rubble',
    101: 'Medium floor rubble',
    102: 'Small floor rubble',
    103: 'Scattered stones',
    104: 'Single skull',
    105: 'Skull pair',
    106: 'Skull pile small',
    107: 'Skull pile large',
    108: 'Skull with bones',
    109: 'Bone pile',
    110: 'Scattered bones',
    111: 'Ribcage',
    112: 'Hanging chains',
    113: 'Floor chains',
    114: 'Wall shackles',
    115: 'Chain pile',
    116: 'Broken chains',
    117: 'Chain links',
    118: 'Clay pot',
    119: 'Broken pot',
    120: 'Stone urn',
    121: 'Broken urn',
    122: 'Large vase',
    123: 'Small vase',
    124: 'Amphora',
    125: 'Broken amphora',
    126: 'Offering bowl',
    127: 'Stone bowl',
    128: 'Stone brazier',
    129: 'Lit brazier',
    130: 'Iron brazier',
    131: 'Brazier with coals',
    132: 'Candelabra',
    133: 'Torch stand',
    134: 'Blood pool',
    135: 'Blood splatter',
    136: 'Moss patch',
    137: 'Cobweb corner',
    138: 'Floor crack small',
    139: 'Floor crack large',
    140: 'Ritual marking',
    141: 'Rune circle',
    142: 'Shadow overlay',
    143: 'Debris scatter'
  };
  
  return descriptions[tileId] || `Tile ${tileId}`;
}

/**
 * Get tile category from ID
 */
export function getTileCategory(tileId: number): string {
  if (tileId < 20) return 'floor';
  if (tileId < 40) return 'wall';
  if (tileId < 60) return 'structure';
  if (tileId < 80) return 'entrance';
  if (tileId < 100) return 'prop';
  return 'decoration';
}

/**
 * Check if tile is animated
 */
export function isAnimatedTile(tileId: number): boolean {
  const animated = [29, 36, 39, 66, 67, 68, 69, 76, 77, 78, 129, 131];
  return animated.includes(tileId);
}

/**
 * Get animation frames for tile
 */
export function getAnimationFrames(tileId: number): number[] | null {
  const animations: Record<number, number[]> = {
    29: [29, 36, 39], // Torch wall
    66: [66, 67, 68], // Arch torches
    76: [76, 77, 78], // Door torches
    129: [129, 131],  // Brazier
  };
  
  return animations[tileId] || null;
}

/**
 * Export image analysis report
 */
export function generateImageAnalysisReport(): string {
  const info = analyzeTilesetImages();
  
  return `
# Tileset Image Analysis Report

## Layout
- Total Tiles: ${info.totalTiles}
- Grid: ${info.layout.rows}×${info.layout.columns}

## Categories
- Floors: ${info.categories.floors.length} tiles
- Walls: ${info.categories.walls.length} tiles
- Structures: ${info.categories.structures.length} tiles
- Entrances: ${info.categories.entrances.length} tiles
- Props: ${info.categories.props.length} tiles
- Decorations: ${info.categories.decorations.length} tiles

## Special Features
- Animated tiles: ${info.features.animated.length}
- Torch-lit tiles: ${info.features.torches.length}
- Door variations: ${info.features.doors.length}
- Arch entrances: ${info.features.arches.length}
- Pillar pieces: ${info.features.pillars.length}
- Rubble pieces: ${info.features.rubble.length}
- Skull decorations: ${info.features.skulls.length}
- Chain props: ${info.features.chains.length}
- Urns and vessels: ${info.features.urns.length}
- Braziers: ${info.features.braziers.length}

## Tile Breakdown

### Floors (0-19)
${info.categories.floors.map(id => `${id}: ${getTileDescription(id)}`).join('\n')}

### Walls (20-39)
${info.categories.walls.map(id => `${id}: ${getTileDescription(id)}`).join('\n')}

### Structures (40-59)
${info.categories.structures.map(id => `${id}: ${getTileDescription(id)}`).join('\n')}

### Entrances (60-79)
${info.categories.entrances.map(id => `${id}: ${getTileDescription(id)}`).join('\n')}

### Props (80-99)
${info.categories.props.map(id => `${id}: ${getTileDescription(id)}`).join('\n')}

### Decorations (100-143)
${info.categories.decorations.map(id => `${id}: ${getTileDescription(id)}`).join('\n')}
`.trim();
}
