/**
 * Dungeon Generator Tests
 */

import { DungeonGenerator } from '../generator';
import { DungeonConfig } from '../types';
import { SeededRandom } from '../random';

describe('DungeonGenerator', () => {
  const baseConfig: DungeonConfig = {
    seed: 12345,
    biome: 'cave',
    difficulty: 2,
    minRooms: 5,
    maxRooms: 10,
    branchingFactor: 0.3,
    treasureDensity: 0.2,
    trapDensity: 0.15,
    width: 60,
    height: 50
  };

  test('generates a dungeon with correct number of rooms', () => {
    const generator = new DungeonGenerator(baseConfig);
    const dungeon = generator.generate();

    expect(dungeon.rooms.length).toBeGreaterThanOrEqual(baseConfig.minRooms);
    expect(dungeon.rooms.length).toBeLessThanOrEqual(baseConfig.maxRooms * 2);
  });

  test('generates reproducible dungeons with same seed', () => {
    const gen1 = new DungeonGenerator(baseConfig);
    const gen2 = new DungeonGenerator(baseConfig);

    const dungeon1 = gen1.generate();
    const dungeon2 = gen2.generate();

    expect(dungeon1.rooms.length).toBe(dungeon2.rooms.length);
    expect(dungeon1.rooms[0].x).toBe(dungeon2.rooms[0].x);
    expect(dungeon1.rooms[0].y).toBe(dungeon2.rooms[0].y);
  });

  test('generates different dungeons with different seeds', () => {
    const config1 = { ...baseConfig, seed: 111 };
    const config2 = { ...baseConfig, seed: 222 };

    const dungeon1 = new DungeonGenerator(config1).generate();
    const dungeon2 = new DungeonGenerator(config2).generate();

    expect(dungeon1.rooms[0].x).not.toBe(dungeon2.rooms[0].x);
  });

  test('creates entrance room', () => {
    const generator = new DungeonGenerator(baseConfig);
    const dungeon = generator.generate();

    const entrance = dungeon.rooms.find(r => r.type === 'entrance');
    expect(entrance).toBeDefined();
    expect(dungeon.startRoomId).toBe(entrance?.id);
  });

  test('creates boss room', () => {
    const generator = new DungeonGenerator(baseConfig);
    const dungeon = generator.generate();

    const boss = dungeon.rooms.find(r => r.type === 'boss');
    expect(boss).toBeDefined();
    expect(dungeon.bossRoomId).toBe(boss?.id);
  });

  test('creates treasure rooms based on density', () => {
    const generator = new DungeonGenerator(baseConfig);
    const dungeon = generator.generate();

    const treasureRooms = dungeon.rooms.filter(r => r.type === 'treasure');
    expect(treasureRooms.length).toBeGreaterThan(0);
  });

  test('rooms have valid dimensions', () => {
    const generator = new DungeonGenerator(baseConfig);
    const dungeon = generator.generate();

    dungeon.rooms.forEach(room => {
      expect(room.width).toBeGreaterThan(0);
      expect(room.height).toBeGreaterThan(0);
      expect(room.x).toBeGreaterThanOrEqual(0);
      expect(room.y).toBeGreaterThanOrEqual(0);
      expect(room.x + room.width).toBeLessThanOrEqual(baseConfig.width);
      expect(room.y + room.height).toBeLessThanOrEqual(baseConfig.height);
    });
  });

  test('rooms are connected', () => {
    const generator = new DungeonGenerator(baseConfig);
    const dungeon = generator.generate();

    // At least some rooms should have connections
    const connectedRooms = dungeon.rooms.filter(r => r.connections.length > 0);
    expect(connectedRooms.length).toBeGreaterThan(0);
  });

  test('generates encounters for non-entrance rooms', () => {
    const generator = new DungeonGenerator(baseConfig);
    const dungeon = generator.generate();

    const roomsWithEncounters = dungeon.rooms.filter(r => r.encounter);
    expect(roomsWithEncounters.length).toBeGreaterThan(0);

    // Entrance should not have encounter
    const entrance = dungeon.rooms.find(r => r.type === 'entrance');
    expect(entrance?.encounter).toBeUndefined();
  });

  test('boss room has encounter', () => {
    const generator = new DungeonGenerator(baseConfig);
    const dungeon = generator.generate();

    const boss = dungeon.rooms.find(r => r.type === 'boss');
    expect(boss?.encounter).toBeDefined();
  });

  test('treasure rooms have treasure', () => {
    const generator = new DungeonGenerator(baseConfig);
    const dungeon = generator.generate();

    const treasureRooms = dungeon.rooms.filter(r => r.type === 'treasure');
    treasureRooms.forEach(room => {
      expect(room.treasure).toBeDefined();
      expect(room.treasure?.gold).toBeGreaterThan(0);
    });
  });

  test('generates grid correctly', () => {
    const generator = new DungeonGenerator(baseConfig);
    const dungeon = generator.generate();

    expect(dungeon.grid.length).toBe(baseConfig.height);
    expect(dungeon.grid[0].length).toBe(baseConfig.width);
  });

  test('handles different biomes', () => {
    const biomes = ['underdark', 'crypt', 'cave', 'ruins', 'fortress'] as const;

    biomes.forEach(biome => {
      const config = { ...baseConfig, biome };
      const generator = new DungeonGenerator(config);
      const dungeon = generator.generate();

      expect(dungeon.config.biome).toBe(biome);
      expect(dungeon.rooms.length).toBeGreaterThan(0);
    });
  });

  test('handles different difficulty tiers', () => {
    const tiers = [1, 2, 3, 4] as const;

    tiers.forEach(tier => {
      const config = { ...baseConfig, difficulty: tier };
      const generator = new DungeonGenerator(config);
      const dungeon = generator.generate();

      expect(dungeon.config.difficulty).toBe(tier);
    });
  });
});

describe('SeededRandom', () => {
  test('generates reproducible random numbers', () => {
    const random1 = new SeededRandom(12345);
    const random2 = new SeededRandom(12345);

    expect(random1.next()).toBe(random2.next());
    expect(random1.next()).toBe(random2.next());
    expect(random1.next()).toBe(random2.next());
  });

  test('generates different numbers with different seeds', () => {
    const random1 = new SeededRandom(111);
    const random2 = new SeededRandom(222);

    expect(random1.next()).not.toBe(random2.next());
  });

  test('nextInt generates integers in range', () => {
    const random = new SeededRandom(12345);

    for (let i = 0; i < 100; i++) {
      const value = random.nextInt(0, 10);
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(10);
      expect(Number.isInteger(value)).toBe(true);
    }
  });

  test('choice selects from array', () => {
    const random = new SeededRandom(12345);
    const array = ['a', 'b', 'c', 'd'];

    for (let i = 0; i < 20; i++) {
      const choice = random.choice(array);
      expect(array).toContain(choice);
    }
  });

  test('shuffle randomizes array', () => {
    const random = new SeededRandom(12345);
    const array = [1, 2, 3, 4, 5];
    const shuffled = random.shuffle(array);

    expect(shuffled.length).toBe(array.length);
    expect(shuffled).toEqual(expect.arrayContaining(array));
  });
});
