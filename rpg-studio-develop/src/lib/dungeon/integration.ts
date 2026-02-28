/**
 * Integration with RPG Workbench
 * Shows how to use dungeon generation in the application
 */

import { DungeonGenerator, DungeonConfig, Dungeon, Room } from './index';

/**
 * Generate dungeon and log to terminal
 * Note: For terminal logging, use TerminalLogger with Redux dispatch in your application
 */
export function generateDungeonWithLogging(config: DungeonConfig): Dungeon {
  console.log(`Generating ${config.biome} dungeon (Tier ${config.difficulty})...`);
  
  const startTime = performance.now();
  const generator = new DungeonGenerator(config);
  const dungeon = generator.generate();
  const endTime = performance.now();
  
  console.log(`Dungeon generated in ${(endTime - startTime).toFixed(2)}ms`);
  console.log(`Rooms: ${dungeon.rooms.length}, Biome: ${config.biome}, Seed: ${config.seed}`);
  
  // Log room breakdown
  const roomTypes = dungeon.rooms.reduce((acc, room) => {
    acc[room.type] = (acc[room.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  console.log('Room breakdown:', roomTypes);
  
  // Log encounters
  const encounters = dungeon.rooms.filter(r => r.encounter);
  const totalXP = encounters.reduce((sum, r) => sum + (r.encounter?.xpReward || 0), 0);
  console.log(`Generated ${encounters.length} encounters (${totalXP} XP total)`);
  
  // Log treasure
  const treasureRooms = dungeon.rooms.filter(r => r.treasure);
  const totalGold = treasureRooms.reduce((sum, r) => sum + (r.treasure?.gold || 0), 0);
  console.log(`Generated ${treasureRooms.length} treasure rooms (${totalGold}gp total)`);
  
  return dungeon;
}

/**
 * Validate dungeon configuration
 */
export function validateDungeonConfig(config: Partial<DungeonConfig>): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (!config.seed) errors.push('Seed is required');
  if (!config.biome) errors.push('Biome is required');
  if (!config.difficulty || config.difficulty < 1 || config.difficulty > 4) {
    errors.push('Difficulty must be 1-4');
  }
  if (!config.minRooms || config.minRooms < 3) {
    errors.push('Minimum rooms must be at least 3');
  }
  if (!config.maxRooms || config.maxRooms < config.minRooms!) {
    errors.push('Maximum rooms must be greater than minimum');
  }
  if (config.branchingFactor !== undefined && (config.branchingFactor < 0 || config.branchingFactor > 1)) {
    errors.push('Branching factor must be 0-1');
  }
  if (config.treasureDensity !== undefined && (config.treasureDensity < 0 || config.treasureDensity > 1)) {
    errors.push('Treasure density must be 0-1');
  }
  if (config.trapDensity !== undefined && (config.trapDensity < 0 || config.trapDensity > 1)) {
    errors.push('Trap density must be 0-1');
  }
  if (!config.width || config.width < 20) {
    errors.push('Width must be at least 20');
  }
  if (!config.height || config.height < 20) {
    errors.push('Height must be at least 20');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Get recommended config for party level
 */
export function getRecommendedConfig(partyLevel: number, partySize: number = 4): DungeonConfig {
  const tier = Math.min(4, Math.max(1, Math.ceil(partyLevel / 5))) as 1 | 2 | 3 | 4;
  
  // Adjust room count based on party size
  const roomMultiplier = partySize / 4;
  
  return {
    seed: Date.now(),
    biome: 'cave', // Default, can be changed
    difficulty: tier,
    minRooms: Math.floor(5 + tier * 3 * roomMultiplier),
    maxRooms: Math.floor(10 + tier * 5 * roomMultiplier),
    branchingFactor: 0.2 + tier * 0.1,
    treasureDensity: 0.15 + tier * 0.05,
    trapDensity: 0.1 + tier * 0.05,
    width: 50 + tier * 15,
    height: 40 + tier * 15
  };
}

/**
 * Export dungeon to JSON
 */
export function exportDungeon(dungeon: Dungeon): string {
  return JSON.stringify(dungeon, null, 2);
}

/**
 * Import dungeon from JSON
 */
export function importDungeon(json: string): Dungeon | null {
  try {
    const dungeon = JSON.parse(json);
    
    // Validate structure
    if (!dungeon.id || !dungeon.config || !dungeon.rooms || !dungeon.grid) {
      console.error('Invalid dungeon format');
      return null;
    }
    
    console.log(`Imported dungeon: ${dungeon.id}`);
    return dungeon;
  } catch (error) {
    console.error('Failed to import dungeon', error);
    return null;
  }
}

/**
 * Get room by coordinates
 */
export function getRoomAtPosition(dungeon: Dungeon, x: number, y: number): Room | null {
  return dungeon.rooms.find(room => 
    x >= room.x && x < room.x + room.width &&
    y >= room.y && y < room.y + room.height
  ) || null;
}

/**
 * Get adjacent rooms
 */
export function getAdjacentRooms(dungeon: Dungeon, roomId: string): Room[] {
  const room = dungeon.rooms.find(r => r.id === roomId);
  if (!room) return [];
  
  return room.connections
    .map(connId => dungeon.rooms.find(r => r.id === connId))
    .filter((r): r is Room => r !== undefined);
}

/**
 * Calculate dungeon statistics
 */
export function getDungeonStats(dungeon: Dungeon) {
  const encounters = dungeon.rooms.filter(r => r.encounter);
  const treasureRooms = dungeon.rooms.filter(r => r.treasure);
  
  const totalXP = encounters.reduce((sum, r) => sum + (r.encounter?.xpReward || 0), 0);
  const totalGold = treasureRooms.reduce((sum, r) => sum + (r.treasure?.gold || 0), 0);
  const totalItems = treasureRooms.reduce((sum, r) => sum + (r.treasure?.items.length || 0), 0);
  
  const avgCR = encounters.length > 0
    ? encounters.reduce((sum, r) => sum + (r.encounter?.challengeRating || 0), 0) / encounters.length
    : 0;
  
  return {
    totalRooms: dungeon.rooms.length,
    encounters: encounters.length,
    treasureRooms: treasureRooms.length,
    totalXP,
    totalGold,
    totalItems,
    averageCR: avgCR.toFixed(1),
    roomTypes: dungeon.rooms.reduce((acc, room) => {
      acc[room.type] = (acc[room.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  };
}

/**
 * Example: Generate dungeon for Redux store
 */
export function generateDungeonForStore(config: DungeonConfig) {
  const validation = validateDungeonConfig(config);
  
  if (!validation.valid) {
    validation.errors.forEach(error => console.error(error));
    throw new Error('Invalid dungeon configuration');
  }
  
  const dungeon = generateDungeonWithLogging(config);
  const stats = getDungeonStats(dungeon);
  
  console.log('Dungeon statistics:', stats);
  
  return {
    dungeon,
    stats,
    timestamp: Date.now()
  };
}
