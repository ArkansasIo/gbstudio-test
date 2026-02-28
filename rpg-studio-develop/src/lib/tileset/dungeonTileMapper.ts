/**
 * Dungeon to Tilemap Converter
 * Maps procedural dungeons to tileset tiles
 */

import { Dungeon, Room, BiomeType } from '../dungeon/types';
import { CRYPT_TILES, TILE_CATEGORIES } from './cryptTileDefinitions';
import { TiledMapLayer } from './types';

export interface TilemapData {
  width: number;
  height: number;
  layers: TilemapLayer[];
}

export interface TilemapLayer {
  name: string;
  data: number[][];
  zIndex: number;
}

/**
 * Convert dungeon to tilemap
 */
export function dungeonToTilemap(dungeon: Dungeon): TilemapData {
  const { width, height } = dungeon.config;
  const { grid, rooms } = dungeon;
  
  const layers: TilemapLayer[] = [
    {
      name: 'Floor',
      data: generateFloorLayer(dungeon),
      zIndex: 0
    },
    {
      name: 'Walls',
      data: generateWallLayer(dungeon),
      zIndex: 1
    },
    {
      name: 'Props',
      data: generatePropLayer(dungeon),
      zIndex: 2
    },
    {
      name: 'Decorations',
      data: generateDecorationLayer(dungeon),
      zIndex: 3
    }
  ];

  return {
    width,
    height,
    layers
  };
}

/**
 * Generate floor layer
 */
function generateFloorLayer(dungeon: Dungeon): number[][] {
  const { width, height } = dungeon.config;
  const { grid, rooms } = dungeon;
  const layer: number[][] = Array(height).fill(0).map(() => Array(width).fill(0));

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const cell = grid[y][x];
      
      if (cell > 0) {
        // Room floor
        const room = rooms.find(r => 
          x >= r.x && x < r.x + r.width &&
          y >= r.y && y < r.y + r.height
        );
        
        if (room) {
          layer[y][x] = getFloorTileForRoom(room, x, y);
        }
      } else if (cell === -1) {
        // Corridor floor
        layer[y][x] = TILE_CATEGORIES.floors[0].id; // Basic stone floor
      }
    }
  }

  return layer;
}

/**
 * Generate wall layer
 */
function generateWallLayer(dungeon: Dungeon): number[][] {
  const { width, height } = dungeon.config;
  const { grid } = dungeon;
  const layer: number[][] = Array(height).fill(0).map(() => Array(width).fill(0));

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (isWallPosition(grid, x, y, width, height)) {
        layer[y][x] = getWallTile(grid, x, y, width, height);
      }
    }
  }

  return layer;
}

/**
 * Generate prop layer
 */
function generatePropLayer(dungeon: Dungeon): number[][] {
  const { width, height } = dungeon.config;
  const layer: number[][] = Array(height).fill(0).map(() => Array(width).fill(0));

  dungeon.rooms.forEach(room => {
    // Add props based on room type and features
    if (room.type === 'treasure') {
      // Add treasure props
      const centerX = Math.floor(room.x + room.width / 2);
      const centerY = Math.floor(room.y + room.height / 2);
      layer[centerY][centerX] = 52; // Urn
    }

    if (room.type === 'boss') {
      // Add boss room props
      const centerX = Math.floor(room.x + room.width / 2);
      const centerY = Math.floor(room.y + room.height / 2);
      layer[centerY][centerX] = 41; // Ritual altar
    }

    // Add feature-based props
    room.features.forEach(feature => {
      const propTile = getFeaturePropTile(feature);
      if (propTile) {
        const randomX = room.x + Math.floor(Math.random() * room.width);
        const randomY = room.y + Math.floor(Math.random() * room.height);
        if (layer[randomY][randomX] === 0) {
          layer[randomY][randomX] = propTile;
        }
      }
    });
  });

  return layer;
}

/**
 * Generate decoration layer
 */
function generateDecorationLayer(dungeon: Dungeon): number[][] {
  const { width, height } = dungeon.config;
  const layer: number[][] = Array(height).fill(0).map(() => Array(width).fill(0));

  dungeon.rooms.forEach(room => {
    // Randomly add decorations
    const decorationCount = Math.floor(Math.random() * 3);
    
    for (let i = 0; i < decorationCount; i++) {
      const x = room.x + Math.floor(Math.random() * room.width);
      const y = room.y + Math.floor(Math.random() * room.height);
      
      if (layer[y][x] === 0) {
        layer[y][x] = getRandomDecoration();
      }
    }
  });

  return layer;
}

/**
 * Get floor tile for room
 */
function getFloorTileForRoom(room: Room, x: number, y: number): number {
  const floorTiles = TILE_CATEGORIES.floors;
  
  // Special floor for room types
  if (room.type === 'entrance') {
    return floorTiles[0].id; // Clean stone
  }
  
  if (room.type === 'boss') {
    return floorTiles[6].id; // Ritual circle
  }
  
  if (room.type === 'treasure') {
    return floorTiles[7].id; // Rune floor
  }
  
  // Random variation
  const random = (x * 7 + y * 13) % 100;
  if (random < 10) return floorTiles[1].id; // Cracked
  if (random < 20) return floorTiles[2].id; // Moss
  if (random < 25) return floorTiles[4].id; // Bones
  
  return floorTiles[0].id; // Default stone
}

/**
 * Check if position should have a wall
 */
function isWallPosition(
  grid: number[][],
  x: number,
  y: number,
  width: number,
  height: number
): boolean {
  if (x < 0 || x >= width || y < 0 || y >= height) return false;
  
  const cell = grid[y][x];
  if (cell !== 0) return false; // Not empty
  
  // Check if adjacent to room or corridor
  const neighbors = [
    { dx: 0, dy: -1 }, // North
    { dx: 1, dy: 0 },  // East
    { dx: 0, dy: 1 },  // South
    { dx: -1, dy: 0 }  // West
  ];
  
  return neighbors.some(({ dx, dy }) => {
    const nx = x + dx;
    const ny = y + dy;
    if (nx < 0 || nx >= width || ny < 0 || ny >= height) return false;
    return grid[ny][nx] !== 0;
  });
}

/**
 * Get wall tile based on neighbors
 */
function getWallTile(
  grid: number[][],
  x: number,
  y: number,
  width: number,
  height: number
): number {
  const wallTiles = TILE_CATEGORIES.walls;
  
  // Check neighbors for wall type
  const hasNorth = y > 0 && grid[y - 1][x] !== 0;
  const hasSouth = y < height - 1 && grid[y + 1][x] !== 0;
  const hasEast = x < width - 1 && grid[y][x + 1] !== 0;
  const hasWest = x > 0 && grid[y][x - 1] !== 0;
  
  // Corner detection
  if (hasNorth && hasEast && !hasSouth && !hasWest) return 29; // NE corner
  if (hasNorth && hasWest && !hasSouth && !hasEast) return 30; // NW corner
  if (hasSouth && hasEast && !hasNorth && !hasWest) return 31; // SE corner
  if (hasSouth && hasWest && !hasNorth && !hasEast) return 32; // SW corner
  
  // Random wall variation
  const random = (x * 11 + y * 17) % 100;
  if (random < 10) return wallTiles[1].id; // Mossy
  if (random < 15) return wallTiles[2].id; // Cracked
  if (random < 20) return wallTiles[3].id; // Skull
  
  return wallTiles[0].id; // Default stone wall
}

/**
 * Get prop tile for terrain feature
 */
function getFeaturePropTile(feature: string): number | null {
  const propMap: Record<string, number> = {
    'altar': 41,
    'statue': 44,
    'pillar': 24,
    'fungus': 69,
    'crystal': 70,
    'rubble': 60,
    'water': 0, // Handled by floor
    'lava': 0,  // Handled by floor
    'pit': 0,   // Handled by floor
    'chasm': 0  // Handled by floor
  };
  
  return propMap[feature] || null;
}

/**
 * Get random decoration tile
 */
function getRandomDecoration(): number {
  const decorations = TILE_CATEGORIES.decorations;
  return decorations[Math.floor(Math.random() * decorations.length)].id;
}

/**
 * Convert tilemap to Tiled format
 */
export function tilemapToTiledLayers(tilemap: TilemapData): TiledMapLayer[] {
  return tilemap.layers.map((layer, index) => ({
    id: index + 1,
    name: layer.name,
    type: 'tilelayer' as const,
    visible: true,
    opacity: 1,
    x: 0,
    y: 0,
    width: tilemap.width,
    height: tilemap.height,
    data: layer.data.flat()
  }));
}

/**
 * Export dungeon as Tiled map
 */
export function exportDungeonAsTiledMap(
  dungeon: Dungeon,
  tilesetPath: string,
  outputPath: string
): void {
  const tilemap = dungeonToTilemap(dungeon);
  const layers = tilemapToTiledLayers(tilemap);
  
  // Use the Tiled exporter
  const { generateTiledMap } = require('./tiledExporter');
  generateTiledMap(
    tilemap.width,
    tilemap.height,
    tilesetPath,
    layers,
    outputPath
  );
}
