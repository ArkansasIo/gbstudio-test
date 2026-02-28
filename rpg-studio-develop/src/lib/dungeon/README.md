# Procedural Dungeon Generation System

A complete D&D 5e-inspired procedural dungeon generator for the RPG Workbench.

## 📁 File Structure

```
src/lib/dungeon/
├── types.ts              # TypeScript interfaces and types
├── biomes.ts             # 10 biome definitions
├── generator.ts          # BSP dungeon generation algorithm
├── random.ts             # Seeded random number generator
├── encounters.ts         # D&D 5e encounter balancing
├── treasure.ts           # Loot generation system
├── integration.ts        # RPG Workbench integration utilities
├── examples.ts           # Pre-built templates and demos
├── index.ts              # Main exports
├── __tests__/
│   └── generator.test.ts # Test suite (19 tests)
└── README.md             # This file
```

## 🚀 Quick Start

```typescript
import { DungeonGenerator, DungeonConfig } from '@/lib/dungeon';

const config: DungeonConfig = {
  seed: 12345,
  biome: 'underdark',
  difficulty: 2,
  minRooms: 8,
  maxRooms: 15,
  branchingFactor: 0.3,
  treasureDensity: 0.2,
  trapDensity: 0.15,
  width: 80,
  height: 60
};

const dungeon = new DungeonGenerator(config).generate();
```

## 📚 Documentation

- **[DUNGEON_GENERATION.md](../../../DUNGEON_GENERATION.md)** - Complete system documentation
- **[DUNGEON_QUICK_START.md](../../../DUNGEON_QUICK_START.md)** - Quick reference guide
- **[DUNGEON_EXAMPLE_OUTPUT.md](../../../DUNGEON_EXAMPLE_OUTPUT.md)** - Example outputs
- **[DUNGEON_SYSTEM_SUMMARY.md](../../../DUNGEON_SYSTEM_SUMMARY.md)** - Implementation summary

## 🎮 Features

### 10 Biomes
- Underdark, Crypt, Cave, Ruins, Fortress
- Temple, Sewers, Mine, Laboratory, Prison

### Room Types
- Entrance, Chamber, Treasure, Boss, Trap, Rest

### D&D 5e Mechanics
- 4 Difficulty Tiers (Levels 1-20)
- Challenge Rating system
- XP budgets from DMG
- Magic item rarity tables

### Technical
- BSP algorithm for organic layouts
- Seeded generation (reproducible)
- TypeScript with full type safety
- 19 passing tests

## 🧪 Testing

```bash
npm test -- --testPathPattern=dungeon
```

All 19 tests pass:
- Room generation
- Reproducible seeds
- Special rooms
- Encounters
- Treasure
- Grid validation
- Multiple biomes
- All difficulty tiers

## 📖 API Reference

### DungeonGenerator

```typescript
class DungeonGenerator {
  constructor(config: DungeonConfig)
  generate(): Dungeon
}
```

### Pre-built Templates

```typescript
import {
  generateStarterDungeon,      // Tier 1 cave
  generateUnderdarkExpedition,  // Tier 2 underdark
  generateAncientTemple,        // Tier 3 temple
  generateLichFortress,         // Tier 4 fortress
  generateRandomDungeon         // Random biome
} from '@/lib/dungeon/examples';
```

### Integration Utilities

```typescript
import {
  generateDungeonWithLogging,  // Generate with terminal logs
  validateDungeonConfig,        // Validate configuration
  getRecommendedConfig,         // Get config for party level
  exportDungeon,                // Export to JSON
  importDungeon,                // Import from JSON
  getRoomAtPosition,            // Get room by coordinates
  getAdjacentRooms,             // Get connected rooms
  getDungeonStats               // Calculate statistics
} from '@/lib/dungeon/integration';
```

## 💡 Usage Examples

### Generate for Party Level

```typescript
import { getRecommendedConfig, DungeonGenerator } from '@/lib/dungeon';

const config = getRecommendedConfig(7, 4); // Level 7, 4 players
const dungeon = new DungeonGenerator(config).generate();
```

### With Terminal Logging

```typescript
import { generateDungeonWithLogging } from '@/lib/dungeon/integration';

const dungeon = generateDungeonWithLogging(config);
// Logs: "Generating underdark dungeon (Tier 2)..."
// Logs: "Dungeon generated in 23.45ms"
// Logs: "Generated 12 encounters (8450 XP total)"
```

### Export/Import

```typescript
import { exportDungeon, importDungeon } from '@/lib/dungeon/integration';

// Save
const json = exportDungeon(dungeon);
localStorage.setItem('dungeon', json);

// Load
const loaded = importDungeon(localStorage.getItem('dungeon')!);
```

### Get Statistics

```typescript
import { getDungeonStats } from '@/lib/dungeon/integration';

const stats = getDungeonStats(dungeon);
console.log(stats);
// {
//   totalRooms: 12,
//   encounters: 9,
//   treasureRooms: 2,
//   totalXP: 8450,
//   totalGold: 2150,
//   totalItems: 8,
//   averageCR: "4.2",
//   roomTypes: { entrance: 1, chamber: 7, treasure: 2, boss: 1, rest: 1 }
// }
```

### Navigate Dungeon

```typescript
import { getAdjacentRooms, getRoomAtPosition } from '@/lib/dungeon/integration';

// Get room at position
const room = getRoomAtPosition(dungeon, 25, 30);

// Get connected rooms
const adjacent = getAdjacentRooms(dungeon, room.id);
```

## 🎯 Configuration Options

| Parameter | Type | Range | Description |
|-----------|------|-------|-------------|
| seed | number | any | Seed for reproducibility |
| biome | BiomeType | 10 options | Dungeon theme |
| difficulty | number | 1-4 | D&D 5e tier |
| minRooms | number | 3+ | Minimum rooms |
| maxRooms | number | >minRooms | Maximum rooms |
| branchingFactor | number | 0-1 | Path complexity |
| treasureDensity | number | 0-1 | Treasure frequency |
| trapDensity | number | 0-1 | Trap frequency |
| width | number | 20+ | Grid width |
| height | number | 20+ | Grid height |

## 🔧 Integration

### With Redux Store

```typescript
import { store } from '@/store';
import { generateDungeonForStore } from '@/lib/dungeon/integration';

const result = generateDungeonForStore(config);

store.dispatch({
  type: 'rpg/setCurrentDungeon',
  payload: result.dungeon
});
```

### With Terminal System

```typescript
import { terminalLogger } from '@/lib/terminal/terminalLogger';
import { DungeonGenerator } from '@/lib/dungeon';

try {
  const dungeon = new DungeonGenerator(config).generate();
  terminalLogger.success('Dungeon generated successfully');
} catch (error) {
  terminalLogger.error('Failed to generate dungeon', { error });
}
```

## 📊 Performance

| Rooms | Size | Time | Memory |
|-------|------|------|--------|
| 5-8 | 50x40 | ~10ms | ~1MB |
| 10-15 | 80x60 | ~25ms | ~2.5MB |
| 15-25 | 100x80 | ~50ms | ~4MB |
| 20-30 | 120x100 | ~75ms | ~6MB |

## 🐛 Troubleshooting

### "Invalid dungeon configuration"
- Check that all required fields are present
- Ensure difficulty is 1-4
- Verify minRooms < maxRooms
- Check that densities are 0-1

### "No rooms generated"
- Increase maxRooms
- Increase grid size (width/height)
- Reduce minRooms

### "Encounters too difficult"
- Lower difficulty tier
- Reduce treasureDensity (affects encounter frequency)

## 🔮 Future Enhancements

- [ ] Cellular automata for caves
- [ ] Prefab room templates
- [ ] Multi-level dungeons
- [ ] Dynamic difficulty
- [ ] Quest objectives
- [ ] NPC placement

## 📝 License

Part of the RPG Workbench project.

## 🤝 Contributing

See main project README for contribution guidelines.
