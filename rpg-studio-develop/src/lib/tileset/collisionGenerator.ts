/**
 * Collision and Autotile Rule Generator
 */

import * as fs from 'fs';
import { CRYPT_TILES, TILE_CATEGORIES } from './cryptTileDefinitions';
import { AutotileRule, CollisionType } from './types';

export interface CollisionMap {
  tileId: number;
  collision: CollisionType;
  shape: CollisionShape;
}

export interface CollisionShape {
  type: 'rectangle' | 'polygon' | 'circle';
  points?: { x: number; y: number }[];
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  radius?: number;
}

/**
 * Generate collision data for all tiles
 */
export function generateCollisionData(): CollisionMap[] {
  return CRYPT_TILES.map(tile => {
    const shape = getCollisionShape(tile.collision, 256, 256);
    return {
      tileId: tile.id,
      collision: tile.collision,
      shape
    };
  });
}

/**
 * Get collision shape based on collision type
 */
function getCollisionShape(
  collision: CollisionType,
  tileWidth: number,
  tileHeight: number
): CollisionShape {
  switch (collision) {
    case 'full':
      return {
        type: 'rectangle',
        x: 0,
        y: 0,
        width: tileWidth,
        height: tileHeight
      };
    
    case 'half':
      return {
        type: 'rectangle',
        x: 0,
        y: 0,
        width: tileWidth / 2,
        height: tileHeight / 2
      };
    
    case 'quarter':
      return {
        type: 'rectangle',
        x: 0,
        y: 0,
        width: tileWidth / 4,
        height: tileHeight / 4
      };
    
    case 'custom':
      // Isometric diamond shape
      return {
        type: 'polygon',
        points: [
          { x: tileWidth / 2, y: 0 },
          { x: tileWidth, y: tileHeight / 2 },
          { x: tileWidth / 2, y: tileHeight },
          { x: 0, y: tileHeight / 2 }
        ]
      };
    
    case 'none':
    default:
      return {
        type: 'rectangle',
        x: 0,
        y: 0,
        width: 0,
        height: 0
      };
  }
}

/**
 * Generate autotile rules for wall tiles
 */
export function generateAutotileRules(): Record<number, AutotileRule> {
  const rules: Record<number, AutotileRule> = {};

  // Wall autotiling (blob pattern)
  TILE_CATEGORIES.walls.forEach(tile => {
    rules[tile.id] = {
      type: 'wall',
      neighbors: [
        tile.id - 12, // North
        tile.id + 1,  // East
        tile.id + 12, // South
        tile.id - 1   // West
      ],
      priority: 10
    };
  });

  // Floor autotiling
  TILE_CATEGORIES.floors.forEach(tile => {
    rules[tile.id] = {
      type: 'floor',
      neighbors: [
        tile.id - 12,
        tile.id + 1,
        tile.id + 12,
        tile.id - 1
      ],
      priority: 5
    };
  });

  // Corner autotiling
  TILE_CATEGORIES.corners.forEach(tile => {
    rules[tile.id] = {
      type: 'corner',
      neighbors: [],
      priority: 15
    };
  });

  return rules;
}

/**
 * Generate blob autotile configuration (47-tile blob)
 */
export function generateBlobAutotileConfig(): BlobAutotileConfig {
  return {
    name: 'Crypt Wall Blob',
    tileSize: 256,
    bitmask: {
      // 47-tile blob pattern
      // Each entry maps a neighbor configuration to a tile ID
      0b00000000: 12,  // No neighbors - isolated
      0b00000001: 13,  // North only
      0b00000010: 14,  // East only
      0b00000100: 15,  // South only
      0b00001000: 16,  // West only
      0b00000011: 17,  // North + East
      0b00000110: 18,  // East + South
      0b00001100: 19,  // South + West
      0b00001001: 20,  // West + North
      0b00001111: 21,  // All sides
      // ... more patterns
    }
  };
}

export interface BlobAutotileConfig {
  name: string;
  tileSize: number;
  bitmask: Record<number, number>;
}

/**
 * Export collision data to JSON
 */
export function exportCollisionJSON(outputPath: string): void {
  const collisionData = generateCollisionData();
  const autotileRules = generateAutotileRules();

  const data = {
    version: '1.0',
    tileset: 'Isometric Crypt',
    collision: collisionData,
    autotile: autotileRules,
    metadata: {
      generated: new Date().toISOString(),
      tileCount: CRYPT_TILES.length,
      collisionTiles: collisionData.filter(c => c.collision !== 'none').length
    }
  };

  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
}

/**
 * Generate collision layer for game engine
 */
export function generateCollisionLayer(
  tileData: number[][],
  tileWidth: number,
  tileHeight: number
): CollisionObject[] {
  const objects: CollisionObject[] = [];
  const collisionMap = generateCollisionData();

  tileData.forEach((row, y) => {
    row.forEach((tileId, x) => {
      const collision = collisionMap.find(c => c.tileId === tileId);
      if (collision && collision.collision !== 'none') {
        objects.push({
          x: x * tileWidth,
          y: y * tileHeight,
          width: collision.shape.width || tileWidth,
          height: collision.shape.height || tileHeight,
          type: 'solid',
          tileId
        });
      }
    });
  });

  return objects;
}

export interface CollisionObject {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'solid' | 'platform' | 'trigger';
  tileId: number;
}

/**
 * Generate navigation mesh data
 */
export function generateNavMesh(
  tileData: number[][],
  tileWidth: number,
  tileHeight: number
): NavMeshNode[] {
  const nodes: NavMeshNode[] = [];
  const walkableTiles = CRYPT_TILES.filter(t => t.walkable).map(t => t.id);

  tileData.forEach((row, y) => {
    row.forEach((tileId, x) => {
      if (walkableTiles.includes(tileId)) {
        nodes.push({
          id: `${x}_${y}`,
          x: x * tileWidth + tileWidth / 2,
          y: y * tileHeight + tileHeight / 2,
          neighbors: [],
          cost: 1
        });
      }
    });
  });

  // Connect neighbors
  nodes.forEach(node => {
    const [x, y] = node.id.split('_').map(Number);
    
    // Check 4 directions
    const directions = [
      { dx: 0, dy: -1 }, // North
      { dx: 1, dy: 0 },  // East
      { dx: 0, dy: 1 },  // South
      { dx: -1, dy: 0 }  // West
    ];

    directions.forEach(dir => {
      const neighborId = `${x + dir.dx}_${y + dir.dy}`;
      const neighbor = nodes.find(n => n.id === neighborId);
      if (neighbor) {
        node.neighbors.push(neighborId);
      }
    });
  });

  return nodes;
}

export interface NavMeshNode {
  id: string;
  x: number;
  y: number;
  neighbors: string[];
  cost: number;
}
