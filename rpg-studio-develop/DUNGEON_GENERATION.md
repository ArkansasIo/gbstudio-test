# Procedural Dungeon Generation System

A D&D 5e-inspired procedural dungeon generator with biomes, encounters, and treasure.

## Features

- **10 Unique Biomes**: Underdark, Crypt, Cave, Ruins, Fortress, Temple, Sewers, Mine, Laboratory, Prison
- **BSP Algorithm**: Binary Space Partitioning for organic dungeon layouts
- **D&D 5e Mechanics**: Challenge Rating, XP budgets, treasure tables
- **Seeded Generation**: Reproducible dungeons using seed values
- **Smart Encounters**: Biome-appropriate enemies with proper CR balancing
- **Treasure System**: Magic items, gold, gems based on D&D 5e DMG

## Quick Start

```typescript
import { DungeonGenerator, DungeonConfig } from './lib/dungeon';

const config: DungeonConfig = {
  seed: 12345,
  biome: 'underdark',
  difficulty: 2, // Tier 2 (levels 5-10)
  minRooms: 8,
  maxRooms: 15,
  branchingFactor: 0.3,
  treasureDensity: 0.2,
  trapDensity: 0.15,
  width: 80,
  height: 60
};

const generator = new DungeonGenerator(config);
const dungeon = generator.generate();

console.log(`Generated ${dungeon.rooms.length} rooms`);
console.log(`Start: ${dungeon.startRoomId}`);
console.log(`Boss: ${dungeon.bossRoomId}`);
```

## Biomes

### Underdark
- **Enemies**: Aberrations, Drow, Mind Flayers, Beholders
- **Features**: Chasms, Fungus, Crystals, Underground Lakes
- **Hazards**: Poisonous gas, Unstable ground, Psychic emanations

### Ancient Crypt
- **Enemies**: Undead, Skeletons, Wraiths, Vampires, Liches
- **Features**: Altars, Statues, Rubble, Pits
- **Hazards**: Necrotic energy, Cursed ground, Collapsing ceilings

### Natural Caves
- **Enemies**: Beasts, Goblins, Kobolds, Trolls, Ogres
- **Features**: Water, Rubble, Chasms, Crystals
- **Hazards**: Flooding, Rockfall, Slippery surfaces

### Ancient Ruins
- **Enemies**: Constructs, Elementals, Ghosts, Gargoyles
- **Features**: Rubble, Statues, Pillars, Altars
- **Hazards**: Unstable floors, Magical wards, Falling debris

### Fortress
- **Enemies**: Humanoids, Orcs, Hobgoblins, Knights
- **Features**: Pillars, Rubble, Altars
- **Hazards**: Arrow slits, Murder holes, Boiling oil

### Desecrated Temple
- **Enemies**: Fiends, Cultists, Demons, Devils
- **Features**: Altars, Statues, Pillars, Lava
- **Hazards**: Unholy ground, Summoning circles, Divine wrath

### City Sewers
- **Enemies**: Oozes, Rat Swarms, Crocodiles, Wererats
- **Features**: Water, Rubble, Fungus
- **Hazards**: Disease, Toxic fumes, Drowning

### Abandoned Mine
- **Enemies**: Elementals, Dwarf Zombies, Rust Monsters, Xorn
- **Features**: Rubble, Crystals, Chasms, Pillars
- **Hazards**: Cave-ins, Toxic gas, Unstable supports

### Mad Wizard's Laboratory
- **Enemies**: Constructs, Homunculi, Flesh Golems, Mages
- **Features**: Crystals, Altars, Statues
- **Hazards**: Wild magic, Explosive reagents, Teleportation traps

### Underground Prison
- **Enemies**: Humanoids, Prisoners, Guards, Chain Devils
- **Features**: Pits, Rubble, Water
- **Hazards**: Locked doors, Torture devices, Starvation

## Room Types

- **Entrance**: Starting point
- **Chamber**: Standard room with encounters
- **Treasure**: Contains valuable loot
- **Boss**: Final challenge with powerful enemy
- **Trap**: Dangerous hazards
- **Puzzle**: Requires problem-solving
- **Rest**: Safe area to recover
- **Merchant**: NPC vendor
- **Shrine**: Divine blessing location

## Difficulty Tiers (D&D 5e)

- **Tier 1**: Levels 1-4 (Local Heroes)
- **Tier 2**: Levels 5-10 (Heroes of the Realm)
- **Tier 3**: Levels 11-16 (Masters of the Realm)
- **Tier 4**: Levels 17-20 (Masters of the World)

## Encounter System

Encounters are balanced using D&D 5e Challenge Rating and XP budgets:

```typescript
// Example encounter in Tier 2 Underdark
{
  challengeRating: 7,
  enemies: [
    { name: 'Mind Flayer', cr: 7, hp: 71, ac: 15, count: 1 },
    { name: 'Intellect Devourer', cr: 2, hp: 21, ac: 12, count: 2 }
  ],
  difficulty: 'hard',
  xpReward: 3300
}
```

## Treasure System

Treasure follows D&D 5e rarity and value guidelines:

```typescript
{
  gold: 750,
  items: [
    { name: '+1 Weapon', type: 'weapon', rarity: 'uncommon', value: 500 },
    { name: 'Potion of Greater Healing', type: 'potion', rarity: 'uncommon', value: 150 },
    { name: 'Ruby', type: 'gem', rarity: 'common', value: 5000 }
  ],
  rarity: 'rare'
}
```

## Advanced Usage

### Custom Seed for Reproducibility

```typescript
const seed = Date.now();
const config: DungeonConfig = {
  seed,
  biome: 'crypt',
  difficulty: 3,
  minRooms: 10,
  maxRooms: 20,
  branchingFactor: 0.4,
  treasureDensity: 0.25,
  trapDensity: 0.2,
  width: 100,
  height: 80
};

// Same seed = same dungeon
const dungeon1 = new DungeonGenerator(config).generate();
const dungeon2 = new DungeonGenerator(config).generate();
// dungeon1 and dungeon2 are identical
```

### Accessing Room Data

```typescript
const dungeon = generator.generate();

dungeon.rooms.forEach(room => {
  console.log(`Room ${room.id}: ${room.type}`);
  console.log(`  Position: (${room.x}, ${room.y})`);
  console.log(`  Size: ${room.width}x${room.height}`);
  console.log(`  Features: ${room.features.join(', ')}`);
  console.log(`  Description: ${room.description}`);
  
  if (room.encounter) {
    console.log(`  Encounter CR: ${room.encounter.challengeRating}`);
    console.log(`  XP Reward: ${room.encounter.xpReward}`);
  }
  
  if (room.treasure) {
    console.log(`  Gold: ${room.treasure.gold}gp`);
    console.log(`  Items: ${room.treasure.items.length}`);
  }
});
```

### Visualizing the Dungeon

```typescript
function visualizeDungeon(dungeon: Dungeon): string {
  const lines: string[] = [];
  
  for (let y = 0; y < dungeon.config.height; y++) {
    let line = '';
    for (let x = 0; x < dungeon.config.width; x++) {
      const cell = dungeon.grid[y][x];
      if (cell === 0) line += ' '; // Empty
      else if (cell === -1) line += '#'; // Corridor
      else line += 'R'; // Room
    }
    lines.push(line);
  }
  
  return lines.join('\n');
}

console.log(visualizeDungeon(dungeon));
```

## Integration with RPG Workbench

The dungeon generator integrates with the RPG Workbench system:

```typescript
import { store } from './store';
import { DungeonGenerator } from './lib/dungeon';

// Generate dungeon
const config = { /* ... */ };
const dungeon = new DungeonGenerator(config).generate();

// Dispatch to Redux store
store.dispatch({
  type: 'rpg/setCurrentDungeon',
  payload: dungeon
});

// Use in game logic
const currentRoom = dungeon.rooms.find(r => r.id === dungeon.startRoomId);
```

## Performance

- **Generation Time**: ~10-50ms for typical dungeons (10-20 rooms)
- **Memory Usage**: ~1-5MB per dungeon
- **Scalability**: Tested up to 100 rooms, 200x200 grid

## Algorithm Details

### BSP (Binary Space Partitioning)

1. Start with full dungeon area
2. Recursively split into smaller regions
3. Create rooms in leaf nodes
4. Connect rooms with L-shaped corridors
5. Add special rooms (entrance, boss, treasure)
6. Populate with encounters and features

### Encounter Balancing

1. Calculate XP budget based on tier and difficulty
2. Select biome-appropriate enemy types
3. Add enemies until XP budget is met
4. Apply multiplier for multiple enemies
5. Ensure CR is appropriate for party level

## Future Enhancements

- [ ] Cellular automata for organic cave generation
- [ ] Prefab room templates
- [ ] Multi-level dungeons with stairs
- [ ] Dynamic difficulty adjustment
- [ ] Quest objective placement
- [ ] NPC placement system
- [ ] Environmental storytelling
- [ ] Dungeon themes and modifiers

## References

- D&D 5e Dungeon Master's Guide
- D&D 5e Monster Manual
- Procedural Generation in Game Design (book)
- BSP Dungeon Generation Algorithm
