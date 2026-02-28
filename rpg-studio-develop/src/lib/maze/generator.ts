/**
 * Maze Generator
 * Multi-floor dungeons and towers with gates and progression
 */

import { SeededRNG } from '../world/rng';
import type { Maze, MazeConfig, Floor, MazeCell, Gate, Portal, RoomType } from './types';
import { initializeMaze, recursiveBacktrack, prims, kruskal, wilson } from './algorithms';

export class MazeGenerator {
  private rng: SeededRNG;
  private config: MazeConfig;

  constructor(config: MazeConfig) {
    this.config = config;
    this.rng = new SeededRNG(config.seed);
  }

  /**
   * Generate complete maze with all floors
   */
  generate(): Maze {
    const floors: Floor[] = [];
    const totalFloors = Math.abs(this.config.endFloor - this.config.startFloor) + 1;

    for (let i = 0; i < totalFloors; i++) {
      const floorNumber = this.config.startFloor + i;
      const depth = this.config.type === 'tower' ? floorNumber : -floorNumber;
      
      const floor = this.generateFloor(floorNumber, depth);
      floors.push(floor);
    }

    // Connect floors with stairs/portals
    this.connectFloors(floors);

    // Add gates and special rooms
    this.addGatesAndRooms(floors);

    return {
      id: `maze_${this.config.seed}`,
      type: this.config.type,
      config: this.config,
      floors,
      currentFloor: this.config.startFloor,
      floorsCleared: new Set(),
      gatesOpened: new Set(),
      checkpointsReached: new Set(),
      totalRooms: this.countRooms(floors),
      totalGates: this.countGates(floors),
      estimatedTime: this.estimateTime(floors)
    };
  }

  /**
   * Generate single floor
   */
  private generateFloor(level: number, depth: number): Floor {
    const cells = initializeMaze(this.config.width, this.config.height, level);

    // Apply maze algorithm
    switch (this.config.algorithm) {
      case 'recursive_backtrack':
        recursiveBacktrack(cells, this.rng);
        break;
      case 'prims':
        prims(cells, this.rng);
        break;
      case 'kruskal':
        kruskal(cells, this.rng);
        break;
      case 'wilson':
        wilson(cells, this.rng);
        break;
    }

    // Calculate difficulty (increases with depth)
    const baseDifficulty = this.config.difficulty;
    const depthMultiplier = Math.abs(depth) / 10;
    const difficulty = Math.min(10, baseDifficulty + depthMultiplier);

    // Determine theme based on depth
    const theme = this.getTheme(depth);

    return {
      level,
      depth,
      width: this.config.width,
      height: this.config.height,
      cells,
      difficulty,
      theme,
      checkpoints: [],
      portals: []
    };
  }

  /**
   * Connect floors with stairs and portals
   */
  private connectFloors(floors: Floor[]): void {
    for (let i = 0; i < floors.length; i++) {
      const floor = floors[i];
      
      // Add stairs down (except last floor)
      if (i < floors.length - 1) {
        const stairsDown = this.findDeadEnd(floor);
        floor.stairsDown = stairsDown;
        
        // Mark as portal
        floor.portals.push({
          x: stairsDown.x,
          y: stairsDown.y,
          targetFloor: floors[i + 1].level,
          targetX: 0,
          targetY: 0,
          type: this.config.type === 'tower' ? 'stairs' : 'stairs',
          locked: false
        });
      }
      
      // Add stairs up (except first floor)
      if (i > 0) {
        const stairsUp = this.findDeadEnd(floor);
        floor.stairsUp = stairsUp;
        
        floor.portals.push({
          x: stairsUp.x,
          y: stairsUp.y,
          targetFloor: floors[i - 1].level,
          targetX: floors[i - 1].stairsDown?.x || 0,
          targetY: floors[i - 1].stairsDown?.y || 0,
          type: 'stairs',
          locked: false
        });
      }
      
      // Add checkpoints every 5 floors
      if (floor.level % 5 === 0) {
        const checkpoint = this.findDeadEnd(floor);
        floor.checkpoints.push(checkpoint);
        floor.cells[checkpoint.y][checkpoint.x].isCheckpoint = true;
      }
      
      // Add boss room every 10 floors
      if (floor.level % 10 === 0) {
        const bossRoom = this.findLargestRoom(floor);
        floor.bossRoom = bossRoom;
        floor.cells[bossRoom.y][bossRoom.x].roomType = 'boss_room';
      }
    }
  }

  /**
   * Add gates and special rooms
   */
  private addGatesAndRooms(floors: Floor[]): void {
    for (const floor of floors) {
      const gateCount = Math.floor(floor.difficulty / 2);
      
      for (let i = 0; i < gateCount; i++) {
        const cell = this.findRandomCell(floor);
        const direction = this.findWallWithPath(floor, cell);
        
        if (direction) {
          const gate: Gate = {
            type: this.rng.pick(['locked', 'puzzle', 'boss'] as const),
            direction,
            locked: true,
            description: this.generateGateDescription(floor.level),
            keyRequired: `key_${floor.level}_${i}`
          };
          
          floor.cells[cell.y][cell.x].gate = gate;
        }
      }
      
      // Add special rooms
      this.addSpecialRooms(floor);
    }
  }

  /**
   * Add special rooms to floor
   */
  private addSpecialRooms(floor: Floor): void {
    const roomTypes: RoomType[] = ['treasure_room', 'safe_room', 'puzzle_room', 'trap_room', 'arena', 'shrine'];
    const roomCount = Math.floor(floor.difficulty);
    
    for (let i = 0; i < roomCount; i++) {
      const cell = this.findDeadEnd(floor);
      const roomType = this.rng.pick(roomTypes);
      
      floor.cells[cell.y][cell.x].roomType = roomType;
      
      if (roomType === 'treasure_room') {
        floor.cells[cell.y][cell.x].treasure = true;
      }
      
      if (roomType === 'trap_room') {
        floor.cells[cell.y][cell.x].trap = {
          type: this.rng.pick(['spike', 'poison', 'fire', 'lightning']),
          damage: Math.floor(floor.difficulty * 10),
          difficulty: Math.floor(floor.difficulty + 10),
          triggered: false,
          description: 'A deadly trap awaits'
        };
      }
    }
  }

  /**
   * Find dead end in maze
   */
  private findDeadEnd(floor: Floor): { x: number; y: number } {
    const deadEnds: { x: number; y: number }[] = [];
    
    for (let y = 0; y < floor.height; y++) {
      for (let x = 0; x < floor.width; x++) {
        const cell = floor.cells[y][x];
        const wallCount = Object.values(cell.walls).filter(w => w).length;
        
        if (wallCount === 3) {
          deadEnds.push({ x, y });
        }
      }
    }
    
    return deadEnds.length > 0 
      ? deadEnds[this.rng.int(0, deadEnds.length - 1)]
      : { x: 0, y: 0 };
  }

  /**
   * Find largest open area
   */
  private findLargestRoom(floor: Floor): { x: number; y: number } {
    let maxOpenness = 0;
    let bestCell = { x: 0, y: 0 };
    
    for (let y = 1; y < floor.height - 1; y++) {
      for (let x = 1; x < floor.width - 1; x++) {
        const cell = floor.cells[y][x];
        const openness = 4 - Object.values(cell.walls).filter(w => w).length;
        
        if (openness > maxOpenness) {
          maxOpenness = openness;
          bestCell = { x, y };
        }
      }
    }
    
    return bestCell;
  }

  /**
   * Find random cell
   */
  private findRandomCell(floor: Floor): MazeCell {
    const x = this.rng.int(0, floor.width - 1);
    const y = this.rng.int(0, floor.height - 1);
    return floor.cells[y][x];
  }

  /**
   * Find wall with path on other side
   */
  private findWallWithPath(floor: Floor, cell: MazeCell): 'north' | 'south' | 'east' | 'west' | null {
    const directions: ('north' | 'south' | 'east' | 'west')[] = ['north', 'south', 'east', 'west'];
    const validDirs = directions.filter(dir => !cell.walls[dir]);
    
    return validDirs.length > 0 ? this.rng.pick(validDirs) : null;
  }

  /**
   * Get theme based on depth
   */
  private getTheme(depth: number): string {
    const absDepth = Math.abs(depth);
    
    if (this.config.type === 'tower') {
      if (absDepth <= 20) return 'stone_tower';
      if (absDepth <= 40) return 'crystal_spire';
      if (absDepth <= 60) return 'cloud_citadel';
      if (absDepth <= 80) return 'celestial_heights';
      return 'divine_pinnacle';
    } else {
      if (absDepth <= 20) return 'upper_crypt';
      if (absDepth <= 40) return 'deep_caverns';
      if (absDepth <= 60) return 'underdark';
      if (absDepth <= 80) return 'abyssal_depths';
      return 'void_realm';
    }
  }

  /**
   * Generate gate description
   */
  private generateGateDescription(level: number): string {
    const descriptions = [
      `A locked gate blocks the path (Level ${level})`,
      `An ancient seal prevents passage (Level ${level})`,
      `A magical barrier shimmers before you (Level ${level})`,
      `Iron bars block the way forward (Level ${level})`
    ];
    
    return this.rng.pick(descriptions);
  }

  /**
   * Count total rooms
   */
  private countRooms(floors: Floor[]): number {
    return floors.reduce((sum, floor) => sum + floor.width * floor.height, 0);
  }

  /**
   * Count total gates
   */
  private countGates(floors: Floor[]): number {
    let count = 0;
    for (const floor of floors) {
      for (let y = 0; y < floor.height; y++) {
        for (let x = 0; x < floor.width; x++) {
          if (floor.cells[y][x].gate) count++;
        }
      }
    }
    return count;
  }

  /**
   * Estimate completion time
   */
  private estimateTime(floors: Floor[]): number {
    const roomsPerMinute = 10;
    const totalRooms = this.countRooms(floors);
    return Math.ceil(totalRooms / roomsPerMinute);
  }
}
