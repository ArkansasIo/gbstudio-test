/**
 * Procedural Dungeon Generation Types
 * Based on D&D 5e mechanics and biomes
 */

export type BiomeType = 
  | 'underdark' 
  | 'crypt' 
  | 'cave' 
  | 'ruins' 
  | 'fortress' 
  | 'temple' 
  | 'sewers' 
  | 'mine' 
  | 'laboratory' 
  | 'prison';

export type RoomType = 
  | 'entrance' 
  | 'corridor' 
  | 'chamber' 
  | 'treasure' 
  | 'boss' 
  | 'trap' 
  | 'puzzle' 
  | 'rest' 
  | 'merchant' 
  | 'shrine';

export type DifficultyTier = 1 | 2 | 3 | 4; // D&D 5e tiers

export type TerrainFeature = 
  | 'water' 
  | 'lava' 
  | 'pit' 
  | 'chasm' 
  | 'rubble' 
  | 'altar' 
  | 'statue' 
  | 'pillar' 
  | 'fungus' 
  | 'crystal';

export interface DungeonConfig {
  seed: number;
  biome: BiomeType;
  difficulty: DifficultyTier;
  minRooms: number;
  maxRooms: number;
  branchingFactor: number; // 0-1, how many branches
  treasureDensity: number; // 0-1
  trapDensity: number; // 0-1
  width: number;
  height: number;
}

export interface Room {
  id: string;
  type: RoomType;
  x: number;
  y: number;
  width: number;
  height: number;
  connections: string[]; // IDs of connected rooms
  features: TerrainFeature[];
  encounter?: Encounter;
  treasure?: Treasure;
  description: string;
}

export interface Encounter {
  id: string;
  challengeRating: number;
  enemies: Enemy[];
  difficulty: 'easy' | 'medium' | 'hard' | 'deadly';
  xpReward: number;
}

export interface Enemy {
  name: string;
  cr: number;
  hp: number;
  ac: number;
  type: string;
  count: number;
}

export interface Treasure {
  gold: number;
  items: TreasureItem[];
  rarity: 'common' | 'uncommon' | 'rare' | 'very rare' | 'legendary';
}

export interface TreasureItem {
  name: string;
  type: 'weapon' | 'armor' | 'potion' | 'scroll' | 'wondrous' | 'gem';
  rarity: string;
  value: number;
}

export interface Dungeon {
  id: string;
  config: DungeonConfig;
  rooms: Room[];
  grid: number[][]; // 0 = empty, room ID for occupied
  startRoomId: string;
  bossRoomId?: string;
}

export interface BiomeDefinition {
  name: string;
  description: string;
  enemyTypes: string[];
  features: TerrainFeature[];
  ambience: string;
  lightLevel: 'bright' | 'dim' | 'dark';
  hazards: string[];
}
