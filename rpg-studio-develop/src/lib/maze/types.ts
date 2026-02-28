/**
 * Maze Generation Types
 * Multi-floor dungeons, towers, trials, and raids
 */

export type MazeType = 'dungeon' | 'tower' | 'trial' | 'raid';
export type Direction = 'north' | 'south' | 'east' | 'west';
export type GateType = 'locked' | 'puzzle' | 'boss' | 'checkpoint' | 'portal' | 'secret';

export interface MazeConfig {
  seed: number;
  type: MazeType;
  startFloor: number;
  endFloor: number;
  width: number;
  height: number;
  difficulty: number; // 1-10
  algorithm: 'recursive_backtrack' | 'prims' | 'kruskal' | 'wilson';
}

export interface MazeCell {
  x: number;
  y: number;
  floor: number;
  
  // Walls (true = wall exists)
  walls: {
    north: boolean;
    south: boolean;
    east: boolean;
    west: boolean;
  };
  
  // Cell properties
  visited: boolean;
  isStart: boolean;
  isEnd: boolean;
  isCheckpoint: boolean;
  
  // Gates and obstacles
  gate?: Gate;
  trap?: Trap;
  treasure?: boolean;
  
  // Room type
  roomType?: RoomType;
}

export type RoomType = 
  | 'corridor'
  | 'chamber'
  | 'boss_room'
  | 'treasure_room'
  | 'safe_room'
  | 'puzzle_room'
  | 'trap_room'
  | 'arena'
  | 'shrine';

export interface Gate {
  type: GateType;
  direction: Direction;
  locked: boolean;
  keyRequired?: string;
  puzzleId?: string;
  bossId?: string;
  description: string;
}

export interface Trap {
  type: string;
  damage: number;
  difficulty: number; // DC for saving throw
  triggered: boolean;
  description: string;
}

export interface Floor {
  level: number;
  depth: number; // Negative for dungeons, positive for towers
  width: number;
  height: number;
  cells: MazeCell[][];
  
  // Floor properties
  difficulty: number;
  theme: string;
  bossRoom?: { x: number; y: number };
  checkpoints: { x: number; y: number }[];
  
  // Connections
  stairsDown?: { x: number; y: number };
  stairsUp?: { x: number; y: number };
  portals: Portal[];
}

export interface Portal {
  x: number;
  y: number;
  targetFloor: number;
  targetX: number;
  targetY: number;
  type: 'stairs' | 'teleport' | 'ladder' | 'elevator';
  locked: boolean;
}

export interface Maze {
  id: string;
  type: MazeType;
  config: MazeConfig;
  floors: Floor[];
  currentFloor: number;
  
  // Progression
  floorsCleared: Set<number>;
  gatesOpened: Set<string>;
  checkpointsReached: Set<string>;
  
  // Metadata
  totalRooms: number;
  totalGates: number;
  estimatedTime: number; // minutes
}

export interface DungeonRun {
  id: string;
  mazeId: string;
  startTime: number;
  endTime?: number;
  
  // Progress
  currentFloor: number;
  floorsCleared: number[];
  deaths: number;
  checkpointsUsed: number;
  
  // Stats
  monstersKilled: number;
  treasureFound: number;
  secretsFound: number;
  timeElapsed: number;
  
  // Completion
  completed: boolean;
  score: number;
  rank: 'F' | 'D' | 'C' | 'B' | 'A' | 'S' | 'SS';
}

export interface Trial {
  id: string;
  name: string;
  description: string;
  floors: number;
  difficulty: number;
  timeLimit?: number; // seconds
  
  // Restrictions
  noCheckpoints: boolean;
  noHealing: boolean;
  permadeath: boolean;
  
  // Rewards
  rewards: TrialReward[];
}

export interface TrialReward {
  type: 'item' | 'currency' | 'title' | 'unlock';
  id: string;
  name: string;
  rarity: string;
}

export interface Raid {
  id: string;
  name: string;
  description: string;
  floors: number;
  minPlayers: number;
  maxPlayers: number;
  difficulty: number;
  
  // Mechanics
  phases: RaidPhase[];
  enrageTimer?: number; // seconds
  
  // Rewards
  lootTable: string;
}

export interface RaidPhase {
  floor: number;
  name: string;
  description: string;
  bossId: string;
  mechanics: string[];
}
