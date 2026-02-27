import { RPG_ENGINE_SYSTEMS } from "./engineSystems";
import { RPG_MENU_TREE } from "./menuTree";
import type { RPGToolInputDefinition } from "./types";

const dedupeTools = (tools: RPGToolInputDefinition[]): RPGToolInputDefinition[] => {
  const map = new Map<string, RPGToolInputDefinition>();
  tools.forEach((tool) => {
    if (!map.has(tool.id)) {
      map.set(tool.id, tool);
    }
  });
  return [...map.values()];
};

const menuTools = RPG_MENU_TREE.flatMap((menu) =>
  menu.subMenus.flatMap((subMenu) => subMenu.tools),
);

const engineTools = RPG_ENGINE_SYSTEMS.flatMap((system) => system.tools);

export const RPG_MAKER_COMPLETE_TOOLSET: RPGToolInputDefinition[] = [
  // Core editor and databases
  { id: "map-editor", label: "Map Editor", category: "authoring", description: "Build maps with layers, events, and region metadata." },
  { id: "tileset-editor", label: "Tileset Editor", category: "authoring", description: "Configure autotiles, collision, and terrain tags." },
  { id: "character-database", label: "Character Database", category: "authoring", description: "Manage actors, stats, growth, and portraits." },
  { id: "class-database", label: "Class Database", category: "authoring", description: "Define classes, progression, and class features." },
  { id: "skill-database", label: "Skill Database", category: "authoring", description: "Author active/passive abilities and costs." },
  { id: "item-database", label: "Item Database", category: "authoring", description: "Create consumables, key items, and equipment." },
  { id: "weapon-database", label: "Weapon Database", category: "authoring", description: "Define weapon stats, traits, and upgrade rules." },
  { id: "armor-database", label: "Armor Database", category: "authoring", description: "Define armor classes, resistances, and sets." },
  { id: "enemy-database", label: "Enemy Database", category: "authoring", description: "Configure enemy stats, actions, and drops." },
  { id: "troop-encounter-database", label: "Troop Encounter Database", category: "authoring", description: "Compose encounter groups and battle formations." },
  { id: "state-condition-database", label: "State Condition Database", category: "authoring", description: "Manage buffs, debuffs, and status effects." },
  { id: "element-database", label: "Element Database", category: "authoring", description: "Define elemental chart, resistances, and weaknesses." },
  { id: "animation-database", label: "Animation Database", category: "authoring", description: "Manage animation assets and playback metadata." },
  { id: "common-event-database", label: "Common Event Database", category: "authoring", description: "Create reusable global events and script snippets." },

  // Eventing and scripting
  { id: "event-command-editor", label: "Event Command Editor", category: "authoring", description: "Author event command chains and conditions." },
  { id: "visual-event-editor", label: "Visual Event Editor", category: "authoring", description: "Drag-and-drop event flow construction." },
  { id: "cutscene-timeline", label: "Cutscene Timeline", category: "authoring", description: "Sequence camera, dialogue, and actor actions." },
  { id: "dialogue-graph-editor", label: "Dialogue Graph Editor", category: "authoring", description: "Branching dialogue with conditionals and flags." },
  { id: "quest-designer", label: "Quest Designer", category: "authoring", description: "Define objectives, dependencies, and rewards." },
  { id: "script-editor", label: "Script Editor", category: "authoring", description: "Edit runtime script files with syntax helpers." },
  { id: "plugin-manager", label: "Plugin Manager", category: "authoring", description: "Install and configure plugin packages." },
  { id: "plugin-command-editor", label: "Plugin Command Editor", category: "authoring", description: "Define plugin command interfaces and args." },
  { id: "switch-variable-editor", label: "Switch and Variable Editor", category: "authoring", description: "Edit global switches, variables, and naming." },

  // Battle and systems
  { id: "battle-system-designer", label: "Battle System Designer", category: "authoring", description: "Tune turn flow, formulas, and action economy." },
  { id: "damage-formula-lab", label: "Damage Formula Lab", category: "authoring", description: "Test and benchmark combat formula outputs." },
  { id: "ai-behavior-editor", label: "AI Behavior Editor", category: "authoring", description: "Build behavior trees and tactical priorities." },
  { id: "loot-table-editor", label: "Loot Table Editor", category: "authoring", description: "Configure drops, rarity pools, and roll tables." },
  { id: "crafting-recipe-editor", label: "Crafting Recipe Editor", category: "authoring", description: "Manage crafting inputs, checks, and outputs." },
  { id: "shop-economy-editor", label: "Shop Economy Editor", category: "authoring", description: "Define inventory, prices, taxes, and regions." },
  { id: "progression-balance-tool", label: "Progression Balance Tool", category: "authoring", description: "Analyze XP curves and difficulty spikes." },
  { id: "difficulty-profile-editor", label: "Difficulty Profile Editor", category: "authoring", description: "Tune easy/normal/hard modifiers." },

  // UI and presentation
  { id: "ui-layout-editor", label: "UI Layout Editor", category: "authoring", description: "Edit HUD/menu layouts and anchors." },
  { id: "window-skin-editor", label: "Window Skin Editor", category: "authoring", description: "Customize dialogue/menu windows and theme assets." },
  { id: "font-manager", label: "Font Manager", category: "content", description: "Manage fonts, fallbacks, and localization coverage." },
  { id: "iconset-editor", label: "Iconset Editor", category: "content", description: "Map icon IDs to UI and item entries." },
  { id: "portrait-manager", label: "Portrait Manager", category: "content", description: "Manage character busts and expression variants." },
  { id: "title-screen-editor", label: "Title Screen Editor", category: "authoring", description: "Configure title menu visuals and behavior." },
  { id: "game-over-screen-editor", label: "Game Over Screen Editor", category: "authoring", description: "Customize defeat flow visuals and transitions." },

  // World and content pipelines
  { id: "region-zone-editor", label: "Region and Zone Editor", category: "authoring", description: "Define biome tags, danger levels, and travel rules." },
  { id: "world-map-editor", label: "World Map Editor", category: "authoring", description: "Create overworld routes and node metadata." },
  { id: "dungeon-flow-editor", label: "Dungeon Flow Editor", category: "authoring", description: "Design puzzle gates, keys, and encounter pacing." },
  { id: "npc-schedule-editor", label: "NPC Schedule Editor", category: "authoring", description: "Configure day/night routines and location swaps." },
  { id: "spawn-table-editor", label: "Spawn Table Editor", category: "authoring", description: "Tune random encounters by region/time/weather." },
  { id: "environmental-effects-editor", label: "Environmental Effects Editor", category: "authoring", description: "Author fog, weather, and hazard behaviors." },
  { id: "fast-travel-node-editor", label: "Fast Travel Node Editor", category: "authoring", description: "Manage travel unlocks and route conditions." },

  // Audio and media
  { id: "audio-manager", label: "Audio Manager", category: "content", description: "Organize BGM/BGS/ME/SE assets and groups." },
  { id: "music-loop-editor", label: "Music Loop Editor", category: "content", description: "Set loop points and playback transitions." },
  { id: "sound-cue-editor", label: "Sound Cue Editor", category: "authoring", description: "Bind sounds to events, states, and triggers." },
  { id: "voice-line-manager", label: "Voice Line Manager", category: "content", description: "Manage dialogue VO clips and fallback rules." },
  { id: "video-cinematic-manager", label: "Video and Cinematic Manager", category: "content", description: "Configure intro/cutscene playback assets." },

  // Debug, QA, profiling
  { id: "playtest-runner", label: "Playtest Runner", category: "debug", description: "Launch quick playtests with scenario presets." },
  { id: "battle-simulator", label: "Battle Simulator", category: "debug", description: "Stress-test battle outcomes over many iterations." },
  { id: "save-inspector", label: "Save Inspector", category: "debug", description: "Inspect and edit save-state fields during testing." },
  { id: "event-trace-viewer", label: "Event Trace Viewer", category: "debug", description: "Trace event execution and variable changes." },
  { id: "profiler-overlay", label: "Profiler Overlay", category: "debug", description: "Track frame time, memory, and script hotspots." },
  { id: "pathfinding-debugger", label: "Pathfinding Debugger", category: "debug", description: "Visualize nav paths and blocker resolution." },
  { id: "collision-debugger", label: "Collision Debugger", category: "debug", description: "Render collision layers and passability flags." },
  { id: "quest-state-debugger", label: "Quest State Debugger", category: "debug", description: "Inspect active quest states and conditions." },
  { id: "ai-decision-debugger", label: "AI Decision Debugger", category: "debug", description: "Explain tactical AI action selection." },
  { id: "translation-validator", label: "Translation Validator", category: "debug", description: "Detect missing keys and overflow strings." },
  { id: "asset-usage-auditor", label: "Asset Usage Auditor", category: "debug", description: "Find unused or duplicate assets." },

  // Build and deployment
  { id: "build-pipeline-manager", label: "Build Pipeline Manager", category: "build", description: "Configure build targets and pipeline stages." },
  { id: "packaging-wizard", label: "Packaging Wizard", category: "build", description: "Create desktop/web/mobile build bundles." },
  { id: "patch-dlc-manager", label: "Patch and DLC Manager", category: "build", description: "Prepare incremental content updates." },
  { id: "mod-export-tool", label: "Mod Export Tool", category: "build", description: "Export mod-compatible data packages." },
  { id: "crash-report-configurator", label: "Crash Report Configurator", category: "build", description: "Configure symbols and crash telemetry." },
  { id: "platform-capability-checker", label: "Platform Capability Checker", category: "build", description: "Validate features by target platform." },

  // Localization and narrative production
  { id: "localization-manager", label: "Localization Manager", category: "content", description: "Manage language packs and fallback chains." },
  { id: "terminology-glossary", label: "Terminology Glossary", category: "content", description: "Central glossary for consistent translation." },
  { id: "narrative-beat-board", label: "Narrative Beat Board", category: "authoring", description: "Plan story beats and arc dependencies." },
  { id: "codex-journal-editor", label: "Codex Journal Editor", category: "authoring", description: "Manage lore entries and unlock conditions." },
  { id: "faction-reputation-editor", label: "Faction Reputation Editor", category: "authoring", description: "Define reputation thresholds and rewards." },
  { id: "achievement-editor", label: "Achievement Editor", category: "authoring", description: "Create goals, unlock rules, and badges." },

  // Economy and liveops-like systems
  { id: "currency-ledger-editor", label: "Currency Ledger Editor", category: "authoring", description: "Manage multiple currencies and sinks/sources." },
  { id: "drop-rate-balancer", label: "Drop Rate Balancer", category: "authoring", description: "Tune reward probabilities and pity systems." },
  { id: "event-calendar-editor", label: "Event Calendar Editor", category: "authoring", description: "Schedule seasonal quests and bonuses." },
  { id: "challenge-mode-editor", label: "Challenge Mode Editor", category: "authoring", description: "Define roguelike or challenge rule sets." },

  // Analytics and telemetry tools
  { id: "session-analytics-viewer", label: "Session Analytics Viewer", category: "debug", description: "Review funnels, deaths, and progression churn." },
  { id: "economy-analytics-viewer", label: "Economy Analytics Viewer", category: "debug", description: "Monitor inflation and item circulation." },
  { id: "combat-log-analyzer", label: "Combat Log Analyzer", category: "debug", description: "Break down DPR, survivability, and status uptime." },
];

export const RPG_TOOL_REGISTRY = dedupeTools([
  ...menuTools,
  ...engineTools,
  ...RPG_MAKER_COMPLETE_TOOLSET,
]);

export const RPG_TOOL_LABELS = RPG_TOOL_REGISTRY.map((tool) => tool.label);
export const RPG_TOOL_LABELS_SORTED = [...RPG_TOOL_LABELS].sort((a, b) =>
  a.localeCompare(b),
);
