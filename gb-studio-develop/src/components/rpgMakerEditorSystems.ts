import {
  blueprintGraph,
  blueprintNodeCatalog,
  unrealPanels,
  unrealToolbar,
  unrealTopMenus,
} from "./rpgGameMakerConfig";

export type ProjectAssetType =
  | "Maps"
  | "Tilesets"
  | "Sprites"
  | "Animations"
  | "UI"
  | "Audio"
  | "Data Tables"
  | "Blueprints";

export interface ProjectAssetItem {
  id: string;
  name: string;
  type: ProjectAssetType;
}

export interface BlueprintNodeModel {
  id: string;
  title: string;
  x: number;
  y: number;
  color: string;
}

export interface BlueprintEdgeModel {
  from: string;
  to: string;
}

export interface EditorState {
  selectedMenu: string;
  selectedToolCategory: string;
  activeTool: string;
  selectedAssetId: string | null;
  selectedOutlinerId: string | null;
  selectedBlueprintNodeId: string | null;
  projectName: string;
  mapName: string;
  layerName: string;
  modified: boolean;
  outputLog: string[];
  assets: ProjectAssetItem[];
  outliner: string[];
  blueprintNodes: BlueprintNodeModel[];
  blueprintEdges: BlueprintEdgeModel[];
}

export const audioLibraryPacks = {
  music: ["8bit-adventure-core", "8bit-battle-core", "8bit-town-core"],
  sfx: ["ui-core", "combat-core", "world-core"],
};

const makeInitialAssets = (): ProjectAssetItem[] => [
  { id: "map-forest", name: "Forest_Entrance", type: "Maps" },
  { id: "map-town", name: "Town_Center", type: "Maps" },
  { id: "sprite-hero", name: "Hero_Player", type: "Sprites" },
  { id: "sprite-vendor", name: "NPC_Vendor", type: "Sprites" },
  { id: "audio-bgm", name: "BGM_Overworld_Day", type: "Audio" },
  { id: "audio-sfx", name: "SFX_UI_Confirm", type: "Audio" },
  { id: "bp-door", name: "BP_SecretDoorController", type: "Blueprints" },
  { id: "dt-items", name: "DT_Items", type: "Data Tables" },
];

export const createInitialEditorState = (): EditorState => ({
  selectedMenu: unrealTopMenus[0]?.label ?? "File",
  selectedToolCategory: blueprintNodeCatalog[0]?.category ?? "Events",
  activeTool: unrealToolbar[2]?.actions[0] ?? "Paint Tile",
  selectedAssetId: null,
  selectedOutlinerId: null,
  selectedBlueprintNodeId: null,
  projectName: "Adventure_08bit",
  mapName: "Forest_Entrance",
  layerName: "FG",
  modified: false,
  outputLog: [
    "Editor initialized",
    `Loaded ${audioLibraryPacks.music.length} music packs and ${audioLibraryPacks.sfx.length} sfx packs`,
  ],
  assets: makeInitialAssets(),
  outliner: unrealPanels.find((p) => p.id === "outliner")?.entries ?? [],
  blueprintNodes: [...blueprintGraph.nodes],
  blueprintEdges: [...blueprintGraph.edges],
});

const appendLog = (state: EditorState, message: string): EditorState => ({
  ...state,
  outputLog: [...state.outputLog.slice(-59), message],
});

const nextNodeId = (nodes: BlueprintNodeModel[]): string => {
  const maxId = nodes.reduce((max, node) => {
    const numeric = parseInt(node.id.replace("n", ""), 10);
    return Number.isNaN(numeric) ? max : Math.max(max, numeric);
  }, 0);
  return `n${maxId + 1}`;
};

const getCategoryNodeColor = (category: string): string => {
  if (category === "Events") return "#355070";
  if (category === "Flow Control") return "#6d597a";
  if (category === "Gameplay") return "#2a9d8f";
  if (category === "UI") return "#e76f51";
  if (category === "Audio") return "#264653";
  if (category === "Native C") return "#7c2d12";
  return "#4b5563";
};

export const runMenuCommand = (
  state: EditorState,
  menuLabel: string,
  command: string,
): EditorState => {
  const base = appendLog(state, `[${menuLabel}] ${command}`);
  if (command === "New Project") {
    return {
      ...base,
      projectName: "New_8bit_Project",
      mapName: "Start_Map",
      modified: false,
      selectedAssetId: null,
      selectedOutlinerId: null,
      selectedBlueprintNodeId: null,
    };
  }
  if (command === "Save All") {
    return {
      ...appendLog(base, "Project saved"),
      modified: false,
    };
  }
  if (command === "Build ROM" || command === "Build Web" || command === "Build Pocket") {
    return appendLog(base, `Queued build target: ${command.replace("Build ", "")}`);
  }
  if (command === "C Script Editor") {
    return appendLog(base, "Opened built-in C script editor");
  }
  if (command === "Compile C Scripts") {
    return appendLog(base, "Queued native C script compile (GBDK target)");
  }
  if (command === "Load Layout") {
    return appendLog(base, "Loaded layout preset: Unreal-2D");
  }
  if (command === "Reset Layout") {
    return appendLog(base, "Reset to default docking layout");
  }
  return base;
};

export const runToolbarAction = (
  state: EditorState,
  groupName: string,
  action: string,
): EditorState => {
  const base = appendLog(state, `[${groupName}] ${action}`);
  if (groupName === "2D Tools") {
    return {
      ...base,
      activeTool: action,
      modified: true,
    };
  }
  if (groupName === "Project" && action === "Save") {
    return {
      ...appendLog(base, "Project saved from toolbar"),
      modified: false,
    };
  }
  if (groupName === "Play" && action === "Play") {
    return appendLog(base, "Play in editor started");
  }
  if (groupName === "Blueprint" && action === "Compile") {
    return appendLog(base, "Blueprint compile completed");
  }
  if (groupName === "Blueprint" && action === "Find References") {
    return appendLog(base, "Reference scan completed for blueprint and C nodes");
  }
  return base;
};

export const selectAsset = (state: EditorState, assetId: string): EditorState => {
  const asset = state.assets.find((a) => a.id === assetId);
  if (!asset) return state;
  return appendLog(
    {
      ...state,
      selectedAssetId: assetId,
      selectedOutlinerId: null,
      selectedBlueprintNodeId: null,
    },
    `Selected asset: ${asset.name}`,
  );
};

export const selectOutlinerEntry = (
  state: EditorState,
  entry: string,
): EditorState =>
  appendLog(
    {
      ...state,
      selectedOutlinerId: entry,
      selectedAssetId: null,
      selectedBlueprintNodeId: null,
    },
    `Selected actor: ${entry}`,
  );

export const setToolCategory = (state: EditorState, category: string): EditorState => ({
  ...state,
  selectedToolCategory: category,
});

export const addBlueprintNodeFromCategory = (state: EditorState): EditorState => {
  const category = state.selectedToolCategory;
  const categoryData = blueprintNodeCatalog.find((c) => c.category === category);
  if (!categoryData || categoryData.nodes.length === 0) return state;
  const nodeTitle = categoryData.nodes[0];
  const node: BlueprintNodeModel = {
    id: nextNodeId(state.blueprintNodes),
    title: nodeTitle,
    x: 80 + ((state.blueprintNodes.length * 70) % 700),
    y: 80 + ((state.blueprintNodes.length * 40) % 220),
    color: getCategoryNodeColor(category),
  };
  return appendLog(
    {
      ...state,
      blueprintNodes: [...state.blueprintNodes, node],
      selectedBlueprintNodeId: node.id,
      modified: true,
    },
    `Added blueprint node: ${node.title}`,
  );
};

export const selectBlueprintNode = (
  state: EditorState,
  nodeId: string,
): EditorState => ({
  ...state,
  selectedBlueprintNodeId: nodeId,
  selectedAssetId: null,
  selectedOutlinerId: null,
});

export const removeSelectedBlueprintNode = (state: EditorState): EditorState => {
  if (!state.selectedBlueprintNodeId) return state;
  const nodeId = state.selectedBlueprintNodeId;
  const removed = state.blueprintNodes.find((n) => n.id === nodeId);
  if (!removed) return state;
  return appendLog(
    {
      ...state,
      blueprintNodes: state.blueprintNodes.filter((n) => n.id !== nodeId),
      blueprintEdges: state.blueprintEdges.filter(
        (e) => e.from !== nodeId && e.to !== nodeId,
      ),
      selectedBlueprintNodeId: null,
      modified: true,
    },
    `Removed blueprint node: ${removed.title}`,
  );
};

export const connectSelectedToLatestNode = (state: EditorState): EditorState => {
  if (!state.selectedBlueprintNodeId) return state;
  const from = state.selectedBlueprintNodeId;
  const latest = state.blueprintNodes[state.blueprintNodes.length - 1];
  if (!latest || latest.id === from) return state;
  const exists = state.blueprintEdges.some(
    (edge) => edge.from === from && edge.to === latest.id,
  );
  if (exists) return state;
  return appendLog(
    {
      ...state,
      blueprintEdges: [...state.blueprintEdges, { from, to: latest.id }],
      modified: true,
    },
    `Connected ${from} -> ${latest.id}`,
  );
};
