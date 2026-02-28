import React, { FC } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  background: ${(props) => props.theme.colors.document.background};
`;

const Header = styled.div`
  padding: 20px;
  background: ${(props) => props.theme.colors.sidebar.background};
  border-bottom: 1px solid ${(props) => props.theme.colors.sidebar.border};
`;

const Title = styled.h1`
  font-size: 24px;
  margin: 0 0 10px 0;
  color: ${(props) => props.theme.colors.text};
`;

const Description = styled.p`
  margin: 0;
  color: ${(props) => props.theme.colors.secondaryText};
  font-size: 14px;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

const SystemCard = styled.div`
  background: ${(props) => props.theme.colors.sidebar.background};
  border: 1px solid ${(props) => props.theme.colors.sidebar.border};
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
`;

const SystemTitle = styled.h2`
  font-size: 20px;
  margin: 0 0 10px 0;
  color: ${(props) => props.theme.colors.text};
`;

const SystemDescription = styled.p`
  margin: 0 0 15px 0;
  color: ${(props) => props.theme.colors.secondaryText};
  font-size: 14px;
  line-height: 1.6;
`;

const FeatureList = styled.ul`
  margin: 0;
  padding-left: 20px;
  color: ${(props) => props.theme.colors.text};
  font-size: 13px;
  
  li {
    margin-bottom: 5px;
  }
`;

const CodeBlock = styled.pre`
  background: ${(props) => props.theme.colors.input.background};
  border: 1px solid ${(props) => props.theme.colors.input.border};
  border-radius: 4px;
  padding: 10px;
  color: ${(props) => props.theme.colors.text};
  font-family: monospace;
  font-size: 12px;
  overflow-x: auto;
  margin-top: 10px;
`;

interface SystemsPageProps {
  system: 
    | "rpgworkbench"
    | "tileset" 
    | "worldgen" 
    | "maze" 
    | "audio" 
    | "gameboy"
    | "terminal"
    | "dnd5e"
    | "charactersheet"
    | "spellbook"
    | "monsters"
    | "items"
    | "encounters";
}

const SystemsPage: FC<SystemsPageProps> = ({ system }) => {
  const systems = {
    rpgworkbench: {
      icon: "🎮",
      title: "RPG Workbench",
      description: "Complete RPG development toolkit with 8 integrated systems for creating D&D-style games",
      features: [
        "🏰 Dungeon Generator - 10 D&D 5e biomes with BSP algorithm",
        "🎨 Tileset Processor - 144 tiles with 8 color variants",
        "🌍 World Generator - 290 biomes with weather and seasons",
        "🗝️ Maze System - Multi-floor dungeons and towers (1-100)",
        "🔊 Audio System - Game Boy sound hardware emulation",
        "🎮 Game Boy Emulator - Complete DMG/CGB emulation",
        "🎵 Music Notation - 4 formats with keyboard editor",
        "💻 Terminal System - Redux logging and debugging",
      ],
      usage: `// Access any system from the RPG Workbench menu
// Use keyboard shortcuts for quick navigation:
// Ctrl+Shift+D - Dungeon Generator
// Ctrl+Shift+T - Tileset Processor
// Ctrl+Shift+W - World Generator
// Ctrl+Shift+M - Maze System
// Ctrl+Shift+A - Audio System
// Ctrl+Shift+G - Game Boy Emulator
// Ctrl+Shift+N - Music Notation
// Ctrl+Shift+L - Terminal System`,
      cli: "Various CLI tools available per system",
      docs: "MASTER_INDEX.md, COMPLETE_SYSTEM_OVERVIEW.md",
    },
    terminal: {
      icon: "💻",
      title: "Terminal System",
      description: "Redux-based terminal system for logging, debugging, and error tracking",
      features: [
        "Redux state management",
        "Message filtering (info, warning, error, success)",
        "Search functionality",
        "Export to file",
        "Clear history",
        "Auto-scroll",
        "Timestamp tracking",
        "Color-coded messages",
        "Integration with all systems",
      ],
      usage: `import { TerminalLogger } from '@/lib/terminal/terminalLogger';

TerminalLogger.info('System initialized');
TerminalLogger.warning('Low memory');
TerminalLogger.error('Failed to load', { details: 'File not found' });
TerminalLogger.success('Build completed');`,
      cli: "Integrated into application (no CLI)",
      docs: "TERMINAL_SYSTEM_README.md, TERMINAL_QUICK_START.md",
    },
    dnd5e: {
      icon: "🐉",
      title: "D&D 5e Tools",
      description: "Complete toolkit for D&D 5th Edition game management and character creation",
      features: [
        "📜 Character Sheet - Full character creation and management",
        "📖 Spellbook - Complete spell database with filtering",
        "👹 Monster Manual - 1000+ monsters with stat blocks",
        "⚔️ Items & Equipment - Weapons, armor, and magic items",
        "⚔️ Encounter Builder - CR-based encounter generation",
        "Integration with dungeon and world generators",
        "D&D 5e SRD compliance",
        "Export to PDF",
      ],
      usage: `// Access D&D 5e tools from the menu
// Use keyboard shortcuts:
// Ctrl+Shift+5 - D&D 5e Overview
// Ctrl+Shift+C - Character Sheet
// Ctrl+Shift+S - Spellbook
// Ctrl+Shift+O - Monster Manual
// Ctrl+Shift+I - Items & Equipment
// Ctrl+Shift+E - Encounter Builder`,
      cli: "Use in application (no CLI)",
      docs: "DND5E_TOOLS.md (coming soon)",
    },
    charactersheet: {
      icon: "📜",
      title: "Character Sheet",
      description: "Complete D&D 5e character creation and management system",
      features: [
        "All 13 official classes",
        "All official races and subraces",
        "Ability score generation (Standard Array, Point Buy, Roll)",
        "Skill proficiencies and expertise",
        "Equipment and inventory management",
        "Spell slot tracking",
        "Hit point management",
        "Level progression (1-20)",
        "Background and personality traits",
        "Export to PDF",
      ],
      usage: `// Create a new character
const character = {
  name: "Gandalf",
  race: "Human",
  class: "Wizard",
  level: 5,
  abilities: {
    str: 10, dex: 14, con: 12,
    int: 18, wis: 15, cha: 13
  }
};`,
      cli: "Use in application (no CLI)",
      docs: "CHARACTER_SHEET.md (coming soon)",
    },
    spellbook: {
      icon: "📖",
      title: "Spellbook",
      description: "Complete D&D 5e spell database with advanced filtering and management",
      features: [
        "500+ official spells",
        "Filter by class, level, school",
        "Search by name or description",
        "Spell slot tracking",
        "Prepared spell management",
        "Ritual spell indicators",
        "Concentration tracking",
        "Spell card generation",
        "Export spell lists",
      ],
      usage: `// Search for spells
const fireSpells = searchSpells({
  name: "fire",
  class: "Wizard",
  level: [1, 3]
});

// Prepare spells
prepareSpell("Fireball");
prepareSpell("Shield");`,
      cli: "Use in application (no CLI)",
      docs: "SPELLBOOK.md (coming soon)",
    },
    monsters: {
      icon: "👹",
      title: "Monster Manual",
      description: "Complete D&D 5e monster database with stat blocks and encounter tools",
      features: [
        "1000+ official monsters",
        "Filter by CR, type, size",
        "Search by name or abilities",
        "Full stat blocks",
        "Legendary actions",
        "Lair actions",
        "Monster tokens",
        "Initiative tracking",
        "Export stat blocks",
      ],
      usage: `// Search for monsters
const dragons = searchMonsters({
  type: "Dragon",
  cr: [10, 15]
});

// Get monster stat block
const goblin = getMonster("Goblin");
console.log(goblin.ac, goblin.hp, goblin.attacks);`,
      cli: "Use in application (no CLI)",
      docs: "MONSTER_MANUAL.md (coming soon)",
    },
    items: {
      icon: "⚔️",
      title: "Items & Equipment",
      description: "Complete D&D 5e item database with weapons, armor, and magic items",
      features: [
        "Weapons (Simple, Martial, Ranged)",
        "Armor (Light, Medium, Heavy, Shields)",
        "Magic items (Common to Legendary)",
        "Adventuring gear",
        "Tools and kits",
        "Potions and scrolls",
        "Cursed items",
        "Item properties",
        "Encumbrance tracking",
      ],
      usage: `// Search for items
const swords = searchItems({
  type: "Weapon",
  category: "Martial",
  damage: "1d8"
});

// Get magic item
const item = getMagicItem("Flame Tongue");
console.log(item.rarity, item.attunement, item.properties);`,
      cli: "Use in application (no CLI)",
      docs: "ITEMS_EQUIPMENT.md (coming soon)",
    },
    encounters: {
      icon: "⚔️",
      title: "Encounter Builder",
      description: "CR-based encounter generation and balancing for D&D 5e",
      features: [
        "CR-based difficulty calculation",
        "Party size and level adjustment",
        "Monster selection by CR",
        "Treasure generation",
        "XP calculation",
        "Initiative tracking",
        "Combat log",
        "Random encounter tables",
        "Export encounters",
      ],
      usage: `// Build an encounter
const encounter = buildEncounter({
  partyLevel: 5,
  partySize: 4,
  difficulty: "hard"
});

// Add monsters
encounter.addMonster("Goblin", 8);
encounter.addMonster("Hobgoblin", 2);
encounter.addMonster("Bugbear", 1);

console.log(encounter.difficulty, encounter.xp);`,
      cli: "Use in application (no CLI)",
      docs: "ENCOUNTER_BUILDER.md (coming soon)",
    },
    tileset: {
      icon: "🎨",
      title: "Tileset Processor",
      description: "Comprehensive tileset processing system with 144 tile definitions, slicing tools, and Tiled Map Editor integration",
      features: [
        "144 tile definitions for isometric dungeons",
        "Automatic tileset slicing",
        "Tiled Map Editor integration (.tsx/.tmx)",
        "Collision system generation",
        "8 color variants (Lava, Frost, Cursed, Toxic, Holy, Shadow, Blood)",
        "Dungeon-to-tilemap conversion",
        "CLI tool for batch processing",
      ],
      usage: `import { dungeonToTilemap, exportDungeonAsTiledMap } from '@/lib/tileset';

const tilemap = dungeonToTilemap(dungeon);
exportDungeonAsTiledMap(dungeon, 'tileset.tsx', 'map.tmx');`,
      cli: "npm run process:tileset",
      docs: "TILESET_SYSTEM.md, TILESET_VISUAL_REFERENCE.md",
    },
    worldgen: {
      icon: "🌍",
      title: "World Generator",
      description: "Complete world generation system with 290 D&D 5e biomes across all major environment types",
      features: [
        "290 D&D 5e biomes (Arctic, Desert, Forest, Grassland, Hill, Mountain, Swamp, Underdark, Underwater, Urban)",
        "Multi-layer terrain (elevation, moisture, temperature, magic, corruption, civilization)",
        "Biome blending for smooth transitions",
        "Chunk streaming for large worlds",
        "Weather system (7 types: Clear, Rain, Snow, Storm, Fog, Wind, Hail)",
        "Seasonal system (4 seasons with biome effects)",
        "Encounter generation",
        "Quest generation",
      ],
      usage: `import { generateWorld, getBiome } from '@/lib/world';

const world = generateWorld({
  seed: 12345,
  width: 256,
  height: 256,
  scale: 0.01
});

const biome = getBiome(world.cells[0].biome);`,
      cli: "Use in code (no CLI tool)",
      docs: "WORLD_GENERATION_SYSTEM.md, BIOMES_290_COMPLETE.md",
    },
    maze: {
      icon: "🗝️",
      title: "Maze System",
      description: "Multi-floor maze generation with dungeons, towers, trials, and raids",
      features: [
        "Multi-floor dungeons (1-100 descending)",
        "Multi-floor towers (1-100 ascending)",
        "4 maze algorithms (Recursive Backtracker, Prim's, Kruskal's, Eller's)",
        "Gate system (6 types: Key, Switch, Puzzle, Boss, Quest, Timed)",
        "Special rooms (9 types: Boss, Treasure, Shop, Shrine, Trap, Puzzle, Rest, Secret, Arena)",
        "Trial system (5 trials: Speed, Combat, Stealth, Puzzle, Survival)",
        "Raid system (4 raids: Crypt, Tower, Labyrinth, Abyss)",
        "Progression tracking",
        "Pathfinding (A*)",
        "ASCII visualization",
      ],
      usage: `import { MazeGenerator } from '@/lib/maze';

const maze = new MazeGenerator({
  type: 'dungeon',
  floors: 50,
  width: 40,
  height: 40,
  algorithm: 'recursive_backtracker'
}).generate();`,
      cli: "npm run generate:maze dungeon --floors 50 --ascii",
      docs: "MAZE_SYSTEM.md, MAZE_QUICK_START.md",
    },
    audio: {
      icon: "🔊",
      title: "Audio System",
      description: "Game Boy sound hardware emulation with 4 channels and sound effects generator",
      features: [
        "4 Game Boy sound channels (Pulse 1, Pulse 2, Wave, Noise)",
        "Authentic DMG/CGB sound emulation",
        "ADSR envelope support",
        "Frequency sweep (Pulse 1)",
        "Custom waveforms (Wave channel)",
        "LFSR noise generation",
        "18 preset sound effects",
        "Procedural SFX generation",
        "Integration with music notation system",
      ],
      usage: `import { GBSoundSystem, SFXLibrary } from '@/lib/audio';

const audioContext = new AudioContext();
const gbSound = new GBSoundSystem(audioContext);
const sfxLib = new SFXLibrary(audioContext);

gbSound.playNote({
  channel: 'pulse1',
  enabled: true,
  frequency: 440,
  volume: 12,
  length: 32,
  dutyCycle: 2
});

sfxLib.playType('jump');`,
      cli: "Use in code (no CLI tool)",
      docs: "AUDIO_SYSTEM.md, AUDIO_AND_GAMEBOY_SYSTEM.md",
    },
    gameboy: {
      icon: "🎮",
      title: "Game Boy Emulator",
      description: "Complete DMG/CGB hardware emulation with CPU, PPU, Memory, and all subsystems",
      features: [
        "Sharp LR35902 CPU emulator (Z80-like)",
        "PPU graphics emulator (160×144, 4 colors)",
        "Full memory map (64KB address space)",
        "MBC support (MBC1, MBC3, MBC5)",
        "Timer, Joypad, Interrupts",
        "Save/load state functionality",
        "Debug features (breakpoints, memory inspection)",
        "Audio integration with GB sound system",
        "Frame rate: ~59.7 FPS",
        "Speed control (1x-4x)",
      ],
      usage: `import { GameBoyEmulator } from '@/lib/gameboy';

const rom = new Uint8Array([...]); // ROM data
const emulator = new GameBoyEmulator(rom, {
  model: 'DMG',
  audioEnabled: true
}, {
  onFrame: (framebuffer) => {
    // Render 160×144 RGBA framebuffer
    renderToCanvas(framebuffer);
  }
});

emulator.start();
emulator.pressButton('ArrowUp');`,
      cli: "Use in code (no CLI tool)",
      docs: "GAMEBOY_EMULATOR.md, AUDIO_AND_GAMEBOY_SYSTEM.md",
    },
  };

  const currentSystem = systems[system];

  return (
    <Wrapper>
      <Header>
        <Title>{currentSystem.icon} {currentSystem.title}</Title>
        <Description>{currentSystem.description}</Description>
      </Header>
      <Content>
        <SystemCard>
          <SystemTitle>Features</SystemTitle>
          <FeatureList>
            {currentSystem.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </FeatureList>
        </SystemCard>

        <SystemCard>
          <SystemTitle>Usage Example</SystemTitle>
          <CodeBlock>{currentSystem.usage}</CodeBlock>
        </SystemCard>

        <SystemCard>
          <SystemTitle>CLI & Documentation</SystemTitle>
          <SystemDescription>
            <strong>CLI:</strong> {currentSystem.cli}
            <br />
            <strong>Documentation:</strong> {currentSystem.docs}
          </SystemDescription>
        </SystemCard>
      </Content>
    </Wrapper>
  );
};

export default SystemsPage;
