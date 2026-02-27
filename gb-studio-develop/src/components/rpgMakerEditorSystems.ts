import {
  blueprintGraph,
  blueprintNodeCatalog,
  unrealPanels,
  unrealToolbar,
  unrealTopMenus,
} from "./rpgGameMakerConfig";
import {
  RPG_COLOR_PROFILES,
  RPG_SETTING_GROUPS,
  RPG_SETTINGS_PRESETS,
  type RPGSettingValue,
} from "app/rpg/input";
import {
  editorThemes,
  leftSidebarLists,
  rightInspectorSections,
  toolLinks,
  topBarQuickTools,
  workspacePresets,
} from "./rpgGameMakerAdvancedConfig";
import {
  defaultWolfmanAlphaConfig,
  wolfmanAlphaDamage,
  wolfmanAlphaDebugLine,
  wolfmanAlphaExpForLevel,
} from "shared/lib/rpg/wolfmanAlpha";

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
  activeWorkspaceId: string;
  activeQuickToolId: string | null;
  topSearchQuery: string;
  selectedLeftListId: string;
  selectedLeftListEntry: string | null;
  selectedInspectorSectionId: string;
  selectedAssetId: string | null;
  selectedOutlinerId: string | null;
  selectedBlueprintNodeId: string | null;
  activeThemeId: string;
  activeColorProfileId: string;
  activeSettingsPresetId: string;
  settingValues: Record<string, RPGSettingValue>;
  lastOpenedLinkId: string | null;
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

const makeDefaultSettingValues = (): Record<string, RPGSettingValue> => {
  const values: Record<string, RPGSettingValue> = {};
  RPG_SETTING_GROUPS.forEach((group) => {
    group.options.forEach((option) => {
      values[option.id] = option.defaultValue;
    });
  });
  return values;
};

export const createInitialEditorState = (): EditorState => ({
  selectedMenu: unrealTopMenus[0]?.label ?? "File",
  selectedToolCategory: blueprintNodeCatalog[0]?.category ?? "Events",
  activeTool: unrealToolbar[2]?.actions[0] ?? "Paint Tile",
  activeWorkspaceId: workspacePresets[0]?.id ?? "world-build",
  activeQuickToolId: null,
  topSearchQuery: "",
  selectedLeftListId: leftSidebarLists[0]?.id ?? "layers",
  selectedLeftListEntry: null,
  selectedInspectorSectionId: rightInspectorSections[0]?.id ?? "transform",
  selectedAssetId: null,
  selectedOutlinerId: null,
  selectedBlueprintNodeId: null,
  activeThemeId: editorThemes[0]?.id ?? "midnight-steel",
  activeColorProfileId: RPG_COLOR_PROFILES[0]?.id ?? "crystal-cyan",
  activeSettingsPresetId: RPG_SETTINGS_PRESETS[0]?.id ?? "balanced-default",
  settingValues: makeDefaultSettingValues(),
  lastOpenedLinkId: null,
  projectName: "Adventure_08bit",
  mapName: "Forest_Entrance",
  layerName: "FG",
  modified: false,
  outputLog: [
    "Editor initialized",
    wolfmanAlphaDebugLine(
      `battle profile loaded (maxLevel=${defaultWolfmanAlphaConfig.maxLevel})`,
    ),
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

const getWorkspaceLabel = (workspaceId: string): string =>
  workspacePresets.find((workspace) => workspace.id === workspaceId)?.label ??
  workspaceId;

const getQuickToolLabel = (toolId: string): string =>
  topBarQuickTools.find((tool) => tool.id === toolId)?.label ?? toolId;

const getThemeLabel = (themeId: string): string =>
  editorThemes.find((theme) => theme.id === themeId)?.label ?? themeId;

const getColorProfileLabel = (profileId: string): string =>
  RPG_COLOR_PROFILES.find((profile) => profile.id === profileId)?.label ??
  profileId;

const getSettingsPresetLabel = (presetId: string): string =>
  RPG_SETTINGS_PRESETS.find((preset) => preset.id === presetId)?.label ??
  presetId;

const getToolLink = (linkId: string) => toolLinks.find((link) => link.id === linkId);

const appendBattlePreview = (state: EditorState): EditorState => {
  const sampleDamage = wolfmanAlphaDamage(
    { atk: 24, def: 10, level: 6 },
    { atk: 16, def: 14, level: 4 },
  );
  const sampleExp = wolfmanAlphaExpForLevel(12);
  return appendLog(
    appendLog(state, wolfmanAlphaDebugLine(`sampleDamage=Hero->Slime:${sampleDamage}`)),
    wolfmanAlphaDebugLine(`sampleExp=Level12:${sampleExp}`),
  );
};

const parseRpgFunctionCall = (
  functionName: unknown,
): { name: string; args: string[] } => {
  const normalized = typeof functionName === "string" ? functionName.trim() : "";
  if (!normalized) {
    return { name: "unknownAction", args: [] };
  }
  const match = normalized.match(/^([A-Za-z_]\w*)\((.*)\)$/);
  if (!match) {
    return { name: normalized, args: [] };
  }
  const args = match[2]
    .split(",")
    .map((arg) => arg.trim())
    .filter(Boolean);
  return { name: match[1], args };
};

export const executeRpgMenuFunction = (
  state: EditorState,
  functionName: unknown,
  sourceLabel?: string,
): EditorState => {
  try {
    const parsed = parseRpgFunctionCall(functionName);
    const withCallLog = appendLog(
      state,
      `[RPG] ${sourceLabel || "Action"} -> ${parsed.name}(${parsed.args.join(", ")})`,
    );

  if (parsed.name === "startNewGame") {
    return appendLog(
      {
        ...withCallLog,
        projectName: "Adventure_08bit",
        mapName: "Start_Map",
        layerName: "FG",
        selectedAssetId: null,
        selectedOutlinerId: null,
        selectedBlueprintNodeId: null,
        modified: false,
      },
      "Runtime start state initialized",
    );
  }
  if (parsed.name === "continueFromSave" || parsed.name === "loadGame") {
    return appendLog(withCallLog, "Loaded latest save slot snapshot");
  }
  if (parsed.name === "saveGame") {
    return appendLog(
      {
        ...withCallLog,
        modified: false,
      },
      "Save data written to active slot",
    );
  }
  if (parsed.name === "quitToTitle") {
    return appendLog(
      {
        ...withCallLog,
        selectedMenu: "File",
      },
      "Returned to title/menu context",
    );
  }
  if (
    parsed.name === "openOptionsMenu" ||
    parsed.name === "openTutorialMenu" ||
    parsed.name === "openPartyMenu" ||
    parsed.name === "openInventoryMenu" ||
    parsed.name === "openSkillsMenu" ||
    parsed.name === "openCharacterStats" ||
    parsed.name === "openQuestJournal" ||
    parsed.name === "openDebugMenu" ||
    parsed.name === "openBestiary" ||
    parsed.name === "openGallery" ||
    parsed.name === "openCreditsRoll"
  ) {
    return appendLog(withCallLog, `Opened UI panel: ${parsed.name}`);
  }
  if (parsed.name === "allocateStatPoints") {
    return appendLog(
      {
        ...withCallLog,
        modified: true,
      },
      "Allocated available stat points",
    );
  }
  if (parsed.name === "equipItem" || parsed.name === "unequipItem") {
    return appendLog(
      {
        ...withCallLog,
        modified: true,
      },
      `Equipment state updated via ${parsed.name}`,
    );
  }
  if (parsed.name === "openWorldMap") {
    return appendLog(
      {
        ...withCallLog,
        mapName: "World_Map",
      },
      "World map opened",
    );
  }
  if (parsed.name === "fastTravel") {
    return appendLog(
      {
        ...withCallLog,
        mapName: "FastTravel_Node",
        modified: true,
      },
      "Fast travel completed",
    );
  }
  if (parsed.name === "setActiveQuest") {
    return appendLog(
      {
        ...withCallLog,
        activeTool: "Quest Tracker",
      },
      "Quest tracker updated",
    );
  }
  if (parsed.name === "battleAttack") {
    const damage = wolfmanAlphaDamage(
      { atk: 22, def: 8, level: 5 },
      { atk: 17, def: 12, level: 4 },
    );
    return appendLog(withCallLog, wolfmanAlphaDebugLine(`battleAttack damage=${damage}`));
  }
  if (parsed.name === "battleUseSkill") {
    const damage = wolfmanAlphaDamage(
      { atk: 28, def: 10, level: 6 },
      { atk: 15, def: 9, level: 4 },
    );
    return appendLog(withCallLog, wolfmanAlphaDebugLine(`battleUseSkill damage=${damage}`));
  }
  if (parsed.name === "battleUseItem") {
    return appendLog(withCallLog, "Battle item consumed and effects applied");
  }
  if (parsed.name === "battleGuard") {
    return appendLog(withCallLog, "Guard stance enabled for current turn");
  }
  if (parsed.name === "battleSummon") {
    return appendLog(
      withCallLog,
      wolfmanAlphaDebugLine("Summon command resolved and queued"),
    );
  }
  if (parsed.name === "battleAttemptEscape") {
    return appendLog(withCallLog, "Escape roll executed");
  }
  if (parsed.name === "setLanguage") {
    return appendLog(withCallLog, "Language setting updated");
  }
  if (parsed.name === "applyAccessibilityPreset") {
    return appendLog(
      {
        ...withCallLog,
        modified: true,
      },
      "Accessibility preset applied",
    );
  }

  if (
    parsed.name.startsWith("open") ||
    parsed.name.startsWith("create") ||
    parsed.name.startsWith("invite") ||
    parsed.name.startsWith("join") ||
    parsed.name.startsWith("start")
  ) {
    return appendLog(
      {
        ...withCallLog,
        modified: true,
      },
      `Executed system action: ${parsed.name}`,
    );
  }

  if (
    parsed.name.startsWith("claim") ||
    parsed.name.startsWith("send") ||
    parsed.name.startsWith("set") ||
    parsed.name.startsWith("toggle")
  ) {
    return appendLog(
      {
        ...withCallLog,
        modified: true,
      },
      `Applied runtime update: ${parsed.name}`,
    );
  }

  if (
    parsed.name.startsWith("run") ||
    parsed.name.startsWith("suspend") ||
    parsed.name.startsWith("block")
  ) {
    return appendLog(withCallLog, `Operations command executed: ${parsed.name}`);
  }

    return appendLog(withCallLog, `[WARN] Unhandled RPG function: ${parsed.name}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return appendLog(
      state,
      `[ERROR] RPG action failed${sourceLabel ? ` (${sourceLabel})` : ""}: ${message}`,
    );
  }
};

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
  if (
    command === "Quest Designer" ||
    command === "Skill Database" ||
    command === "AI Behavior Graph" ||
    command === "Party Manager" ||
    command === "Inventory Builder" ||
    command === "Dialogue Graph" ||
    command === "Quest Tracker" ||
    command === "Battle Designer" ||
    command === "Economy Tables"
  ) {
    if (command === "Battle Designer") {
      return appendBattlePreview(
        appendLog(base, wolfmanAlphaDebugLine("opened battle designer")),
      );
    }
    return appendLog(base, `Opened tool workspace: ${command}`);
  }
  if (command === "Load Layout") {
    return appendLog(base, "Loaded layout preset: Unreal-2D");
  }
  if (command === "Reset Layout") {
    return appendLog(base, "Reset to default docking layout");
  }
  if (
    command === "Documentation" ||
    command === "API Reference" ||
    command === "Tutorials"
  ) {
    return openToolLink(base, "docs-engine");
  }
  if (command === "Check for Updates (GitHub)") {
    return openToolLink(base, "github-repo");
  }
  if (command === "Open Project") {
    return appendLog(base, "Project picker opened");
  }
  if (command === "Source Control") {
    return appendLog(base, "Source control integration opened");
  }
  if (command === "Project Settings" || command === "Editor Preferences") {
    return appendLog(base, "Settings panel focused");
  }
  if (command === "Package Project" || command === "Build Project") {
    return appendLog(base, "Queued full project package build");
  }
  if (command === "Exit") {
    return appendLog(base, "Exit requested");
  }
  if (command === "Undo" || command === "Redo") {
    return appendLog(base, `History action: ${command}`);
  }
  if (
    command === "Cut" ||
    command === "Copy" ||
    command === "Paste" ||
    command === "Duplicate" ||
    command === "Delete"
  ) {
    return appendLog(base, `Edit action applied: ${command}`);
  }
  if (
    command === "Viewport Layouts" ||
    command === "World Outliner" ||
    command === "Details" ||
    command === "Content Browser" ||
    command === "Blueprint Debugger" ||
    command === "Output Log" ||
    command === "Fullscreen"
  ) {
    return appendLog(base, `View updated: ${command}`);
  }
  if (
    command === "Tilemap Editor" ||
    command === "Sprite Editor" ||
    command === "Collision Painter" ||
    command === "Palette Manager" ||
    command === "Animation Timeline" ||
    command === "Audio Mixer" ||
    command === "Data Tables" ||
    command === "Plugin Browser"
  ) {
    return appendLog(base, `Tool opened: ${command}`);
  }
  if (
    command === "Open Level Blueprint" ||
    command === "Open Actor Blueprint" ||
    command === "Open UI Blueprint" ||
    command === "Create Blueprint Class" ||
    command === "Compile Blueprint" ||
    command === "Blueprint Diff"
  ) {
    return appendLog(base, `Blueprint action completed: ${command}`);
  }
  if (command === "Clean") {
    return appendLog(base, "Build cache clean requested");
  }
  if (
    command === "Play In Editor" ||
    command === "Play From Camera" ||
    command === "Pause" ||
    command === "Step" ||
    command === "Stop" ||
    command === "Network Emulation"
  ) {
    return appendLog(base, `Play command executed: ${command}`);
  }
  if (command === "Save Layout") {
    return appendLog(base, "Layout save requested");
  }
  if (command === "Developer Tools") {
    return appendLog(base, "Developer tools opened");
  }
  if (command === "About") {
    return appendLog(base, "About dialog opened");
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
  if (
    groupName === "Project" &&
    (action === "New" || action === "Open" || action === "Source Control")
  ) {
    return appendLog(base, `Project command executed: ${action}`);
  }
  if (groupName === "Transform") {
    return appendLog(
      {
        ...base,
        activeTool: action,
        modified: true,
      },
      `Transform tool selected: ${action}`,
    );
  }
  if (groupName === "Play" && (action === "Simulate" || action === "Pause" || action === "Stop")) {
    return appendLog(base, `Play state command: ${action}`);
  }
  if (groupName === "Blueprint" && action === "Compile") {
    return appendLog(base, "Blueprint compile completed");
  }
  if (groupName === "Blueprint" && action === "Debug") {
    return appendBattlePreview(
      appendLog(base, wolfmanAlphaDebugLine("debug snapshot generated")),
    );
  }
  if (groupName === "Blueprint" && action === "Find References") {
    return appendLog(base, "Reference scan completed for blueprint and C nodes");
  }
  return base;
};

export const setWorkspace = (
  state: EditorState,
  workspaceId: string,
): EditorState =>
  appendLog(
    {
      ...state,
      activeWorkspaceId: workspaceId,
    },
    `Switched workspace: ${getWorkspaceLabel(workspaceId)}`,
  );

export const setTopSearchQuery = (
  state: EditorState,
  query: string,
): EditorState => ({
  ...state,
  topSearchQuery: query,
});

export const triggerQuickTool = (
  state: EditorState,
  toolId: string,
): EditorState =>
  appendLog(
    {
      ...state,
      activeQuickToolId: toolId,
      modified: true,
    },
    `Quick tool executed: ${getQuickToolLabel(toolId)}`,
  );

export const setEditorTheme = (
  state: EditorState,
  themeId: string,
): EditorState =>
  appendLog(
    {
      ...state,
      activeThemeId: themeId,
      modified: true,
    },
    `Theme changed: ${getThemeLabel(themeId)}`,
  );

export const setColorProfile = (
  state: EditorState,
  colorProfileId: string,
): EditorState =>
  appendLog(
    {
      ...state,
      activeColorProfileId: colorProfileId,
      modified: true,
    },
    `Color profile changed: ${getColorProfileLabel(colorProfileId)}`,
  );

export const setSettingsPreset = (
  state: EditorState,
  settingsPresetId: string,
): EditorState => {
  const preset = RPG_SETTINGS_PRESETS.find((entry) => entry.id === settingsPresetId);
  if (!preset) {
    return appendLog(state, `Settings preset not found: ${settingsPresetId}`);
  }
  return appendLog(
    {
      ...state,
      activeSettingsPresetId: settingsPresetId,
      settingValues: {
        ...state.settingValues,
        ...preset.values,
      },
      modified: true,
    },
    `Settings preset applied: ${getSettingsPresetLabel(settingsPresetId)}`,
  );
};

export const setRpgSettingValue = (
  state: EditorState,
  settingId: string,
  value: RPGSettingValue,
): EditorState =>
  appendLog(
    {
      ...state,
      settingValues: {
        ...state.settingValues,
        [settingId]: value,
      },
      modified: true,
    },
    `Setting updated: ${settingId}=${String(value)}`,
  );

export const openToolLink = (state: EditorState, linkId: string): EditorState => {
  const link = getToolLink(linkId);
  if (!link) {
    return appendLog(state, `Tool link not found: ${linkId}`);
  }
  return appendLog(
    {
      ...state,
      lastOpenedLinkId: linkId,
    },
    `[Link] ${link.label} -> ${link.url}`,
  );
};

export const setLeftSidebarList = (
  state: EditorState,
  listId: string,
): EditorState => ({
  ...state,
  selectedLeftListId: listId,
  selectedLeftListEntry: null,
});

export const selectLeftSidebarEntry = (
  state: EditorState,
  entry: string,
): EditorState =>
  appendLog(
    {
      ...state,
      selectedLeftListEntry: entry,
      selectedAssetId: null,
      selectedOutlinerId: null,
      selectedBlueprintNodeId: null,
    },
    `Selected list entry: ${entry}`,
  );

export const setInspectorSection = (
  state: EditorState,
  sectionId: string,
): EditorState => ({
  ...state,
  selectedInspectorSectionId: sectionId,
});

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

export const addBlueprintNodeAt = (
  state: EditorState,
  title: string,
  category: string,
  x: number,
  y: number,
  options?: { autoConnectFromSelected?: boolean },
): EditorState => {
  const node: BlueprintNodeModel = {
    id: nextNodeId(state.blueprintNodes),
    title,
    x: Math.max(0, x),
    y: Math.max(0, y),
    color: getCategoryNodeColor(category),
  };

  const edgeFromSelection =
    options?.autoConnectFromSelected && state.selectedBlueprintNodeId
      ? {
          from: state.selectedBlueprintNodeId,
          to: node.id,
        }
      : null;

  const edgeAlreadyExists =
    edgeFromSelection &&
    state.blueprintEdges.some(
      (edge) =>
        edge.from === edgeFromSelection.from && edge.to === edgeFromSelection.to,
    );

  return appendLog(
    {
      ...state,
      blueprintNodes: [...state.blueprintNodes, node],
      blueprintEdges:
        edgeFromSelection && !edgeAlreadyExists
          ? [...state.blueprintEdges, edgeFromSelection]
          : state.blueprintEdges,
      selectedBlueprintNodeId: node.id,
      modified: true,
    },
    `Added blueprint node: ${node.title}`,
  );
};

export const moveBlueprintNode = (
  state: EditorState,
  nodeId: string,
  x: number,
  y: number,
): EditorState => {
  if (!state.blueprintNodes.some((node) => node.id === nodeId)) {
    return state;
  }
  return {
    ...state,
    blueprintNodes: state.blueprintNodes.map((node) =>
      node.id === nodeId ? { ...node, x: Math.max(0, x), y: Math.max(0, y) } : node,
    ),
    modified: true,
  };
};

export const connectBlueprintNodes = (
  state: EditorState,
  fromId: string,
  toId: string,
): EditorState => {
  if (!fromId || !toId || fromId === toId) {
    return state;
  }
  const hasFrom = state.blueprintNodes.some((node) => node.id === fromId);
  const hasTo = state.blueprintNodes.some((node) => node.id === toId);
  if (!hasFrom || !hasTo) {
    return state;
  }
  const exists = state.blueprintEdges.some(
    (edge) => edge.from === fromId && edge.to === toId,
  );
  if (exists) {
    return appendLog(state, `Connection already exists: ${fromId} -> ${toId}`);
  }
  return appendLog(
    {
      ...state,
      blueprintEdges: [...state.blueprintEdges, { from: fromId, to: toId }],
      modified: true,
    },
    `Connected ${fromId} -> ${toId}`,
  );
};

export const disconnectSelectedBlueprintNode = (state: EditorState): EditorState => {
  if (!state.selectedBlueprintNodeId) {
    return state;
  }
  const id = state.selectedBlueprintNodeId;
  const edgeCount = state.blueprintEdges.length;
  const filteredEdges = state.blueprintEdges.filter(
    (edge) => edge.from !== id && edge.to !== id,
  );
  if (filteredEdges.length === edgeCount) {
    return appendLog(state, `No links to disconnect for ${id}`);
  }
  return appendLog(
    {
      ...state,
      blueprintEdges: filteredEdges,
      modified: true,
    },
    `Disconnected links for ${id}`,
  );
};

export const duplicateSelectedBlueprintNode = (state: EditorState): EditorState => {
  if (!state.selectedBlueprintNodeId) {
    return state;
  }
  const source = state.blueprintNodes.find(
    (node) => node.id === state.selectedBlueprintNodeId,
  );
  if (!source) {
    return state;
  }
  const duplicate: BlueprintNodeModel = {
    ...source,
    id: nextNodeId(state.blueprintNodes),
    x: source.x + 36,
    y: source.y + 36,
  };
  return appendLog(
    {
      ...state,
      blueprintNodes: [...state.blueprintNodes, duplicate],
      selectedBlueprintNodeId: duplicate.id,
      modified: true,
    },
    `Duplicated node: ${source.title}`,
  );
};

export const snapBlueprintNodesToGrid = (
  state: EditorState,
  gridSize = 16,
): EditorState => {
  const snap = (v: number) => Math.round(v / gridSize) * gridSize;
  return appendLog(
    {
      ...state,
      blueprintNodes: state.blueprintNodes.map((node) => ({
        ...node,
        x: snap(node.x),
        y: snap(node.y),
      })),
      modified: true,
    },
    `Snapped blueprint nodes to ${gridSize}px grid`,
  );
};

export const autoLayoutBlueprintNodes = (state: EditorState): EditorState => {
  if (state.blueprintNodes.length === 0) {
    return state;
  }
  const lanes = 4;
  const spacingX = 220;
  const spacingY = 120;
  return appendLog(
    {
      ...state,
      blueprintNodes: state.blueprintNodes.map((node, idx) => ({
        ...node,
        x: 50 + Math.floor(idx / lanes) * spacingX,
        y: 40 + (idx % lanes) * spacingY,
      })),
      modified: true,
    },
    "Auto-arranged blueprint graph",
  );
};

export const clearBlueprintGraph = (state: EditorState): EditorState =>
  appendLog(
    {
      ...state,
      blueprintNodes: [],
      blueprintEdges: [],
      selectedBlueprintNodeId: null,
      modified: true,
    },
    "Cleared blueprint graph",
  );

export const renameSelectedBlueprintNode = (
  state: EditorState,
  title: string,
): EditorState => {
  if (!state.selectedBlueprintNodeId) {
    return state;
  }
  const trimmed = title.trim();
  if (!trimmed) {
    return state;
  }
  return appendLog(
    {
      ...state,
      blueprintNodes: state.blueprintNodes.map((node) =>
        node.id === state.selectedBlueprintNodeId ? { ...node, title: trimmed } : node,
      ),
      modified: true,
    },
    `Renamed node to: ${trimmed}`,
  );
};
