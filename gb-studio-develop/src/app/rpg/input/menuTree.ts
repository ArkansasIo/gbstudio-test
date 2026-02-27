import type { RPGMenuInputDefinition } from "./types";

export const RPG_MENU_TREE: RPGMenuInputDefinition[] = [
  {
    id: "main",
    label: "Main Menu",
    subMenus: [
      {
        id: "main-start",
        label: "Start and Continue",
        tools: [
          {
            id: "save-slot-browser",
            label: "Save Slot Browser",
            category: "content",
            description: "Selects existing profiles and save snapshots.",
          },
          {
            id: "profile-selector",
            label: "Profile Selector",
            category: "content",
            description: "Chooses player profile metadata.",
          },
        ],
        actions: [
          { id: "new-game", label: "New Game", functionName: "startNewGame()" },
          {
            id: "continue",
            label: "Continue",
            functionName: "continueFromSave()",
          },
        ],
      },
      {
        id: "main-options",
        label: "Pre-Game Options",
        tools: [
          {
            id: "language-picker",
            label: "Language Picker",
            category: "content",
            description: "Sets locale before session start.",
          },
          {
            id: "accessibility-presets",
            label: "Accessibility Presets",
            category: "content",
            description: "Applies predefined readability settings.",
          },
        ],
        actions: [
          {
            id: "open-options",
            label: "Options",
            functionName: "openOptionsMenu()",
          },
          {
            id: "open-help",
            label: "How To Play",
            functionName: "openTutorialMenu()",
          },
        ],
      },
    ],
  },
  {
    id: "pause",
    label: "In-game Pause Menu",
    subMenus: [
      {
        id: "pause-party",
        label: "Party and Inventory",
        tools: [
          {
            id: "party-manager",
            label: "Party Manager",
            category: "authoring",
            description: "Edits active lineup and reserves.",
          },
          {
            id: "inventory-grid",
            label: "Inventory Grid",
            category: "authoring",
            description: "Shows item stacks and categories.",
          },
          {
            id: "equipment-inspector",
            label: "Equipment Inspector",
            category: "authoring",
            description: "Compares loadouts and derived stats.",
          },
        ],
        actions: [
          { id: "open-party", label: "Party", functionName: "openPartyMenu()" },
          {
            id: "open-inventory",
            label: "Inventory",
            functionName: "openInventoryMenu()",
          },
          {
            id: "open-skills",
            label: "Skills",
            functionName: "openSkillsMenu()",
          },
        ],
      },
      {
        id: "pause-system",
        label: "Save and System",
        tools: [
          {
            id: "save-slot-manager",
            label: "Save Slot Manager",
            category: "runtime",
            description: "Manages save slot create/update/delete.",
          },
          {
            id: "checkpoint-browser",
            label: "Checkpoint Browser",
            category: "runtime",
            description: "Lists world checkpoints by map and chapter.",
          },
        ],
        actions: [
          { id: "save-game", label: "Save", functionName: "saveGame()" },
          { id: "load-game", label: "Load", functionName: "loadGame()" },
          {
            id: "pause-options",
            label: "Options",
            functionName: "openOptionsMenu()",
          },
          { id: "pause-quit", label: "Quit", functionName: "quitToTitle()" },
        ],
      },
    ],
  },
  {
    id: "character",
    label: "Character Status Menu",
    subMenus: [
      {
        id: "char-stats",
        label: "Stats and Progression",
        tools: [
          {
            id: "stat-graph",
            label: "Stat Graph",
            category: "authoring",
            description: "Plots attributes over level range.",
          },
          {
            id: "level-curve-viewer",
            label: "Level Curve Viewer",
            category: "authoring",
            description: "Previews exp gain and breakpoints.",
          },
          {
            id: "trait-matrix",
            label: "Trait Matrix",
            category: "authoring",
            description: "Compares passive/active trait impacts.",
          },
        ],
        actions: [
          {
            id: "view-stats",
            label: "View Stats",
            functionName: "openCharacterStats(actorId)",
          },
          {
            id: "allocate-points",
            label: "Allocate Points",
            functionName: "allocateStatPoints(actorId)",
          },
        ],
      },
      {
        id: "char-gear",
        label: "Equipment and Loadout",
        tools: [
          {
            id: "equipment-slots",
            label: "Equipment Slots",
            category: "authoring",
            description: "Edits weapon/armor/accessory slots.",
          },
          {
            id: "set-bonus-preview",
            label: "Set Bonus Preview",
            category: "authoring",
            description: "Shows active and potential set bonuses.",
          },
        ],
        actions: [
          {
            id: "equip-item",
            label: "Equip Item",
            functionName: "equipItem(actorId, itemId)",
          },
          {
            id: "unequip-item",
            label: "Unequip Item",
            functionName: "unequipItem(actorId, slotId)",
          },
        ],
      },
    ],
  },
  {
    id: "world",
    label: "Map, Quest, and Journal Menus",
    subMenus: [
      {
        id: "world-map",
        label: "Map and Fast Travel",
        tools: [
          {
            id: "world-map-tool",
            label: "World Map",
            category: "content",
            description: "Displays regions, nodes, and markers.",
          },
          {
            id: "region-markers",
            label: "Region Markers",
            category: "content",
            description: "Configures named map landmarks.",
          },
          {
            id: "teleport-nodes",
            label: "Teleport Nodes",
            category: "runtime",
            description: "Links reachable fast-travel points.",
          },
        ],
        actions: [
          { id: "open-map", label: "Open Map", functionName: "openWorldMap()" },
          {
            id: "fast-travel",
            label: "Fast Travel",
            functionName: "fastTravel(targetNodeId)",
          },
        ],
      },
      {
        id: "world-quest",
        label: "Quest and Journal",
        tools: [
          {
            id: "quest-tracker-tool",
            label: "Quest Tracker",
            category: "authoring",
            description: "Sets active objectives and states.",
          },
          {
            id: "objective-timeline",
            label: "Objective Timeline",
            category: "authoring",
            description: "Orders steps and completion triggers.",
          },
          {
            id: "lore-journal",
            label: "Lore Journal",
            category: "content",
            description: "Stores codex entries and notes.",
          },
        ],
        actions: [
          {
            id: "open-quest",
            label: "Quest Log",
            functionName: "openQuestJournal()",
          },
          {
            id: "track-quest",
            label: "Track Quest",
            functionName: "setActiveQuest(questId)",
          },
        ],
      },
    ],
  },
  {
    id: "combat",
    label: "Battle and Tactical Menus",
    subMenus: [
      {
        id: "battle-command",
        label: "Battle Commands",
        tools: [
          {
            id: "turn-queue",
            label: "Turn Queue",
            category: "runtime",
            description: "Displays current and next turn actors.",
          },
          {
            id: "skill-palette",
            label: "Skill Palette",
            category: "authoring",
            description: "Groups skills by class and role.",
          },
          {
            id: "target-preview",
            label: "Target Preview",
            category: "runtime",
            description: "Shows effect previews before commit.",
          },
        ],
        actions: [
          {
            id: "battle-attack",
            label: "Attack",
            functionName: "battleAttack(targetId)",
          },
          {
            id: "battle-skill",
            label: "Skill",
            functionName: "battleUseSkill(skillId, targetId)",
          },
          {
            id: "battle-item",
            label: "Item",
            functionName: "battleUseItem(itemId, targetId)",
          },
          { id: "battle-guard", label: "Guard", functionName: "battleGuard()" },
        ],
      },
      {
        id: "battle-support",
        label: "Summons and Escape",
        tools: [
          {
            id: "summon-deck",
            label: "Summon Deck",
            category: "authoring",
            description: "Configures summon entities and costs.",
          },
          {
            id: "escape-meter",
            label: "Escape Probability Meter",
            category: "runtime",
            description: "Reports flee chance and modifiers.",
          },
        ],
        actions: [
          {
            id: "battle-summon",
            label: "Summon",
            functionName: "battleSummon(summonId)",
          },
          {
            id: "battle-escape",
            label: "Escape",
            functionName: "battleAttemptEscape()",
          },
        ],
      },
    ],
  },
  {
    id: "meta",
    label: "Options, Help, and Debug Menus",
    subMenus: [
      {
        id: "meta-accessibility",
        label: "Accessibility and Language",
        tools: [
          {
            id: "text-size-slider",
            label: "Text Size Slider",
            category: "content",
            description: "Scales dialogue and menu fonts.",
          },
          {
            id: "contrast-profiles",
            label: "Contrast Profiles",
            category: "content",
            description: "Applies contrast and brightness profiles.",
          },
          {
            id: "colorblind-modes",
            label: "Colorblind Modes",
            category: "content",
            description: "Provides palette-safe accessibility presets.",
          },
        ],
        actions: [
          {
            id: "set-language",
            label: "Language",
            functionName: "setLanguage(locale)",
          },
          {
            id: "set-accessibility",
            label: "Accessibility",
            functionName: "applyAccessibilityPreset(presetId)",
          },
        ],
      },
      {
        id: "meta-dev",
        label: "Debug and Diagnostics",
        tools: [
          {
            id: "debug-console",
            label: "Debug Console",
            category: "debug",
            description: "Runs runtime debug commands.",
          },
          {
            id: "profiler-overlay",
            label: "Profiler Overlay",
            category: "debug",
            description: "Shows frame, CPU, and memory metrics.",
          },
          {
            id: "script-trace-monitor",
            label: "Script Trace Monitor",
            category: "debug",
            description: "Streams event and script traces.",
          },
        ],
        actions: [
          {
            id: "open-debug",
            label: "Debug Tools",
            functionName: "openDebugMenu()",
          },
          { id: "open-bestiary", label: "Bestiary", functionName: "openBestiary()" },
          { id: "open-gallery", label: "Gallery", functionName: "openGallery()" },
          {
            id: "open-credits",
            label: "Credits",
            functionName: "openCreditsRoll()",
          },
        ],
      },
    ],
  },
];
