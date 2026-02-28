/**
 * Dungeon Generation Examples
 */

import { DungeonGenerator, DungeonConfig, Dungeon } from './index';

/**
 * Generate a small starter dungeon (Tier 1)
 */
export function generateStarterDungeon(seed: number = Date.now()): Dungeon {
  const config: DungeonConfig = {
    seed,
    biome: 'cave',
    difficulty: 1,
    minRooms: 5,
    maxRooms: 8,
    branchingFactor: 0.2,
    treasureDensity: 0.15,
    trapDensity: 0.1,
    width: 50,
    height: 40
  };

  return new DungeonGenerator(config).generate();
}

/**
 * Generate a medium underdark expedition (Tier 2)
 */
export function generateUnderdarkExpedition(seed: number = Date.now()): Dungeon {
  const config: DungeonConfig = {
    seed,
    biome: 'underdark',
    difficulty: 2,
    minRooms: 10,
    maxRooms: 15,
    branchingFactor: 0.3,
    treasureDensity: 0.2,
    trapDensity: 0.15,
    width: 80,
    height: 60
  };

  return new DungeonGenerator(config).generate();
}

/**
 * Generate a large ancient temple (Tier 3)
 */
export function generateAncientTemple(seed: number = Date.now()): Dungeon {
  const config: DungeonConfig = {
    seed,
    biome: 'temple',
    difficulty: 3,
    minRooms: 15,
    maxRooms: 25,
    branchingFactor: 0.4,
    treasureDensity: 0.25,
    trapDensity: 0.2,
    width: 100,
    height: 80
  };

  return new DungeonGenerator(config).generate();
}

/**
 * Generate an epic lich's fortress (Tier 4)
 */
export function generateLichFortress(seed: number = Date.now()): Dungeon {
  const config: DungeonConfig = {
    seed,
    biome: 'fortress',
    difficulty: 4,
    minRooms: 20,
    maxRooms: 30,
    branchingFactor: 0.5,
    treasureDensity: 0.3,
    trapDensity: 0.25,
    width: 120,
    height: 100
  };

  return new DungeonGenerator(config).generate();
}

/**
 * Generate a random dungeon with random biome
 */
export function generateRandomDungeon(
  tier: 1 | 2 | 3 | 4 = 2,
  seed: number = Date.now()
): Dungeon {
  const biomes = ['underdark', 'crypt', 'cave', 'ruins', 'fortress', 'temple', 'sewers', 'mine', 'laboratory', 'prison'] as const;
  const biome = biomes[Math.floor(Math.random() * biomes.length)];

  const config: DungeonConfig = {
    seed,
    biome,
    difficulty: tier,
    minRooms: 5 + tier * 3,
    maxRooms: 10 + tier * 5,
    branchingFactor: 0.2 + tier * 0.1,
    treasureDensity: 0.15 + tier * 0.05,
    trapDensity: 0.1 + tier * 0.05,
    width: 50 + tier * 15,
    height: 40 + tier * 15
  };

  return new DungeonGenerator(config).generate();
}

/**
 * Print dungeon summary to console
 */
export function printDungeonSummary(dungeon: Dungeon): void {
  console.log('=== DUNGEON SUMMARY ===');
  console.log(`ID: ${dungeon.id}`);
  console.log(`Biome: ${dungeon.config.biome}`);
  console.log(`Difficulty Tier: ${dungeon.config.difficulty}`);
  console.log(`Rooms: ${dungeon.rooms.length}`);
  console.log(`Size: ${dungeon.config.width}x${dungeon.config.height}`);
  console.log(`Start Room: ${dungeon.startRoomId}`);
  console.log(`Boss Room: ${dungeon.bossRoomId || 'None'}`);
  console.log('');

  console.log('=== ROOM BREAKDOWN ===');
  const roomTypes = dungeon.rooms.reduce((acc, room) => {
    acc[room.type] = (acc[room.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  Object.entries(roomTypes).forEach(([type, count]) => {
    console.log(`${type}: ${count}`);
  });
  console.log('');

  console.log('=== ENCOUNTERS ===');
  const encounters = dungeon.rooms.filter(r => r.encounter);
  console.log(`Total Encounters: ${encounters.length}`);
  
  const totalXP = encounters.reduce((sum, r) => sum + (r.encounter?.xpReward || 0), 0);
  console.log(`Total XP: ${totalXP}`);
  console.log('');

  console.log('=== TREASURE ===');
  const treasureRooms = dungeon.rooms.filter(r => r.treasure);
  console.log(`Treasure Rooms: ${treasureRooms.length}`);
  
  const totalGold = treasureRooms.reduce((sum, r) => sum + (r.treasure?.gold || 0), 0);
  const totalItems = treasureRooms.reduce((sum, r) => sum + (r.treasure?.items.length || 0), 0);
  console.log(`Total Gold: ${totalGold}gp`);
  console.log(`Total Items: ${totalItems}`);
  console.log('');
}

/**
 * Generate ASCII map of dungeon
 */
export function generateASCIIMap(dungeon: Dungeon): string {
  const lines: string[] = [];
  
  // Header
  lines.push(`Dungeon Map - ${dungeon.config.biome} (Tier ${dungeon.config.difficulty})`);
  lines.push('='.repeat(dungeon.config.width));
  
  // Grid
  for (let y = 0; y < dungeon.config.height; y++) {
    let line = '';
    for (let x = 0; x < dungeon.config.width; x++) {
      const cell = dungeon.grid[y][x];
      
      if (cell === 0) {
        line += ' '; // Empty space
      } else if (cell === -1) {
        line += '░'; // Corridor
      } else {
        // Find room at this position
        const room = dungeon.rooms.find(r => 
          x >= r.x && x < r.x + r.width &&
          y >= r.y && y < r.y + r.height
        );
        
        if (room) {
          if (room.id === dungeon.startRoomId) line += 'S';
          else if (room.id === dungeon.bossRoomId) line += 'B';
          else if (room.type === 'treasure') line += 'T';
          else if (room.type === 'trap') line += 'X';
          else if (room.type === 'rest') line += 'R';
          else line += '█';
        } else {
          line += '█';
        }
      }
    }
    lines.push(line);
  }
  
  // Legend
  lines.push('='.repeat(dungeon.config.width));
  lines.push('Legend: S=Start, B=Boss, T=Treasure, X=Trap, R=Rest, █=Room, ░=Corridor');
  
  return lines.join('\n');
}

/**
 * Example: Generate and display multiple dungeons
 */
export function demonstrateDungeonGeneration(): void {
  console.log('DUNGEON GENERATION DEMONSTRATION\n');
  
  // Starter dungeon
  console.log('1. STARTER DUNGEON (Tier 1 Cave)');
  const starter = generateStarterDungeon(12345);
  printDungeonSummary(starter);
  console.log(generateASCIIMap(starter));
  console.log('\n\n');
  
  // Underdark expedition
  console.log('2. UNDERDARK EXPEDITION (Tier 2)');
  const underdark = generateUnderdarkExpedition(54321);
  printDungeonSummary(underdark);
  console.log('\n\n');
  
  // Ancient temple
  console.log('3. ANCIENT TEMPLE (Tier 3)');
  const temple = generateAncientTemple(99999);
  printDungeonSummary(temple);
  console.log('\n\n');
  
  // Random dungeon
  console.log('4. RANDOM DUNGEON');
  const random = generateRandomDungeon(2);
  printDungeonSummary(random);
  console.log(generateASCIIMap(random));
}

// Run demonstration if executed directly
if (require.main === module) {
  demonstrateDungeonGeneration();
}
