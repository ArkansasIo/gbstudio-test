/**
 * Raid System
 * Multi-player dungeon challenges with phases and mechanics
 */

import { SeededRNG } from '../world/rng';
import type { Raid, RaidPhase, MazeConfig } from './types';
import { MazeGenerator } from './generator';

/**
 * Predefined raids
 */
export const RAIDS: Record<string, Raid> = {
  crypt_of_the_forgotten: {
    id: 'crypt_of_the_forgotten',
    name: 'Crypt of the Forgotten',
    description: 'Descend into an ancient crypt and face the Lich King',
    floors: 10,
    minPlayers: 4,
    maxPlayers: 8,
    difficulty: 6,
    enrageTimer: 1800, // 30 minutes
    lootTable: 'raid_tier_1',
    phases: [
      {
        floor: 3,
        name: 'The Gatekeepers',
        description: 'Defeat the twin guardians',
        bossId: 'twin_guardians',
        mechanics: ['split_damage', 'synchronized_attacks', 'shield_phase']
      },
      {
        floor: 7,
        name: 'The Necropolis',
        description: 'Navigate the maze of undead',
        bossId: 'necromancer_council',
        mechanics: ['add_spawns', 'death_zones', 'resurrection']
      },
      {
        floor: 10,
        name: 'The Lich King',
        description: 'Face the master of the crypt',
        bossId: 'lich_king',
        mechanics: ['phase_transitions', 'soul_drain', 'phylactery_destruction', 'enrage']
      }
    ]
  },

  tower_of_elements: {
    id: 'tower_of_elements',
    name: 'Tower of Elements',
    description: 'Ascend the elemental tower and defeat the Archmage',
    floors: 15,
    minPlayers: 5,
    maxPlayers: 10,
    difficulty: 7,
    enrageTimer: 2400, // 40 minutes
    lootTable: 'raid_tier_2',
    phases: [
      {
        floor: 5,
        name: 'Fire Guardian',
        description: 'Master of flames',
        bossId: 'fire_elemental_lord',
        mechanics: ['fire_pools', 'meteor_strike', 'immolation']
      },
      {
        floor: 10,
        name: 'Ice Guardian',
        description: 'Frozen sentinel',
        bossId: 'ice_elemental_lord',
        mechanics: ['freeze_mechanics', 'ice_walls', 'blizzard']
      },
      {
        floor: 15,
        name: 'The Archmage',
        description: 'Master of all elements',
        bossId: 'archmage_supreme',
        mechanics: ['elemental_rotation', 'spell_reflect', 'time_stop', 'ultimate_power']
      }
    ]
  },

  depths_of_madness: {
    id: 'depths_of_madness',
    name: 'Depths of Madness',
    description: 'Descend into the realm of the Old Gods',
    floors: 20,
    minPlayers: 6,
    maxPlayers: 12,
    difficulty: 9,
    enrageTimer: 3600, // 60 minutes
    lootTable: 'raid_tier_3',
    phases: [
      {
        floor: 5,
        name: 'The Whisperer',
        description: 'Herald of madness',
        bossId: 'mind_flayer_elder',
        mechanics: ['mind_control', 'sanity_drain', 'illusions']
      },
      {
        floor: 10,
        name: 'The Devourer',
        description: 'Hunger incarnate',
        bossId: 'abyssal_horror',
        mechanics: ['consume_player', 'tentacle_slam', 'void_zones']
      },
      {
        floor: 15,
        name: 'The Corruptor',
        description: 'Spreader of plague',
        bossId: 'plague_titan',
        mechanics: ['disease_spread', 'mutation', 'corpse_explosion']
      },
      {
        floor: 20,
        name: 'The Old God',
        description: 'Ancient evil awakened',
        bossId: 'old_god_avatar',
        mechanics: ['reality_warp', 'madness_aura', 'phase_shift', 'world_ending']
      }
    ]
  },

  celestial_citadel: {
    id: 'celestial_citadel',
    name: 'Celestial Citadel',
    description: 'Storm the heavens and challenge the gods',
    floors: 25,
    minPlayers: 8,
    maxPlayers: 16,
    difficulty: 10,
    enrageTimer: 4800, // 80 minutes
    lootTable: 'raid_tier_4',
    phases: [
      {
        floor: 8,
        name: 'The Valkyries',
        description: 'Divine warriors',
        bossId: 'valkyrie_trio',
        mechanics: ['flying_combat', 'divine_judgment', 'resurrection_chain']
      },
      {
        floor: 16,
        name: 'The Archangel',
        description: 'Commander of the heavenly host',
        bossId: 'archangel_michael',
        mechanics: ['holy_fire', 'wings_of_light', 'divine_intervention']
      },
      {
        floor: 25,
        name: 'The Pantheon',
        description: 'Face the gods themselves',
        bossId: 'pantheon_council',
        mechanics: ['god_rotation', 'divine_powers', 'apocalypse', 'final_judgment']
      }
    ]
  }
};

/**
 * Generate raid maze
 */
export function generateRaid(raid: Raid, seed: number): ReturnType<MazeGenerator['generate']> {
  const config: MazeConfig = {
    seed,
    type: 'raid',
    startFloor: 1,
    endFloor: raid.floors,
    width: 30 + Math.floor(raid.difficulty * 3),
    height: 30 + Math.floor(raid.difficulty * 3),
    difficulty: raid.difficulty,
    algorithm: 'prims' // Prims creates more open layouts for raids
  };

  const generator = new MazeGenerator(config);
  const maze = generator.generate();

  // Add raid-specific modifications
  addRaidMechanics(maze, raid);

  return maze;
}

/**
 * Add raid-specific mechanics to maze
 */
function addRaidMechanics(maze: ReturnType<MazeGenerator['generate']>, raid: Raid): void {
  // Add boss rooms at phase floors
  for (const phase of raid.phases) {
    const floor = maze.floors.find(f => f.level === phase.floor);
    if (floor && floor.bossRoom) {
      // Expand boss room for raid encounters
      const { x, y } = floor.bossRoom;
      
      // Mark surrounding cells as boss arena
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx;
          const ny = y + dy;
          
          if (nx >= 0 && nx < floor.width && ny >= 0 && ny < floor.height) {
            floor.cells[ny][nx].roomType = 'arena';
            // Remove walls to create open arena
            floor.cells[ny][nx].walls = {
              north: ny === y - 1,
              south: ny === y + 1,
              east: nx === x + 1,
              west: nx === x - 1
            };
          }
        }
      }
    }
  }
}

/**
 * Get raid phase for floor
 */
export function getRaidPhase(raid: Raid, floor: number): RaidPhase | null {
  return raid.phases.find(p => p.floor === floor) || null;
}

/**
 * Check if raid is unlocked
 */
export function isRaidUnlocked(raidId: string, completedRaids: string[], playerLevel: number): boolean {
  const unlockRequirements: Record<string, { raids: string[]; level: number }> = {
    crypt_of_the_forgotten: { raids: [], level: 20 },
    tower_of_elements: { raids: ['crypt_of_the_forgotten'], level: 30 },
    depths_of_madness: { raids: ['tower_of_elements'], level: 40 },
    celestial_citadel: { raids: ['depths_of_madness'], level: 50 }
  };

  const requirements = unlockRequirements[raidId];
  if (!requirements) return false;

  const hasLevel = playerLevel >= requirements.level;
  const hasRaids = requirements.raids.every(r => completedRaids.includes(r));

  return hasLevel && hasRaids;
}

/**
 * Calculate raid difficulty scaling
 */
export function calculateRaidScaling(raid: Raid, playerCount: number): {
  healthMultiplier: number;
  damageMultiplier: number;
  mechanicIntensity: number;
} {
  const basePlayerCount = (raid.minPlayers + raid.maxPlayers) / 2;
  const scalingFactor = playerCount / basePlayerCount;

  return {
    healthMultiplier: 1 + (scalingFactor - 1) * 0.5, // 50% health per extra player
    damageMultiplier: 1 + (scalingFactor - 1) * 0.3, // 30% damage per extra player
    mechanicIntensity: Math.min(2, scalingFactor) // Cap at 2x mechanic frequency
  };
}

/**
 * Generate raid loot
 */
export function generateRaidLoot(
  raid: Raid,
  phase: RaidPhase,
  playerCount: number,
  rng: SeededRNG
): Array<{ item: string; rarity: string; quantity: number }> {
  const loot: Array<{ item: string; rarity: string; quantity: number }> = [];

  // Boss-specific loot
  const bossLoot = [
    { item: `${phase.bossId}_weapon`, rarity: 'legendary', quantity: 1 },
    { item: `${phase.bossId}_armor`, rarity: 'epic', quantity: 1 },
    { item: `${phase.bossId}_trinket`, rarity: 'rare', quantity: 1 }
  ];

  // Distribute loot based on player count
  const lootCount = Math.min(playerCount, bossLoot.length);
  for (let i = 0; i < lootCount; i++) {
    loot.push(bossLoot[rng.int(0, bossLoot.length - 1)]);
  }

  // Currency rewards
  const goldAmount = raid.difficulty * 1000 * playerCount;
  loot.push({ item: 'gold', rarity: 'common', quantity: goldAmount });

  // Raid tokens
  const tokenAmount = raid.difficulty * 10;
  loot.push({ item: 'raid_tokens', rarity: 'epic', quantity: tokenAmount });

  return loot;
}
