import { RPG_FEATURE_DEFINITIONS } from "app/rpg/features";

export type MenuDefinition = {
  label: string;
  items: string[];
};

export type ToolbarGroup = {
  name: string;
  actions: string[];
};

export type PanelDefinition = {
  id: string;
  title: string;
  entries: string[];
};

export type BlueprintNodeDefinition = {
  category: string;
  nodes: string[];
};

export type BlueprintNode = {
  id: string;
  title: string;
  x: number;
  y: number;
  color: string;
};

export type BlueprintEdge = {
  from: string;
  to: string;
};

export const unrealTopMenus: MenuDefinition[] = [
  {
    label: "File",
    items: [
      "New Project",
      "Open Project",
      "Save All",
      "Source Control",
      "Project Settings",
      "Package Project",
      "Exit",
    ],
  },
  {
    label: "Edit",
    items: [
      "Undo",
      "Redo",
      "Cut",
      "Copy",
      "Paste",
      "Duplicate",
      "Delete",
      "Editor Preferences",
    ],
  },
  {
    label: "View",
    items: [
      "Viewport Layouts",
      "World Outliner",
      "Details",
      "Content Browser",
      "Blueprint Debugger",
      "Output Log",
      "Fullscreen",
    ],
  },
  {
    label: "Tools",
    items: [
      "Tilemap Editor",
      "Sprite Editor",
      "Collision Painter",
      "Palette Manager",
      "Animation Timeline",
      "Audio Mixer",
      "Data Tables",
      "C Script Editor",
      "Quest Designer",
      "Skill Database",
      "AI Behavior Graph",
    ],
  },
  {
    label: "RPG",
    items: [
      "Party Manager",
      "Inventory Builder",
      "Dialogue Graph",
      "Quest Tracker",
      "Battle Designer",
      "Economy Tables",
    ],
  },
  {
    label: "Blueprints",
    items: [
      "Open Level Blueprint",
      "Open Actor Blueprint",
      "Open UI Blueprint",
      "Create Blueprint Class",
      "Compile Blueprint",
      "Compile C Scripts",
      "Blueprint Diff",
    ],
  },
  {
    label: "Build",
    items: [
      "Build Project",
      "Build ROM",
      "Build Web",
      "Build Pocket",
      "Clean",
    ],
  },
  {
    label: "Play",
    items: [
      "Play In Editor",
      "Play From Camera",
      "Pause",
      "Step",
      "Stop",
      "Network Emulation",
    ],
  },
  {
    label: "Window",
    items: [
      "Load Layout",
      "Save Layout",
      "Reset Layout",
      "Plugin Browser",
      "Developer Tools",
    ],
  },
  {
    label: "Help",
    items: [
      "Documentation",
      "API Reference",
      "Tutorials",
      "About",
      "Check for Updates (GitHub)"
    ],
  },
];

export const unrealToolbar: ToolbarGroup[] = [
  {
    name: "Project",
    actions: ["New", "Open", "Save", "Source Control"],
  },
  {
    name: "Transform",
    actions: ["Select", "Move", "Rotate", "Scale", "Grid Snap"],
  },
  {
    name: "2D Tools",
    actions: ["Paint Tile", "Fill", "Eraser", "Collision", "Light Probe"],
  },
  {
    name: "Blueprint",
    actions: ["Add Node", "Compile", "Find References", "Debug"],
  },
  {
    name: "Play",
    actions: ["Play", "Simulate", "Pause", "Stop"],
  },
];

export const unrealPanels: PanelDefinition[] = [
  {
    id: "content",
    title: "Content Browser",
    entries: [
      "Maps",
      "Tilesets",
      "Sprites",
      "Animations",
      "UI",
      "Audio",
      "Data Tables",
      "Blueprints",
    ],
  },
  {
    id: "outliner",
    title: "World Outliner",
    entries: [
      "MainCamera",
      "PlayerSpawn",
      "NPC_Vendor",
      "Trigger_SecretDoor",
      "Tilemap_Forest_01",
      "Audio_BGM_Forest",
    ],
  },
  {
    id: "details",
    title: "Details",
    entries: [
      "Transform",
      "Sprite Renderer",
      "Collision",
      "Gameplay Tags",
      "Variables",
      "Events",
    ],
  },
  {
    id: "tools",
    title: "8-bit Tool Palette",
    entries: [
      "Palette Index Lock",
      "8x8/16x16 Tile Mode",
      "MetaTile Composer",
      "Bank Budget Meter",
      "Sprite OAM Inspector",
      "Tile Collision Layers",
    ],
  },
];

export const blueprintNodeCatalog: BlueprintNodeDefinition[] = [
  {
    category: "Events",
    nodes: [
      "Event BeginPlay",
      "Event Tick",
      "On Interact",
      "On Area Enter",
      "On Dialogue Choice",
    ],
  },
  {
    category: "Flow Control",
    nodes: ["Branch", "Sequence", "DoOnce", "Gate", "ForEach"],
  },
  {
    category: "Gameplay",
    nodes: [
      "Spawn Actor 2D",
      "Set Tile",
      "Give Item",
      "Damage Actor",
      "Set Quest Flag",
    ],
  },
  {
    category: "UI",
    nodes: [
      "Show Dialogue",
      "Show Choice Box",
      "Set HUD Icon",
      "Play UI SFX",
      "Open Menu",
    ],
  },
  {
    category: "Audio",
    nodes: [
      "Play BGM",
      "Stop BGM",
      "Play SFX",
      "Set Volume Bus",
      "Crossfade Track",
    ],
  },
  {
    category: "Math/Logic",
    nodes: ["Add Int", "Compare Int", "Random Range", "Clamp", "Equals"],
  },
  {
    category: "Native C",
    nodes: [
      "C: script_main",
      "C: vm_set_const",
      "C: vm_actor_move_to",
      "C: vm_call_native",
    ],
  },
];

export const blueprintGraph = {
  nodes: [
    { id: "n1", title: "On Interact", x: 40, y: 120, color: "#355070" },
    { id: "n2", title: "Branch: Has Key?", x: 250, y: 110, color: "#6d597a" },
    { id: "n3", title: "Play SFX: Unlock", x: 500, y: 70, color: "#2a9d8f" },
    { id: "n4", title: "Open Secret Door", x: 730, y: 70, color: "#264653" },
    { id: "n5", title: "Show Dialogue", x: 500, y: 170, color: "#e76f51" },
  ] as BlueprintNode[],
  edges: [
    { from: "n1", to: "n2" },
    { from: "n2", to: "n3" },
    { from: "n3", to: "n4" },
    { from: "n2", to: "n5" },
  ] as BlueprintEdge[],
};

export const linkedRPGFeatureNames = RPG_FEATURE_DEFINITIONS.map(
  (feature) => feature.name,
);

export const linkedRPGFeatureCapabilities = RPG_FEATURE_DEFINITIONS.flatMap(
  (feature) =>
    feature.capabilities.map((capability) => `${feature.name}: ${capability}`),
);
