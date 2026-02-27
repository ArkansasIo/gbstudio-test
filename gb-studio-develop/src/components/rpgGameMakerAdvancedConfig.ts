export type QuickToolDefinition = {
  id: string;
  label: string;
  group: "Viewport" | "Authoring" | "Debug" | "Automation";
};

export type WorkspacePreset = {
  id: string;
  label: string;
  description: string;
};

export type SidebarListDefinition = {
  id: string;
  title: string;
  entries: string[];
};

export type InspectorSectionDefinition = {
  id: string;
  title: string;
  fields: string[];
};

export type StatusActionDefinition = {
  id: string;
  label: string;
};

export type ToolLinkDefinition = {
  id: string;
  label: string;
  category: "Docs" | "Build" | "Community" | "Project";
  url: string;
};

export type EditorThemeDefinition = {
  id: string;
  label: string;
};

export const workspacePresets: WorkspacePreset[] = [
  {
    id: "world-build",
    label: "World Build",
    description: "Map editing and placement workflow",
  },
  {
    id: "quest-authoring",
    label: "Quest Authoring",
    description: "Dialogue, branching, and objective tuning",
  },
  {
    id: "combat-design",
    label: "Combat Design",
    description: "Skills, AI, and encounter balancing",
  },
  {
    id: "ui-polish",
    label: "UI Polish",
    description: "HUD, menus, and transitions",
  },
];

export const topBarQuickTools: QuickToolDefinition[] = [
  { id: "quick-open", label: "Quick Open", group: "Automation" },
  { id: "search-everywhere", label: "Search Everywhere", group: "Automation" },
  { id: "focus-viewport", label: "Focus Viewport", group: "Viewport" },
  { id: "toggle-grid", label: "Grid", group: "Viewport" },
  { id: "toggle-guides", label: "Guides", group: "Viewport" },
  { id: "tile-validator", label: "Tile Validator", group: "Authoring" },
  { id: "event-linter", label: "Event Linter", group: "Authoring" },
  { id: "asset-audit", label: "Asset Audit", group: "Authoring" },
  { id: "watch-variables", label: "Watch Vars", group: "Debug" },
  { id: "trace-events", label: "Trace Events", group: "Debug" },
  { id: "fps-overlay", label: "FPS Overlay", group: "Debug" },
];

export const leftSidebarLists: SidebarListDefinition[] = [
  {
    id: "layers",
    title: "Scene Layers",
    entries: [
      "BG_Parallax_0",
      "BG_Parallax_1",
      "World_Terrain",
      "World_Props",
      "Collision_Mask",
      "FG_Overlay",
    ],
  },
  {
    id: "bookmarks",
    title: "Bookmarks",
    entries: [
      "Forest Entrance Spawn",
      "Town Marketplace Trigger",
      "Castle Gate Cutscene",
      "Dungeon B2 Boss Door",
    ],
  },
  {
    id: "quests",
    title: "Quest Watch",
    entries: [
      "Q001: Find The Lost Key",
      "Q004: Repair The Airship",
      "Q007: Defeat Bandit Leader",
      "Q011: Unlock Crystal Shrine",
    ],
  },
  {
    id: "prefabs",
    title: "Prefab Library",
    entries: [
      "NPC_Shopkeeper",
      "Trigger_SavePoint",
      "Door_LockedQuest",
      "Spawner_RandomLoot",
      "Puzzle_PressurePlate",
    ],
  },
];

export const rightInspectorSections: InspectorSectionDefinition[] = [
  {
    id: "transform",
    title: "Transform",
    fields: ["Position X", "Position Y", "Rotation", "Scale X", "Scale Y"],
  },
  {
    id: "render",
    title: "Rendering",
    fields: ["Sprite", "Palette", "Z-Order", "Parallax Layer", "Visibility"],
  },
  {
    id: "collision",
    title: "Collision",
    fields: ["Collision Shape", "Collision Layer", "Trigger Type", "One Way"],
  },
  {
    id: "events",
    title: "Event Bindings",
    fields: ["On Interact", "On Enter", "On Exit", "On Tick", "On Defeat"],
  },
  {
    id: "build",
    title: "Build Settings",
    fields: ["Target Platform", "Optimization", "Asset Compression", "Debug Symbols"],
  },
];

export const statusActions: StatusActionDefinition[] = [
  { id: "open-log", label: "Output Log" },
  { id: "open-profiler", label: "Profiler" },
  { id: "open-task-manager", label: "Task Manager" },
  { id: "open-pipeline", label: "Asset Pipeline" },
];

export const editorThemes: EditorThemeDefinition[] = [
  { id: "midnight-steel", label: "Midnight Steel" },
  { id: "ocean-grid", label: "Ocean Grid" },
  { id: "ember-forge", label: "Ember Forge" },
  { id: "forest-terminal", label: "Forest Terminal" },
  { id: "sandstone", label: "Sandstone" },
  { id: "pixel-ice", label: "Pixel Ice" },
  { id: "mono-retro", label: "Mono Retro" },
  { id: "studio-slate", label: "Studio Slate" },
  { id: "cobalt-night", label: "Cobalt Night" },
];

export const toolLinks: ToolLinkDefinition[] = [
  {
    id: "docs-engine",
    label: "Engine Docs",
    category: "Docs",
    url: "https://github.com/ArkansasIo/gbstudio-test",
  },
  {
    id: "docs-api",
    label: "API Reference",
    category: "Docs",
    url: "https://github.com/ArkansasIo/gbstudio-test",
  },
  {
    id: "build-rom-guide",
    label: "Build ROM Guide",
    category: "Build",
    url: "https://github.com/ArkansasIo/gbstudio-test",
  },
  {
    id: "build-web-guide",
    label: "Build Web Guide",
    category: "Build",
    url: "https://github.com/ArkansasIo/gbstudio-test",
  },
  {
    id: "github-repo",
    label: "GitHub Repository",
    category: "Project",
    url: "https://github.com/ArkansasIo/gbstudio-test",
  },
  {
    id: "project-roadmap",
    label: "Project Roadmap",
    category: "Project",
    url: "https://github.com/ArkansasIo/gbstudio-test/issues",
  },
  {
    id: "community-discord",
    label: "Community Discord",
    category: "Community",
    url: "https://discord.com/",
  },
];
