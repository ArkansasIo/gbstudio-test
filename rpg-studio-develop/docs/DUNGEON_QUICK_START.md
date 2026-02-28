# Dungeon Generation Quick Start

## Installation

The dungeon generation system is already integrated into the RPG Workbench. No additional installation needed.

## Basic Usage

```typescript
import { DungeonGenerator, DungeonConfig } from '@/lib/dungeon';

// 1. Create configuration
const config: DungeonConfig = {
  seed: 12345,              // For reproducible dungeons
  biome: 'underdark',       // Choose from 10 biomes
  difficulty: 2,            // Tier 1-4 (D&D 5e)
  minRooms: 8,
  maxRooms: 15,
  branchingFactor: 0.3,     // 0-1, more = more branches
  treasureDensity: 0.2,     // 0-1, more = more treasure
  trapDensity: 0.15,        // 0-1, more = more traps
  width: 80,
  height: 60
};

// 2. Generate dungeon
const generator = new DungeonGenerator(config);
const dungeon = generator.generate();

// 3. Use the dungeon
console.log(`Generated ${dungeon.rooms.length} rooms`);
```

## Quick Examples

### Starter Cave (Level 1-4)
```typescript
import { generateStarterDungeon } from '@/lib/dungeon/examples';
const dungeon = generateStarterDungeon();
```

### Underdark Expedition (Level 5-10)
```typescript
import { generateUnderdarkExpedition } from '@/lib/dungeon/examples';
const dungeon = generateUnderdarkExpedition();
```

### Ancient Temple (Level 11-16)
```typescript
import { generateAncientTemple } from '@/lib/dungeon/examples';
const dungeon = generateAncientTemple();
```

### Random Dungeon
```typescript
import { generateRandomDungeon } from '@/lib/dungeon/examples';
const dungeon = generateRandomDungeon(2); // Tier 2
```

## Available Biomes

| Biome | Enemies | Best For |
|-------|---------|----------|
| `underdark` | Aberrations, Drow, Mind Flayers | High-level horror |
| `crypt` | Undead, Skeletons, Vampires | Classic undead adventure |
| `cave` | Beasts, Goblins, Trolls | Low-level exploration |
| `ruins` | Constructs, Elementals, Ghosts | Ancient mysteries |
| `fortress` | Humanoids, Orcs, Knights | Military combat |
| `temple` | Fiends, Cultists, Demons | Dark rituals |
| `sewers` | Oozes, Rats, Wererats | Urban underground |
| `mine` | Elementals, Rust Monsters | Resource exploration |
| `laboratory` | Constructs, Golems, Mages | Magical experiments |
| `prison` | Prisoners, Guards, Devils | Escape scenarios |

## Room Types

- **entrance**: Starting point (always present)
- **chamber**: Standard room with encounters
- **treasure**: Contains loot
- **boss**: Final challenge (always present)
- **trap**: Dangerous hazards
- **rest**: Safe recovery area

## Accessing Room Data

```typescript
// Find specific rooms
const startRoom = dungeon.rooms.find(r => r.id === dungeon.startRoomId);
const bossRoom = dungeon.rooms.find(r => r.id === dungeon.bossRoomId);
const treasureRooms = dungeon.rooms.filter(r => r.type === 'treasure');

// Room properties
room.id           // Unique identifier
room.type         // Room type
room.x, room.y    // Position
room.width, room.height  // Size
room.connections  // Connected room IDs
room.features     // Terrain features
room.encounter    // Combat encounter (if any)
room.treasure     // Loot (if any)
room.description  // Text description
```

## Encounters

```typescript
if (room.encounter) {
  console.log(`CR: ${room.encounter.challengeRating}`);
  console.log(`Difficulty: ${room.encounter.difficulty}`);
  console.log(`XP: ${room.encounter.xpReward}`);
  
  room.encounter.enemies.forEach(enemy => {
    console.log(`${enemy.count}x ${enemy.name} (CR ${enemy.cr})`);
    console.log(`  HP: ${enemy.hp}, AC: ${enemy.ac}`);
  });
}
```

## Treasure

```typescript
if (room.treasure) {
  console.log(`Gold: ${room.treasure.gold}gp`);
  console.log(`Rarity: ${room.treasure.rarity}`);
  
  room.treasure.items.forEach(item => {
    console.log(`${item.name} (${item.rarity})`);
    console.log(`  Type: ${item.type}, Value: ${item.value}gp`);
  });
}
```

## Visualization

```typescript
import { generateASCIIMap, printDungeonSummary } from '@/lib/dungeon/examples';

// Print summary
printDungeonSummary(dungeon);

// Generate ASCII map
const map = generateASCIIMap(dungeon);
console.log(map);
```

## Tips

1. **Use seeds for testing**: Same seed = same dungeon
2. **Start small**: Begin with 5-10 rooms for testing
3. **Match difficulty to party**: Tier 1 for levels 1-4, etc.
4. **Adjust densities**: More treasure/traps = more interesting
5. **Try different biomes**: Each has unique enemies and features

## Common Patterns

### Generate dungeon for current party level
```typescript
function generateForParty(partyLevel: number) {
  const tier = Math.ceil(partyLevel / 5) as 1 | 2 | 3 | 4;
  return generateRandomDungeon(tier);
}
```

### Save/Load dungeons
```typescript
// Save
const dungeonJSON = JSON.stringify(dungeon);
localStorage.setItem('currentDungeon', dungeonJSON);

// Load
const loaded = JSON.parse(localStorage.getItem('currentDungeon')!);
```

### Regenerate same dungeon
```typescript
const seed = 12345;
const config = { ...myConfig, seed };

// These will be identical
const dungeon1 = new DungeonGenerator(config).generate();
const dungeon2 = new DungeonGenerator(config).generate();
```

## Testing

Run the test suite:
```bash
npm test -- dungeon
```

Run the examples:
```bash
npm run repl
> require('./src/lib/dungeon/examples').demonstrateDungeonGeneration()
```

## Next Steps

- Read [DUNGEON_GENERATION.md](./DUNGEON_GENERATION.md) for detailed documentation
- Check [examples.ts](./src/lib/dungeon/examples.ts) for more examples
- Explore [biomes.ts](./src/lib/dungeon/biomes.ts) for biome details
- Review [encounters.ts](./src/lib/dungeon/encounters.ts) for CR balancing

## Support

For issues or questions, check the main documentation or create an issue in the repository.
