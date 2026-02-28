export type PremadeSystemCategory =
  | "combat"
  | "progression"
  | "economy"
  | "social"
  | "world"
  | "mmorpg"
  | "ui"
  | "liveops";

export interface RPGPremadeSystem {
  id: string;
  name: string;
  category: PremadeSystemCategory;
  summary: string;
  includes: string[];
  setupSteps: string[];
}

export const RPG_PREMADE_SYSTEMS: RPGPremadeSystem[] = [
  {
    id: "premade-turnbased-core",
    name: "Turn-Based RPG Core",
    category: "combat",
    summary: "Classic JRPG turn order, skills, items, states, and victory flow.",
    includes: [
      "Battle command menu",
      "Initiative queue",
      "Damage formula presets",
      "Status effect manager",
    ],
    setupSteps: [
      "Choose stat and class templates",
      "Configure encounter groups",
      "Tune damage and XP formulas",
      "Bind UI widgets to battle events",
    ],
  },
  {
    id: "premade-action-core",
    name: "Action RPG Core",
    category: "combat",
    summary: "Realtime combat with cooldowns, hitboxes, and stagger windows.",
    includes: [
      "Realtime ability execution",
      "Hitbox collision rules",
      "Cooldown and resource bars",
      "Enemy aggro behavior",
    ],
    setupSteps: [
      "Set action timings and i-frames",
      "Define weapon and skill hitboxes",
      "Configure enemy AI priorities",
      "Calibrate dodge/parry windows",
    ],
  },
  {
    id: "premade-crafting-economy",
    name: "Crafting and Economy Suite",
    category: "economy",
    summary: "Resource gathering, crafting stations, shops, and marketplace loops.",
    includes: [
      "Recipe pipeline",
      "Resource node respawns",
      "Vendor price modifiers",
      "Loot table balancing",
    ],
    setupSteps: [
      "Import recipe templates",
      "Set node tiers by region",
      "Tune currency sinks/sources",
      "Run economy simulation tests",
    ],
  },
  {
    id: "premade-quest-narrative",
    name: "Quest and Narrative Framework",
    category: "progression",
    summary: "Branching quests, journal tracking, codex, and cinematic triggers.",
    includes: [
      "Quest state machine",
      "Dialogue branching",
      "Journal + codex unlocks",
      "Cutscene timeline triggers",
    ],
    setupSteps: [
      "Define quest categories and tags",
      "Add branch conditions and fail states",
      "Link cutscenes to milestones",
      "Assign reward bundles",
    ],
  },
  {
    id: "premade-guild-social",
    name: "Guild and Social Systems",
    category: "social",
    summary: "Guild ranks, chat channels, party finder, and friend systems.",
    includes: [
      "Guild hierarchy templates",
      "Public/private chat channels",
      "LFG listing lifecycle",
      "Presence and friend states",
    ],
    setupSteps: [
      "Configure social policy rules",
      "Set guild rank permissions",
      "Enable matchmaking queues",
      "Validate moderation workflows",
    ],
  },
  {
    id: "premade-mmorpg-liveops",
    name: "MMORPG LiveOps Kit",
    category: "mmorpg",
    summary: "Season pass, event rotations, telemetry, and patch deployment support.",
    includes: [
      "Season progression track",
      "Timed event scheduler",
      "Reward claim safety",
      "KPI telemetry dashboards",
    ],
    setupSteps: [
      "Create event calendar",
      "Define season objectives",
      "Attach rewards and claim checks",
      "Monitor retention/economy metrics",
    ],
  },
  {
    id: "premade-openworld-sim",
    name: "Open World Simulation Pack",
    category: "world",
    summary: "Weather, time cycle, spawn tables, factions, and dynamic world states.",
    includes: [
      "Day/night transitions",
      "Weather sequencer",
      "Zone encounter tables",
      "Faction reputation hooks",
    ],
    setupSteps: [
      "Define world regions and tags",
      "Set simulation cadence",
      "Bind events to world states",
      "Playtest progression pacing",
    ],
  },
  {
    id: "premade-ui-hud",
    name: "UI and HUD Foundation",
    category: "ui",
    summary: "Prebuilt HUD/menu widgets, accessibility settings, and input overlays.",
    includes: [
      "HUD templates",
      "Window skin presets",
      "Input prompt mapping",
      "Accessibility toggles",
    ],
    setupSteps: [
      "Choose a base theme",
      "Map widget data bindings",
      "Enable accessibility profiles",
      "Validate screen scaling and localization",
    ],
  },
  {
    id: "premade-live-service-admin",
    name: "Live Service Admin Toolkit",
    category: "liveops",
    summary: "Server status, maintenance mode, anti-cheat, and broadcast controls.",
    includes: [
      "Shard health monitor",
      "Maintenance scheduler",
      "Cheat scan workflows",
      "System broadcast panel",
    ],
    setupSteps: [
      "Configure operations roles",
      "Set maintenance playbooks",
      "Define anti-cheat thresholds",
      "Run incident-response drills",
    ],
  },
];

export const RPG_PREMADE_SYSTEM_LABELS = RPG_PREMADE_SYSTEMS.map(
  (system) => `${system.name} [${system.category}]`,
);
