/**
 * World Generation Types
 * D&D 5e-inspired overworld biome system
 */

export type BiomeId = string;

export type BiomeCategory =
  | 'Civilized'
  | 'Wilderness'
  | 'Ruins'
  | 'Underdark'
  | 'Planar'
  | 'Corrupted'
  | 'Elemental'
  | 'Celestial'
  | 'Infernal';

export type Climate =
  | 'Temperate'
  | 'Tropical'
  | 'Arctic'
  | 'Desert'
  | 'Volcanic'
  | 'Aquatic'
  | 'Planar';

export interface BiomeDef {
  id: BiomeId;
  name: string;
  category: BiomeCategory;
  climate: Climate;
  
  // Gameplay properties
  movementCost: number;  // 1.0 = road, 3.0 = mountain
  danger: number;        // 1-10
  
  // Environmental properties
  elevation: { min: number; max: number };
  moisture: { min: number; max: number };
  temperature: { min: number; max: number };
  magic: { min: number; max: number };
  corruption: { min: number; max: number };
  
  // Tags for encounter/quest logic
  tags: string[];
  
  // Asset references
  tilesetPath?: string;
  minimapColor: string;
  
  // Dungeon pairing
  dungeonBiome?: string;
}

export interface WorldCell {
  x: number;
  y: number;
  
  // Layer values (0-1)
  elevation: number;
  moisture: number;
  temperature: number;
  magic: number;
  corruption: number;
  civilization: number;
  
  // Resolved biome
  biome: BiomeId;
  biomeBlend?: Record<BiomeId, number>;
}

export interface WorldMap {
  width: number;
  height: number;
  seed: number;
  cells: WorldCell[];
}

export interface ChunkKey {
  cx: number;
  cy: number;
}

export interface WorldChunk {
  key: ChunkKey;
  size: number;
  originX: number;
  originY: number;
  cells: WorldCell[];
}

export interface WorldGenParams {
  width: number;
  height: number;
  seed: number;
  
  // Noise scales
  elevationCell: number;
  moistureCell: number;
  temperatureCell: number;
  magicCell: number;
  corruptionCell: number;
  civilizationCell: number;
  
  // fBm config
  octaves: number;
  lacunarity: number;
  gain: number;
  
  // Chunking
  chunkSize: number;
}

export interface BlendParams {
  radius: number;
  neighborWeight: number;
  keepBaseBias: number;
}
