/**
 * Integration Utilities
 * Connect maze system with dungeon, tileset, and world systems
 */

import type { Maze, Floor, MazeCell } from './types';
import type { Dungeon, Room } from '../dungeon/types';
import { DungeonGenerator } from '../dungeon/generator';

/**
 * Convert maze floor to dungeon
 */
export function mazeFloorToDungeon(floor: Floor, seed: number): Dungeon {
  const rooms: Room[] = [];
  let roomId = 0;

  // Find all distinct rooms in the maze
  const visited = new Set<string>();
  
  for (let y = 0; y < floor.height; y++) {
    for (let x = 0; x < floor.width; x++) {
      const key = `${x},${y}`;
      if (visited.has(key)) continue;

      const cell = floor.cells[y][x];
      if (!cell.roomType || cell.roomType === 'corridor') continue;

      // Create room from cell
      const room: Room = {
        id: `room_${roomId++}`,
        type: mapRoomType(cell.roomType),
        x: x * 2, // Scale up for dungeon grid
        y: y * 2,
        width: 2,
        height: 2,
        connections: [],
        features: [],
        description: `A ${cell.roomType.replace('_', ' ')} on floor ${floor.level}`
      };

      // Add treasure if present
      if (cell.treasure) {
        room.type = 'treasure';
      }

      rooms.push(room);
      visited.add(key);
    }
  }

  // Create grid
  const grid = Array(floor.height * 2).fill(0).map(() => Array(floor.width * 2).fill(0));

  // Fill grid with rooms
  rooms.forEach((room, idx) => {
    for (let y = room.y; y < room.y + room.height; y++) {
      for (let x = room.x; x < room.x + room.width; x++) {
        if (y < grid.length && x < grid[0].length) {
          grid[y][x] = idx + 1;
        }
      }
    }
  });

  // Map theme to biome type
  const biomeMap: Record<string, 'underdark' | 'crypt' | 'cave' | 'ruins' | 'fortress' | 'temple' | 'sewers' | 'mine' | 'laboratory' | 'prison'> = {
    'upper_crypt': 'crypt',
    'deep_caverns': 'cave',
    'underdark': 'underdark',
    'abyssal_depths': 'underdark',
    'void_realm': 'underdark',
    'stone_tower': 'fortress',
    'crystal_spire': 'ruins',
    'cloud_citadel': 'fortress',
    'celestial_heights': 'temple',
    'divine_pinnacle': 'temple'
  };
  
  const biome = biomeMap[floor.theme] || 'crypt';
  const difficulty = Math.min(4, Math.max(1, Math.ceil(floor.difficulty / 2.5))) as 1 | 2 | 3 | 4;

  return {
    id: `dungeon_floor_${floor.level}`,
    config: {
      seed,
      biome,
      difficulty,
      minRooms: rooms.length,
      maxRooms: rooms.length,
      width: floor.width * 2,
      height: floor.height * 2,
      branchingFactor: 0.5,
      treasureDensity: 0.2,
      trapDensity: 0.1
    },
    rooms,
    grid,
    startRoomId: rooms[0]?.id,
    bossRoomId: rooms.find(r => r.type === 'boss')?.id
  };
}

/**
 * Map maze room type to dungeon room type
 */
function mapRoomType(mazeRoomType: string): Room['type'] {
  const mapping: Record<string, Room['type']> = {
    'corridor': 'corridor',
    'chamber': 'chamber',
    'boss_room': 'boss',
    'treasure_room': 'treasure',
    'safe_room': 'rest',
    'puzzle_room': 'puzzle',
    'trap_room': 'trap',
    'arena': 'chamber',
    'shrine': 'shrine'
  };

  return mapping[mazeRoomType] || 'chamber';
}

/**
 * Generate dungeon for maze floor
 */
export function generateDungeonForFloor(floor: Floor, seed: number): Dungeon {
  // Map theme to biome type
  const biomeMap: Record<string, 'underdark' | 'crypt' | 'cave' | 'ruins' | 'fortress' | 'temple' | 'sewers' | 'mine' | 'laboratory' | 'prison'> = {
    'upper_crypt': 'crypt',
    'deep_caverns': 'cave',
    'underdark': 'underdark',
    'abyssal_depths': 'underdark',
    'void_realm': 'underdark',
    'stone_tower': 'fortress',
    'crystal_spire': 'ruins',
    'cloud_citadel': 'fortress',
    'celestial_heights': 'temple',
    'divine_pinnacle': 'temple'
  };
  
  const biome = biomeMap[floor.theme] || 'crypt';
  const difficulty = Math.min(4, Math.max(1, Math.ceil(floor.difficulty / 2.5))) as 1 | 2 | 3 | 4;

  const generator = new DungeonGenerator({
    seed: seed + floor.level * 1000,
    biome,
    difficulty,
    minRooms: 8,
    maxRooms: 15,
    width: floor.width * 4,
    height: floor.height * 4,
    branchingFactor: 0.5,
    treasureDensity: 0.2,
    trapDensity: 0.1
  });

  return generator.generate();
}

/**
 * Get maze cell at position
 */
export function getCellAt(floor: Floor, x: number, y: number): MazeCell | null {
  if (x < 0 || x >= floor.width || y < 0 || y >= floor.height) {
    return null;
  }
  return floor.cells[y][x];
}

/**
 * Get adjacent cells
 */
export function getAdjacentCells(floor: Floor, x: number, y: number): {
  north: MazeCell | null;
  south: MazeCell | null;
  east: MazeCell | null;
  west: MazeCell | null;
} {
  return {
    north: getCellAt(floor, x, y - 1),
    south: getCellAt(floor, x, y + 1),
    east: getCellAt(floor, x + 1, y),
    west: getCellAt(floor, x - 1, y)
  };
}

/**
 * Check if cells are connected
 */
export function areCellsConnected(cell1: MazeCell, cell2: MazeCell): boolean {
  // Check if cells are adjacent
  const dx = Math.abs(cell1.x - cell2.x);
  const dy = Math.abs(cell1.y - cell2.y);
  
  if (dx + dy !== 1) return false;

  // Check walls
  if (cell2.x > cell1.x) return !cell1.walls.east;
  if (cell2.x < cell1.x) return !cell1.walls.west;
  if (cell2.y > cell1.y) return !cell1.walls.south;
  if (cell2.y < cell1.y) return !cell1.walls.north;

  return false;
}

/**
 * Find path between cells using A*
 */
export function findPath(
  floor: Floor,
  startX: number,
  startY: number,
  endX: number,
  endY: number
): Array<{ x: number; y: number }> | null {
  const openSet = new Set<string>();
  const closedSet = new Set<string>();
  const cameFrom = new Map<string, string>();
  const gScore = new Map<string, number>();
  const fScore = new Map<string, number>();

  const startKey = `${startX},${startY}`;
  const endKey = `${endX},${endY}`;

  openSet.add(startKey);
  gScore.set(startKey, 0);
  fScore.set(startKey, heuristic(startX, startY, endX, endY));

  while (openSet.size > 0) {
    // Get node with lowest fScore
    let current = '';
    let lowestF = Infinity;
    
    for (const key of openSet) {
      const f = fScore.get(key) || Infinity;
      if (f < lowestF) {
        lowestF = f;
        current = key;
      }
    }

    if (current === endKey) {
      return reconstructPath(cameFrom, current);
    }

    openSet.delete(current);
    closedSet.add(current);

    const [cx, cy] = current.split(',').map(Number);
    const cell = getCellAt(floor, cx, cy);
    if (!cell) continue;

    // Check neighbors
    const neighbors = [
      { x: cx, y: cy - 1, wall: 'north' },
      { x: cx, y: cy + 1, wall: 'south' },
      { x: cx + 1, y: cy, wall: 'east' },
      { x: cx - 1, y: cy, wall: 'west' }
    ];

    for (const neighbor of neighbors) {
      const neighborKey = `${neighbor.x},${neighbor.y}`;
      
      if (closedSet.has(neighborKey)) continue;
      
      const neighborCell = getCellAt(floor, neighbor.x, neighbor.y);
      if (!neighborCell) continue;

      // Check if wall blocks path
      if (cell.walls[neighbor.wall as keyof typeof cell.walls]) continue;

      const tentativeG = (gScore.get(current) || 0) + 1;

      if (!openSet.has(neighborKey)) {
        openSet.add(neighborKey);
      } else if (tentativeG >= (gScore.get(neighborKey) || Infinity)) {
        continue;
      }

      cameFrom.set(neighborKey, current);
      gScore.set(neighborKey, tentativeG);
      fScore.set(neighborKey, tentativeG + heuristic(neighbor.x, neighbor.y, endX, endY));
    }
  }

  return null; // No path found
}

/**
 * Heuristic for A* (Manhattan distance)
 */
function heuristic(x1: number, y1: number, x2: number, y2: number): number {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

/**
 * Reconstruct path from A* search
 */
function reconstructPath(cameFrom: Map<string, string>, current: string): Array<{ x: number; y: number }> {
  const path: Array<{ x: number; y: number }> = [];
  
  while (current) {
    const [x, y] = current.split(',').map(Number);
    path.unshift({ x, y });
    current = cameFrom.get(current) || '';
  }

  return path;
}

/**
 * Get floor statistics
 */
export function getFloorStats(floor: Floor): {
  totalCells: number;
  corridorCells: number;
  roomCells: number;
  deadEnds: number;
  junctions: number;
  gates: number;
  treasures: number;
  traps: number;
} {
  let corridorCells = 0;
  let roomCells = 0;
  let deadEnds = 0;
  let junctions = 0;
  let gates = 0;
  let treasures = 0;
  let traps = 0;

  for (let y = 0; y < floor.height; y++) {
    for (let x = 0; x < floor.width; x++) {
      const cell = floor.cells[y][x];
      
      // Count room types
      if (cell.roomType === 'corridor' || !cell.roomType) {
        corridorCells++;
      } else {
        roomCells++;
      }

      // Count wall configuration
      const wallCount = Object.values(cell.walls).filter(w => w).length;
      if (wallCount === 3) deadEnds++;
      if (wallCount === 1) junctions++;

      // Count features
      if (cell.gate) gates++;
      if (cell.treasure) treasures++;
      if (cell.trap) traps++;
    }
  }

  return {
    totalCells: floor.width * floor.height,
    corridorCells,
    roomCells,
    deadEnds,
    junctions,
    gates,
    treasures,
    traps
  };
}

/**
 * Export maze to ASCII art
 */
export function mazeToAscii(floor: Floor): string {
  const lines: string[] = [];

  for (let y = 0; y < floor.height; y++) {
    let topLine = '';
    let midLine = '';

    for (let x = 0; x < floor.width; x++) {
      const cell = floor.cells[y][x];

      // Top wall
      topLine += '+';
      topLine += cell.walls.north ? '---' : '   ';

      // Side walls and content
      midLine += cell.walls.west ? '|' : ' ';
      
      // Cell content
      if (cell.isStart) midLine += ' S ';
      else if (cell.isEnd) midLine += ' E ';
      else if (cell.roomType === 'boss_room') midLine += ' B ';
      else if (cell.treasure) midLine += ' T ';
      else if (cell.gate) midLine += ' G ';
      else if (cell.isCheckpoint) midLine += ' C ';
      else midLine += '   ';
    }

    // Close right side
    const lastCell = floor.cells[y][floor.width - 1];
    topLine += '+';
    midLine += lastCell.walls.east ? '|' : ' ';

    lines.push(topLine);
    lines.push(midLine);
  }

  // Bottom border
  let bottomLine = '';
  for (let x = 0; x < floor.width; x++) {
    const cell = floor.cells[floor.height - 1][x];
    bottomLine += '+';
    bottomLine += cell.walls.south ? '---' : '   ';
  }
  bottomLine += '+';
  lines.push(bottomLine);

  return lines.join('\n');
}
