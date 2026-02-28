import { RPG_FEATURE_DEFINITIONS } from "app/rpg/features";
import {
  RPG_COLOR_PROFILES,
  RPG_ENGINE_SYSTEMS,
  RPG_MENU_TREE,
  RPG_PLUGIN_SYSTEM_TEMPLATES,
  RPG_PREMADE_SYSTEMS,
  RPG_SETTING_GROUPS,
  RPG_SETTINGS_PRESETS,
  RPG_TEMPLATE_LIBRARY,
  RPG_TOOL_REGISTRY,
} from "app/rpg/input";
import {
  blueprintNodeCatalog,
  unrealPanels,
  unrealToolbar,
  unrealTopMenus,
} from "./rpgGameMakerConfig";
import {
  editorThemes,
  leftSidebarLists,
  rightInspectorSections,
  statusActions,
  toolLinks,
  topBarQuickTools,
  workspacePresets,
} from "./rpgGameMakerAdvancedConfig";

type TemplateToolsByCategory = Record<string, string[]>;

export interface RpgWorkbenchLibraryBundle {
  shellMenus: typeof unrealTopMenus;
  shellToolbarGroups: typeof unrealToolbar;
  shellPanels: typeof unrealPanels;
  workspacePresets: typeof workspacePresets;
  quickTools: typeof topBarQuickTools;
  leftSidebarLists: typeof leftSidebarLists;
  inspectorSections: typeof rightInspectorSections;
  statusActions: typeof statusActions;
  rpgFeatures: typeof RPG_FEATURE_DEFINITIONS;
  rpgSystemMenus: typeof RPG_MENU_TREE;
  rpgTools: typeof RPG_TOOL_REGISTRY;
  toolsByCategory: TemplateToolsByCategory;
  engineSystems: typeof RPG_ENGINE_SYSTEMS;
  templateLibrary: typeof RPG_TEMPLATE_LIBRARY;
  premadeSystems: typeof RPG_PREMADE_SYSTEMS;
  pluginTemplates: typeof RPG_PLUGIN_SYSTEM_TEMPLATES;
  colorProfiles: typeof RPG_COLOR_PROFILES;
  settingGroups: typeof RPG_SETTING_GROUPS;
  settingPresets: typeof RPG_SETTINGS_PRESETS;
  blueprintNodeCatalog: typeof blueprintNodeCatalog;
  editorThemes: typeof editorThemes;
  toolLinks: typeof toolLinks;
  counts: {
    shellMenuCount: number;
    rpgMenuCount: number;
    toolCount: number;
    featureCount: number;
    engineSystemCount: number;
    templateCount: number;
    pluginTemplateCount: number;
    premadeSystemCount: number;
  };
}

export interface RpgWorkbenchTemplate {
  id: string;
  name: string;
  version: string;
  summary: string;
  starterState: {
    projectName: string;
    mapName: string;
    layerName: string;
    workspaceId: string;
    themeId: string;
    colorProfileId: string;
    settingsPresetId: string;
    enabledShellMenus: string[];
    enabledRpgMenus: string[];
    enabledTools: string[];
    starterBlueprintNodes: string[];
    starterAssets: string[];
    starterQuestList: string[];
  };
  libraries: RpgWorkbenchLibraryBundle;
}

const unique = (values: string[]): string[] => [...new Set(values)];

const toolsByCategory: TemplateToolsByCategory = RPG_TOOL_REGISTRY.reduce(
  (acc, tool) => {
    const key = tool.category;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(tool.label);
    return acc;
  },
  {} as TemplateToolsByCategory,
);

export const RPG_WORKBENCH_LIBRARIES: RpgWorkbenchLibraryBundle = {
  shellMenus: unrealTopMenus,
  shellToolbarGroups: unrealToolbar,
  shellPanels: unrealPanels,
  workspacePresets,
  quickTools: topBarQuickTools,
  leftSidebarLists,
  inspectorSections: rightInspectorSections,
  statusActions,
  rpgFeatures: RPG_FEATURE_DEFINITIONS,
  rpgSystemMenus: RPG_MENU_TREE,
  rpgTools: RPG_TOOL_REGISTRY,
  toolsByCategory,
  engineSystems: RPG_ENGINE_SYSTEMS,
  templateLibrary: RPG_TEMPLATE_LIBRARY,
  premadeSystems: RPG_PREMADE_SYSTEMS,
  pluginTemplates: RPG_PLUGIN_SYSTEM_TEMPLATES,
  colorProfiles: RPG_COLOR_PROFILES,
  settingGroups: RPG_SETTING_GROUPS,
  settingPresets: RPG_SETTINGS_PRESETS,
  blueprintNodeCatalog,
  editorThemes,
  toolLinks,
  counts: {
    shellMenuCount: unrealTopMenus.length,
    rpgMenuCount: RPG_MENU_TREE.length,
    toolCount: RPG_TOOL_REGISTRY.length,
    featureCount: RPG_FEATURE_DEFINITIONS.length,
    engineSystemCount: RPG_ENGINE_SYSTEMS.length,
    templateCount: RPG_TEMPLATE_LIBRARY.length,
    pluginTemplateCount: RPG_PLUGIN_SYSTEM_TEMPLATES.length,
    premadeSystemCount: RPG_PREMADE_SYSTEMS.length,
  },
};

const enabledShellMenus = unrealTopMenus.map((menu) => menu.label);
const enabledRpgMenus = RPG_MENU_TREE.map((menu) => menu.label);
const enabledTools = unique([
  ...unrealToolbar.flatMap((group) => group.actions),
  ...RPG_TOOL_REGISTRY.map((tool) => tool.label),
]);
const starterBlueprintNodes = unique(
  blueprintNodeCatalog.flatMap((group) => group.nodes.slice(0, 2)),
);
const starterAssets = unrealPanels.flatMap((panel) => panel.entries);
const starterQuestList =
  leftSidebarLists.find((entry) => entry.id === "quests")?.entries ?? [];

export const RPG_WORKBENCH_TEMPLATE: RpgWorkbenchTemplate = {
  id: "rpg-workbench-complete-template",
  name: "RPG Workbench Complete Template",
  version: "1.0.0",
  summary:
    "Starter template built from all currently registered RPG workbench menus, tools, and library datasets.",
  starterState: {
    projectName: "RPG_Workbench_Template_Project",
    mapName: "Start_Map",
    layerName: "FG",
    workspaceId: workspacePresets[0]?.id ?? "world-build",
    themeId: editorThemes[0]?.id ?? "midnight-steel",
    colorProfileId: RPG_COLOR_PROFILES[0]?.id ?? "crystal-cyan",
    settingsPresetId: RPG_SETTINGS_PRESETS[0]?.id ?? "balanced-default",
    enabledShellMenus,
    enabledRpgMenus,
    enabledTools,
    starterBlueprintNodes,
    starterAssets,
    starterQuestList,
  },
  libraries: RPG_WORKBENCH_LIBRARIES,
};

export const RPG_WORKBENCH_TEMPLATE_JSON = JSON.stringify(
  RPG_WORKBENCH_TEMPLATE,
  null,
  2,
);

export const createRpgWorkbenchTemplate = (): RpgWorkbenchTemplate =>
  JSON.parse(RPG_WORKBENCH_TEMPLATE_JSON) as RpgWorkbenchTemplate;
