import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  audioLibraryPacks,
  addBlueprintNodeFromCategory,
  addBlueprintNodeAt,
  autoLayoutBlueprintNodes,
  clearBlueprintGraph,
  connectBlueprintNodes,
  disconnectSelectedBlueprintNode,
  duplicateSelectedBlueprintNode,
  moveBlueprintNode,
  renameSelectedBlueprintNode,
  snapBlueprintNodesToGrid,
  type BlueprintNodeModel,
  connectSelectedToLatestNode,
  createInitialEditorState,
  executeRpgMenuFunction,
  openToolLink,
  removeSelectedBlueprintNode,
  runMenuCommand,
  runToolbarAction,
  setColorProfile,
  selectAsset,
  selectBlueprintNode,
  selectLeftSidebarEntry,
  selectOutlinerEntry,
  setEditorTheme,
  setSettingsPreset,
  setInspectorSection,
  setLeftSidebarList,
  setTopSearchQuery,
  setWorkspace,
  setToolCategory,
  triggerQuickTool,
} from "./rpgMakerEditorSystems";
import {
  blueprintNodeCatalog,
  linkedRPGEngineFunctions,
  linkedRPGEngineLogic,
  linkedRPGEngineLogicTools,
  linkedRPGFeatureCapabilities,
  linkedRPGFeatureNames,
  linkedRPGInputTools,
  linkedRPGMenuFunctions,
  linkedRPGPluginTemplates,
  linkedRPGPremadeSystems,
  linkedRPGSystemMenuDefinitions,
  linkedRPGSystemMenus,
  linkedRPGTemplateLibrary,
  linkedDnd5eAbilities,
  linkedDnd5eActionEconomy,
  linkedDnd5eClasses,
  linkedDnd5eConditions,
  linkedDnd5eDamageTypes,
  linkedDnd5eRuleNotes,
  linkedDnd5eSkills,
  linkedDnd5eSystemFields,
  linkedRpgColorProfiles,
  linkedRpgColorVariables,
  linkedRpgSettingsFunctions,
  linkedRpgSettingsGroups,
  linkedRpgSettingsLogic,
  linkedRpgSettingsOptions,
  linkedRpgSettingsPresets,
  linkedWolfmanAlphaProfiles,
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
import { RPG_COLOR_PROFILES, RPG_SETTINGS_PRESETS } from "app/rpg/input";
import {
  resolveEngineLogicAction,
  resolveFeatureAction,
  resolvePluginTemplateAction,
  resolvePremadeSystemAction,
  resolveTemplateAction,
} from "app/rpg/runtime";
import type { RPGSubMenuDefinition } from "app/rpg/systemMenus";
import API from "renderer/lib/api";

const panelStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateRows: "30px 1fr",
  background: "#1f2937",
  border: "1px solid #374151",
  borderRadius: 6,
  overflow: "hidden",
  minHeight: 0,
};

const panelHeaderStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 6,
  padding: "0 10px",
  fontSize: 12,
  fontWeight: 700,
  background: "#111827",
  borderBottom: "1px solid #374151",
};

const panelBodyStyle: React.CSSProperties = {
  overflow: "auto",
  padding: 10,
  fontSize: 12,
};

const buttonStyle: React.CSSProperties = {
  background: "#374151",
  color: "#e5e7eb",
  border: "1px solid #4b5563",
  borderRadius: 4,
  padding: "4px 8px",
  fontSize: 12,
  cursor: "pointer",
};

const listRowStyle: React.CSSProperties = {
  padding: "6px 8px",
  borderBottom: "1px solid #374151",
  cursor: "pointer",
};

const themeBackgrounds: Record<string, string> = {
  "midnight-steel": "#111827",
  "ocean-grid": "#0f2742",
  "ember-forge": "#2a1b16",
  "forest-terminal": "#15241a",
  sandstone: "#2b2520",
  "pixel-ice": "#1a2633",
  "mono-retro": "#1f1f1f",
  "studio-slate": "#222a36",
  "cobalt-night": "#101b38",
};

type FloatingWindow = {
  id: string;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  z: number;
  body: string;
};

type DragOffset = {
  x: number;
  y: number;
};

type ConnectionDrag = {
  fromId: string;
  toX: number;
  toY: number;
};

type SavedLayout = {
  blueprintNodes: BlueprintNodeModel[];
  blueprintEdges: { from: string; to: string }[];
  edgeReroutes?: Record<string, EdgeReroute>;
  floatingWindows: FloatingWindow[];
  activeThemeId: string;
  activeWorkspaceId: string;
  selectedLeftListId: string;
  selectedInspectorSectionId: string;
};

type MarqueeSelection = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
};

type EdgeReroute = {
  x: number;
  y: number;
};

type TerminalChannel = "ai" | "rpg" | "warn" | "error" | "system";

type TerminalEntry = {
  channel: TerminalChannel;
  text: string;
};

type SourceLanguage = "c" | "asm" | "txt";

type SourceIdeFile = {
  id: string;
  name: string;
  language: SourceLanguage;
  content: string;
  dirty: boolean;
  diagnostics: string[];
};

const initialFloatingWindows: FloatingWindow[] = [
  {
    id: "wnd-details",
    title: "Details",
    x: 24,
    y: 24,
    width: 260,
    height: 170,
    z: 2,
    body: "Selection inspector, exposed vars, and event parameters.",
  },
  {
    id: "wnd-widget-tree",
    title: "Widget Tree",
    x: 300,
    y: 28,
    width: 280,
    height: 180,
    z: 3,
    body: "HUD hierarchy, canvas slots, anchors, and runtime bindings.",
  },
];

const widgetTemplates = [
  {
    id: "widget-quest",
    title: "Quest Tracker Widget",
    body: "Quest step list, objective state, and map marker bindings.",
  },
  {
    id: "widget-combat",
    title: "Combat HUD Widget",
    body: "Turn order, target frame, action economy, and status effects.",
  },
  {
    id: "widget-dialogue",
    title: "Dialogue Widget",
    body: "Branch preview, response options, and speaker portrait slots.",
  },
];

const sourceExtByKind = {
  c: [".c", ".h"],
  asm: [".s", ".asm"],
};

const getFilename = (fullPath: string): string => {
  const parts = fullPath.split(/[\\/]/);
  return parts[parts.length - 1] || fullPath;
};

const getExt = (filename: string): string => {
  const idx = filename.lastIndexOf(".");
  return idx >= 0 ? filename.slice(idx).toLowerCase() : "";
};

const parseCFunctions = (source: string): string[] => {
  const regex = /^\s*(?:[A-Za-z_]\w*[\w\s*]*?)\s+([A-Za-z_]\w*)\s*\([^;]*\)\s*\{/gm;
  const matches: string[] = [];
  let match: RegExpExecArray | null;
  while ((match = regex.exec(source))) {
    matches.push(match[1]);
    if (matches.length >= 24) break;
  }
  return matches;
};

const parseAsmLabels = (source: string): string[] => {
  const regex = /^\s*([A-Za-z_.$][\w.$@]*):/gm;
  const matches: string[] = [];
  let match: RegExpExecArray | null;
  while ((match = regex.exec(source))) {
    matches.push(match[1]);
    if (matches.length >= 24) break;
  }
  return matches;
};

const classifyTerminalLine = (line: string): TerminalChannel => {
  const normalized = line.toLowerCase();
  if (normalized.includes("[ai]")) return "ai";
  if (normalized.includes("[warn]")) return "warn";
  if (normalized.includes("[error]")) return "error";
  if (normalized.includes("[wolfmanalpha/") || normalized.includes("[rpg]")) {
    return "rpg";
  }
  return "system";
};

const inferSourceLanguage = (filename: string): SourceLanguage => {
  const ext = getExt(filename);
  if (ext === ".c" || ext === ".h") return "c";
  if (ext === ".s" || ext === ".asm") return "asm";
  return "txt";
};

const sourceDiagnostics = (source: string, language: SourceLanguage): string[] => {
  const diagnostics: string[] = [];
  const lines = source.split(/\r?\n/);
  const longLineIndex = lines.findIndex((line) => line.length > 120);
  if (longLineIndex >= 0) {
    diagnostics.push(`Line ${longLineIndex + 1}: line length exceeds 120 chars`);
  }
  if (language === "c") {
    const openBraces = (source.match(/{/g) || []).length;
    const closeBraces = (source.match(/}/g) || []).length;
    if (openBraces !== closeBraces) {
      diagnostics.push("Brace mismatch detected in C source");
    }
    if (!source.includes("main(") && !source.includes("script_")) {
      diagnostics.push("No main/script entry function found");
    }
  }
  if (language === "asm") {
    if (!/^\s*[A-Za-z_.$][\w.$@]*:/m.test(source)) {
      diagnostics.push("No labels found in ASM source");
    }
  }
  if (diagnostics.length === 0) {
    diagnostics.push("No diagnostics");
  }
  return diagnostics;
};

export const RPGGameMakerUILayout: React.FC = () => {
  const [state, setState] = useState(createInitialEditorState);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [floatingWindows, setFloatingWindows] = useState<FloatingWindow[]>(
    initialFloatingWindows,
  );
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const [draggingNodeIds, setDraggingNodeIds] = useState<string[] | null>(null);
  const [draggingWindowId, setDraggingWindowId] = useState<string | null>(null);
  const [draggingEdgeId, setDraggingEdgeId] = useState<string | null>(null);
  const [connectionDrag, setConnectionDrag] = useState<ConnectionDrag | null>(null);
  const [selectedNodeIds, setSelectedNodeIds] = useState<string[]>([]);
  const [marqueeSelection, setMarqueeSelection] = useState<MarqueeSelection | null>(
    null,
  );
  const [edgeReroutes, setEdgeReroutes] = useState<Record<string, EdgeReroute>>({});
  const [terminalFilter, setTerminalFilter] = useState<TerminalChannel | "all">("all");
  const [pendingNodeTitle, setPendingNodeTitle] = useState("");
  const [dragOffset, setDragOffset] = useState<DragOffset>({ x: 0, y: 0 });
  const [sourceFiles, setSourceFiles] = useState<SourceIdeFile[]>([
    {
      id: "source-sample-main",
      name: "script_main.c",
      language: "c",
      content:
        "void script_main(void) {\n  // Entry script for RPG event runtime\n}\n",
      dirty: false,
      diagnostics: ["No diagnostics"],
    },
  ]);
  const [activeSourceFileId, setActiveSourceFileId] = useState("source-sample-main");
  const [sourceSearch, setSourceSearch] = useState("");
  const [sourceReplace, setSourceReplace] = useState("");
  const blueprintCanvasRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const topMenuBarRef = useRef<HTMLDivElement | null>(null);
  const selectedColorProfile = useMemo(
    () =>
      RPG_COLOR_PROFILES.find((profile) => profile.id === state.activeColorProfileId),
    [state.activeColorProfileId],
  );
  const selectedSettingsPreset = useMemo(
    () =>
      RPG_SETTINGS_PRESETS.find((preset) => preset.id === state.activeSettingsPresetId),
    [state.activeSettingsPresetId],
  );
  const activeThemeBg =
    selectedColorProfile?.colors.background ??
    themeBackgrounds[state.activeThemeId] ??
    "#111827";

  const nodeById = useMemo(() => {
    const map = new Map<string, BlueprintNodeModel>();
    state.blueprintNodes.forEach((node) => map.set(node.id, node));
    return map;
  }, [state.blueprintNodes]);

  const quickToolsByGroup = useMemo(() => {
    return topBarQuickTools.reduce<Record<string, typeof topBarQuickTools>>(
      (acc, tool) => {
        acc[tool.group] = [...(acc[tool.group] ?? []), tool];
        return acc;
      },
      {},
    );
  }, []);

  const leftList = useMemo(
    () => leftSidebarLists.find((list) => list.id === state.selectedLeftListId),
    [state.selectedLeftListId],
  );

  const inspectorSection = useMemo(
    () =>
      rightInspectorSections.find(
        (section) => section.id === state.selectedInspectorSectionId,
      ),
    [state.selectedInspectorSectionId],
  );

  const normalizedSearch = state.topSearchQuery.trim().toLowerCase();

  const filteredAssets = useMemo(() => {
    if (!normalizedSearch) {
      return state.assets;
    }
    return state.assets.filter((asset) =>
      `${asset.name} ${asset.type}`.toLowerCase().includes(normalizedSearch),
    );
  }, [normalizedSearch, state.assets]);

  const filteredOutliner = useMemo(() => {
    if (!normalizedSearch) {
      return state.outliner;
    }
    return state.outliner.filter((entry) =>
      entry.toLowerCase().includes(normalizedSearch),
    );
  }, [normalizedSearch, state.outliner]);

  const filteredLeftEntries = useMemo(() => {
    if (!leftList) {
      return [];
    }
    if (!normalizedSearch) {
      return leftList.entries;
    }
    return leftList.entries.filter((entry) =>
      entry.toLowerCase().includes(normalizedSearch),
    );
  }, [leftList, normalizedSearch]);

  const layoutStorageKey = useMemo(
    () => `rpg-maker-layout:${state.projectName}`,
    [state.projectName],
  );

  const flatRpgSubMenus = useMemo(
    () =>
      linkedRPGSystemMenuDefinitions.flatMap((menu) =>
        menu.subMenus.map((subMenu) => ({
          menuLabel: menu.label,
          ...subMenu,
        })),
      ),
    [],
  );

  const edgeKey = useCallback((fromId: string, toId: string) => `${fromId}->${toId}`, []);

  const terminalEntries = useMemo(() => {
    const entries: TerminalEntry[] = state.outputLog.map((line) => ({
      channel: classifyTerminalLine(line),
      text: line,
    }));
    if (terminalFilter === "all") {
      return entries;
    }
    return entries.filter((entry) => entry.channel === terminalFilter);
  }, [state.outputLog, terminalFilter]);

  const activeSourceFile = useMemo(
    () => sourceFiles.find((entry) => entry.id === activeSourceFileId) || null,
    [activeSourceFileId, sourceFiles],
  );

  const toNodeRect = useCallback((node: BlueprintNodeModel) => {
    return {
      left: node.x,
      top: node.y,
      right: node.x + 170,
      bottom: node.y + 54,
    };
  }, []);

  const marqueeBounds = useMemo(() => {
    if (!marqueeSelection) {
      return null;
    }
    const left = Math.min(marqueeSelection.startX, marqueeSelection.endX);
    const right = Math.max(marqueeSelection.startX, marqueeSelection.endX);
    const top = Math.min(marqueeSelection.startY, marqueeSelection.endY);
    const bottom = Math.max(marqueeSelection.startY, marqueeSelection.endY);
    return { left, right, top, bottom };
  }, [marqueeSelection]);

  React.useEffect(() => {
    const selected = state.blueprintNodes.find(
      (entry) => entry.id === state.selectedBlueprintNodeId,
    );
    setPendingNodeTitle(selected?.title ?? "");
  }, [state.blueprintNodes, state.selectedBlueprintNodeId]);

  React.useEffect(() => {
    if (state.selectedBlueprintNodeId) {
      setSelectedNodeIds([state.selectedBlueprintNodeId]);
    }
  }, [state.selectedBlueprintNodeId]);

  const appendLog = useCallback((message: string) => {
    setState((prev) => ({
      ...prev,
      outputLog: [...prev.outputLog.slice(-59), message],
    }));
  }, []);

  const applySafeStateUpdate = useCallback(
    (label: string, updater: (prev: ReturnType<typeof createInitialEditorState>) => ReturnType<typeof createInitialEditorState>) => {
      setState((prev) => {
        try {
          return updater(prev);
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          return {
            ...prev,
            outputLog: [...prev.outputLog.slice(-59), `[ERROR] ${label}: ${message}`],
          };
        }
      });
    },
    [],
  );

  const openSourceInIde = useCallback(
    (filename: string, content: string) => {
      const language = inferSourceLanguage(filename);
      const fileId = `source:${filename}`;
      const diagnostics = sourceDiagnostics(content, language);
      setSourceFiles((prev) => {
        const existing = prev.find((entry) => entry.id === fileId);
        if (existing) {
          return prev.map((entry) =>
            entry.id === fileId
              ? { ...entry, content, dirty: false, diagnostics }
              : entry,
          );
        }
        return [
          ...prev,
          {
            id: fileId,
            name: filename,
            language,
            content,
            dirty: false,
            diagnostics,
          },
        ];
      });
      setActiveSourceFileId(fileId);
      appendLog(`[IDE] Opened source file: ${filename}`);
    },
    [appendLog],
  );

  const runSourceDiagnostics = useCallback(() => {
    if (!activeSourceFile) return;
    const diagnostics = sourceDiagnostics(
      activeSourceFile.content,
      activeSourceFile.language,
    );
    setSourceFiles((prev) =>
      prev.map((entry) =>
        entry.id === activeSourceFile.id ? { ...entry, diagnostics } : entry,
      ),
    );
    appendLog(
      diagnostics[0] === "No diagnostics"
        ? `[IDE] Build check passed: ${activeSourceFile.name}`
        : `[WARN] ${activeSourceFile.name}: ${diagnostics.join("; ")}`,
    );
  }, [activeSourceFile, appendLog]);

  const applySourceReplace = useCallback(() => {
    if (!activeSourceFile || !sourceSearch) return;
    const replaced = activeSourceFile.content.split(sourceSearch).join(sourceReplace);
    if (replaced === activeSourceFile.content) {
      appendLog(`[IDE] No matches for '${sourceSearch}'`);
      return;
    }
    setSourceFiles((prev) =>
      prev.map((entry) =>
        entry.id === activeSourceFile.id
          ? { ...entry, content: replaced, dirty: true }
          : entry,
      ),
    );
    appendLog(
      `[IDE] Replaced '${sourceSearch}' with '${sourceReplace}' in ${activeSourceFile.name}`,
    );
  }, [activeSourceFile, appendLog, sourceReplace, sourceSearch]);

  const runRpgSubMenuAction = useCallback(
    (subMenu: RPGSubMenuDefinition, actionLabel: string, functionName: string) => {
      if (!functionName || !functionName.trim()) {
        appendLog(
          `[ERROR] Missing RPG action function for ${subMenu.label}: ${actionLabel}`,
        );
        return;
      }
      applySafeStateUpdate(
        `RPG submenu ${subMenu.label}: ${actionLabel}`,
        (prev) =>
          executeRpgMenuFunction(
            prev,
            functionName,
            `${subMenu.label}: ${actionLabel}`,
          ),
      );
    },
    [appendLog, applySafeStateUpdate],
  );

  const activateRpgTool = useCallback(
    (toolLabel: string, source: string) => {
      const normalized = toolLabel.trim();
      if (!normalized) {
        appendLog(`[ERROR] ${source}: missing tool label`);
        return;
      }
      applySafeStateUpdate(`${source}: ${normalized}`, (prev) => ({
        ...prev,
        activeTool: normalized,
        modified: true,
      }));
      appendLog(`[RPG] ${source}: ${normalized}`);
    },
    [appendLog, applySafeStateUpdate],
  );

  const executeFunctionListEntry = useCallback(
    (entry: string, source: string) => {
      const functionName = entry.includes(":")
        ? entry.slice(entry.lastIndexOf(":") + 1).trim()
        : entry.trim();
      if (!functionName) {
        appendLog(`[ERROR] ${source}: invalid function entry`);
        return;
      }
      applySafeStateUpdate(source, (prev) =>
        executeRpgMenuFunction(prev, functionName, source),
      );
    },
    [appendLog, applySafeStateUpdate],
  );

  const runEngineLogicEntry = useCallback(
    (summary: string) => {
      const action = resolveEngineLogicAction(summary);
      if (!action) {
        appendLog(`[WARN] Engine logic not linked: ${summary}`);
        return;
      }
      if (action.toolLabel) {
        activateRpgTool(action.toolLabel, action.source);
      }
      if (action.functionName) {
        applySafeStateUpdate(action.source, (prev) =>
          executeRpgMenuFunction(prev, action.functionName, action.source),
        );
      }
      appendLog(`[RPG] ${action.message || `Engine logic opened: ${summary}`}`);
    },
    [activateRpgTool, appendLog, applySafeStateUpdate],
  );

  const openPremadeSystem = useCallback(
    (label: string) => {
      const action = resolvePremadeSystemAction(label);
      if (!action) {
        appendLog(`[WARN] Premade system not linked: ${label}`);
        return;
      }
      if (action.toolLabel) {
        activateRpgTool(action.toolLabel, action.source);
      }
      appendLog(`[RPG] ${action.message || `Premade system loaded: ${label}`}`);
    },
    [activateRpgTool, appendLog],
  );

  const openTemplateLibraryItem = useCallback(
    (label: string) => {
      const action = resolveTemplateAction(label);
      if (!action) {
        appendLog(`[WARN] Template not linked: ${label}`);
        return;
      }
      if (action.toolLabel) {
        activateRpgTool(action.toolLabel, action.source);
      }
      appendLog(`[RPG] ${action.message || `Template opened: ${label}`}`);
    },
    [activateRpgTool, appendLog],
  );

  const openPluginTemplateItem = useCallback(
    (label: string) => {
      const action = resolvePluginTemplateAction(label);
      if (!action) {
        appendLog(`[WARN] Plugin template not linked: ${label}`);
        return;
      }
      if (action.toolLabel) {
        activateRpgTool(action.toolLabel, action.source);
      }
      if (action.functionName) {
        applySafeStateUpdate(action.source, (prev) =>
          executeRpgMenuFunction(prev, action.functionName, action.source),
        );
      }
      appendLog(`[RPG] ${action.message || `Plugin template opened: ${label}`}`);
    },
    [activateRpgTool, appendLog, applySafeStateUpdate],
  );

  const saveLayout = useCallback(() => {
    const payload: SavedLayout = {
      blueprintNodes: state.blueprintNodes,
      blueprintEdges: state.blueprintEdges,
      edgeReroutes,
      floatingWindows,
      activeThemeId: state.activeThemeId,
      activeWorkspaceId: state.activeWorkspaceId,
      selectedLeftListId: state.selectedLeftListId,
      selectedInspectorSectionId: state.selectedInspectorSectionId,
    };
    try {
      localStorage.setItem(layoutStorageKey, JSON.stringify(payload));
      appendLog("Layout saved");
    } catch (_e) {
      appendLog("Failed to save layout");
    }
  }, [appendLog, edgeReroutes, floatingWindows, layoutStorageKey, state]);

  const loadLayout = useCallback(() => {
    try {
      const raw = localStorage.getItem(layoutStorageKey);
      if (!raw) {
        appendLog("No saved layout found for this project");
        return;
      }
      const parsed = JSON.parse(raw) as SavedLayout;
      setEdgeReroutes(parsed.edgeReroutes || {});
      setFloatingWindows(Array.isArray(parsed.floatingWindows) ? parsed.floatingWindows : initialFloatingWindows);
      setSelectedNodeIds([]);
      setState((prev) => ({
        ...prev,
        blueprintNodes: Array.isArray(parsed.blueprintNodes) ? parsed.blueprintNodes : prev.blueprintNodes,
        blueprintEdges: Array.isArray(parsed.blueprintEdges) ? parsed.blueprintEdges : prev.blueprintEdges,
        activeThemeId: parsed.activeThemeId || prev.activeThemeId,
        activeWorkspaceId: parsed.activeWorkspaceId || prev.activeWorkspaceId,
        selectedLeftListId: parsed.selectedLeftListId || prev.selectedLeftListId,
        selectedInspectorSectionId:
          parsed.selectedInspectorSectionId || prev.selectedInspectorSectionId,
      }));
      appendLog("Layout loaded");
    } catch (_e) {
      appendLog("Failed to load layout");
    }
  }, [appendLog, layoutStorageKey]);

  const resetLayout = useCallback(() => {
    const initial = createInitialEditorState();
    setFloatingWindows(initialFloatingWindows);
    setEdgeReroutes({});
    setSelectedNodeIds([]);
    setConnectionDrag(null);
    setState((prev) => ({
      ...prev,
      blueprintNodes: initial.blueprintNodes,
      blueprintEdges: initial.blueprintEdges,
      selectedBlueprintNodeId: null,
    }));
    appendLog("Layout reset to default");
  }, [appendLog]);

  const handleMenuCommand = useCallback(
    (menuLabel: string, item: string) => {
      if (item === "Save Layout") {
        saveLayout();
      } else if (item === "Load Layout") {
        loadLayout();
      } else if (item === "Reset Layout") {
        resetLayout();
      } else if (item === "C Script Editor") {
        openSourceInIde(
          "script_main.c",
          "void script_main(void) {\n  // TODO: Add RPG event script\n}\n",
        );
        applySafeStateUpdate(`Menu ${menuLabel}: ${item}`, (prev) =>
          runMenuCommand(prev, menuLabel, item),
        );
      } else if (item === "Compile C Scripts") {
        runSourceDiagnostics();
        applySafeStateUpdate(`Menu ${menuLabel}: ${item}`, (prev) =>
          runMenuCommand(prev, menuLabel, item),
        );
      } else {
        applySafeStateUpdate(`Menu ${menuLabel}: ${item}`, (prev) =>
          runMenuCommand(prev, menuLabel, item),
        );
      }
      setOpenMenu(null);
    },
    [
      applySafeStateUpdate,
      loadLayout,
      openSourceInIde,
      resetLayout,
      runSourceDiagnostics,
      saveLayout,
    ],
  );

  const importSourceProgram = useCallback(
    async (kind: "c" | "asm") => {
      const path = await API.dialog.chooseFile();
      if (!path) {
        return;
      }
      const filename = getFilename(path);
      const ext = getExt(filename);
      const validExt = sourceExtByKind[kind];
      if (!validExt.includes(ext)) {
        appendLog(
          `Skipped import: expected ${validExt.join(", ")} but got ${ext || "unknown"}`,
        );
        return;
      }

      let source = "";
      try {
        source = await API.app.readTextFile(path);
      } catch (_e) {
        appendLog(`Failed to read source file: ${filename}`);
        return;
      }

      const symbols =
        kind === "c" ? parseCFunctions(source) : parseAsmLabels(source);
      openSourceInIde(filename, source);

      setState((prev) => {
        let next = prev;
        const baseX = 120 + ((prev.blueprintNodes.length * 35) % 300);
        const baseY = 140 + ((prev.blueprintNodes.length * 25) % 220);
        next = addBlueprintNodeAt(
          next,
          kind === "c" ? `C Source: ${filename}` : `ASM Source: ${filename}`,
          "Native C",
          baseX,
          baseY,
          { autoConnectFromSelected: true },
        );

        symbols.forEach((symbol, index) => {
          next = addBlueprintNodeAt(
            next,
            `${kind === "c" ? "fn" : "label"}: ${symbol}`,
            "Native C",
            baseX + 220 + Math.floor(index / 6) * 220,
            baseY + (index % 6) * 92,
            { autoConnectFromSelected: index === 0 },
          );
        });

        const assetId = `src_${Date.now().toString(36)}_${Math.random()
          .toString(36)
          .slice(2, 8)}`;
        return {
          ...next,
          assets: [
            ...next.assets,
            {
              id: assetId,
              name: filename,
              type: "Blueprints",
            },
          ],
          modified: true,
          outputLog: [
            ...next.outputLog.slice(-59),
            `Imported ${kind.toUpperCase()} source: ${filename} (${symbols.length} symbols)`,
          ],
        };
      });

      const preview = source.slice(0, 2800);
      setFloatingWindows((prev) => {
        const z = prev.reduce((maxZ, w) => Math.max(maxZ, w.z), 0) + 1;
        return [
          ...prev.filter((entry) => entry.id !== `source:${filename}`),
          {
            id: `source:${filename}`,
            title: `${kind.toUpperCase()} Source Preview`,
            x: 80,
            y: 80,
            width: 520,
            height: 280,
            z,
            body: `${filename}\n\n${preview}${source.length > preview.length ? "\n\n...truncated..." : ""}`,
          },
        ];
      });
    },
    [appendLog, openSourceInIde],
  );

  const getNextWindowZ = useCallback(
    () => floatingWindows.reduce((maxZ, w) => Math.max(maxZ, w.z), 0) + 1,
    [floatingWindows],
  );

  const onDragBlueprintNodeTemplate = useCallback(
    (nodeTitle: string, category: string) => (event: React.DragEvent<HTMLDivElement>) => {
      event.dataTransfer.setData(
        "application/x-rpg-blueprint-node",
        JSON.stringify({ nodeTitle, category }),
      );
      event.dataTransfer.effectAllowed = "copy";
    },
    [],
  );

  const onDropBlueprintNodeTemplate = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const raw = event.dataTransfer.getData("application/x-rpg-blueprint-node");
      if (!raw) {
        return;
      }
      let nodeTitle = "Node";
      let category = "Events";
      try {
        const parsed = JSON.parse(raw) as { nodeTitle?: string; category?: string };
        nodeTitle = parsed.nodeTitle || nodeTitle;
        category = parsed.category || category;
      } catch (_e) {
        return;
      }
      const canvasRect = blueprintCanvasRef.current?.getBoundingClientRect();
      const x = canvasRect ? event.clientX - canvasRect.left - 85 : 50;
      const y = canvasRect ? event.clientY - canvasRect.top - 15 : 50;
      setState((prev) =>
        addBlueprintNodeAt(
          prev,
          nodeTitle,
          category,
          x,
          y,
          { autoConnectFromSelected: true },
        ),
      );
    },
    [],
  );

  const onMouseDownBlueprintNode = useCallback(
    (nodeId: string) => (event: React.MouseEvent<HTMLDivElement>) => {
      const node = state.blueprintNodes.find((entry) => entry.id === nodeId);
      if (!node) return;
      const isMultiSelectToggle = event.ctrlKey || event.metaKey;
      const isGroupDragCandidate =
        selectedNodeIds.length > 1 && selectedNodeIds.includes(nodeId);
      if (isMultiSelectToggle) {
        event.stopPropagation();
        setSelectedNodeIds((prev) =>
          prev.includes(nodeId)
            ? prev.filter((id) => id !== nodeId)
            : [...prev, nodeId],
        );
        setState((prev) => selectBlueprintNode(prev, nodeId));
        return;
      }
      setDraggingNodeId(nodeId);
      setDraggingNodeIds(isGroupDragCandidate ? selectedNodeIds : [nodeId]);
      setDragOffset({
        x: event.clientX - node.x,
        y: event.clientY - node.y,
      });
      setState((prev) => selectBlueprintNode(prev, nodeId));
    },
    [selectedNodeIds, state.blueprintNodes],
  );

  const onMouseDownBlueprintCanvas = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const canvas = blueprintCanvasRef.current;
      if (!canvas) return;
      if ((event.target as HTMLElement).closest("[data-blueprint-node='true']")) {
        return;
      }
      const rect = canvas.getBoundingClientRect();
      const x = Math.max(0, event.clientX - rect.left);
      const y = Math.max(0, event.clientY - rect.top);
      setMarqueeSelection({
        startX: x,
        startY: y,
        endX: x,
        endY: y,
      });
      setSelectedNodeIds([]);
      setState((prev) => ({ ...prev, selectedBlueprintNodeId: null }));
    },
    [],
  );

  const onMouseDownEdgeHandle = useCallback(
    (fromId: string, toId: string) => (event: React.MouseEvent<SVGCircleElement>) => {
      event.stopPropagation();
      setDraggingEdgeId(edgeKey(fromId, toId));
    },
    [edgeKey],
  );

  const onMouseDownOutputPin = useCallback(
    (nodeId: string) => (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      const node = state.blueprintNodes.find((entry) => entry.id === nodeId);
      if (!node) return;
      setConnectionDrag({
        fromId: nodeId,
        toX: node.x + 170,
        toY: node.y + 25,
      });
      setState((prev) => selectBlueprintNode(prev, nodeId));
    },
    [state.blueprintNodes],
  );

  const onMouseUpInputPin = useCallback(
    (nodeId: string) => (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      if (!connectionDrag || connectionDrag.fromId === nodeId) {
        return;
      }
      setState((prev) =>
        connectBlueprintNodes(prev, connectionDrag.fromId, nodeId),
      );
      setConnectionDrag(null);
    },
    [connectionDrag],
  );

  const onMouseDownWindowHeader = useCallback(
    (windowId: string) => (event: React.MouseEvent<HTMLDivElement>) => {
      const targetWindow = floatingWindows.find((entry) => entry.id === windowId);
      if (!targetWindow) return;
      setDraggingWindowId(windowId);
      setDragOffset({
        x: event.clientX - targetWindow.x,
        y: event.clientY - targetWindow.y,
      });
      const z = getNextWindowZ();
      setFloatingWindows((prev) =>
        prev.map((entry) => (entry.id === windowId ? { ...entry, z } : entry)),
      );
    },
    [floatingWindows, getNextWindowZ],
  );

  const closeFloatingWindow = useCallback((windowId: string) => {
    setFloatingWindows((prev) => prev.filter((entry) => entry.id !== windowId));
    appendLog(`Closed widget window: ${windowId}`);
  }, [appendLog]);

  const openWidgetWindow = useCallback(
    (templateId: string, x = 80, y = 80) => {
      const template = widgetTemplates.find((entry) => entry.id === templateId);
      if (!template) return;
      const existing = floatingWindows.find((entry) => entry.id === templateId);
      if (existing) {
        const z = getNextWindowZ();
        setFloatingWindows((prev) =>
          prev.map((entry) =>
            entry.id === templateId ? { ...entry, x, y, z } : entry,
          ),
        );
        appendLog(`Focused widget window: ${template.title}`);
        return;
      }
      const z = getNextWindowZ();
      setFloatingWindows((prev) => [
        ...prev,
        {
          id: template.id,
          title: template.title,
          x,
          y,
          width: 300,
          height: 190,
          body: template.body,
          z,
        },
      ]);
      appendLog(`Opened widget window: ${template.title}`);
    },
    [appendLog, floatingWindows, getNextWindowZ],
  );

  const onDragWidgetTemplate = useCallback(
    (templateId: string) => (event: React.DragEvent<HTMLDivElement>) => {
      event.dataTransfer.setData("application/x-rpg-widget-template", templateId);
      event.dataTransfer.effectAllowed = "copy";
    },
    [],
  );

  const onDropWidgetTemplate = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const templateId = event.dataTransfer.getData("application/x-rpg-widget-template");
      if (!templateId) return;
      const viewportRect = viewportRef.current?.getBoundingClientRect();
      const x = viewportRect ? event.clientX - viewportRect.left - 60 : 100;
      const y = viewportRect ? event.clientY - viewportRect.top - 20 : 100;
      openWidgetWindow(templateId, Math.max(0, x), Math.max(0, y));
    },
    [openWidgetWindow],
  );

  const onGlobalMouseMove = useCallback(
    (event: MouseEvent) => {
      if (marqueeSelection) {
        const canvasRect = blueprintCanvasRef.current?.getBoundingClientRect();
        if (!canvasRect) return;
        const endX = Math.max(0, event.clientX - canvasRect.left);
        const endY = Math.max(0, event.clientY - canvasRect.top);
        setMarqueeSelection((prev) =>
          prev ? { ...prev, endX, endY } : prev,
        );
      } else if (draggingNodeId) {
        const canvasRect = blueprintCanvasRef.current?.getBoundingClientRect();
        if (!canvasRect) return;
        const x = Math.max(0, event.clientX - canvasRect.left - dragOffset.x);
        const y = Math.max(0, event.clientY - canvasRect.top - dragOffset.y);
        setState((prev) => {
          const anchor = prev.blueprintNodes.find((node) => node.id === draggingNodeId);
          if (!anchor) return prev;
          const deltaX = x - anchor.x;
          const deltaY = y - anchor.y;
          const ids = draggingNodeIds && draggingNodeIds.length > 0 ? draggingNodeIds : [draggingNodeId];
          let next = prev;
          ids.forEach((id) => {
            const source = next.blueprintNodes.find((node) => node.id === id);
            if (!source) return;
            next = moveBlueprintNode(next, id, source.x + deltaX, source.y + deltaY);
          });
          return next;
        });
      } else if (draggingWindowId) {
        const viewportRect = viewportRef.current?.getBoundingClientRect();
        if (!viewportRect) return;
        const x = Math.max(0, event.clientX - viewportRect.left - dragOffset.x);
        const y = Math.max(0, event.clientY - viewportRect.top - dragOffset.y);
        setFloatingWindows((prev) =>
          prev.map((entry) =>
            entry.id === draggingWindowId ? { ...entry, x, y } : entry,
          ),
        );
      } else if (connectionDrag) {
        const canvasRect = blueprintCanvasRef.current?.getBoundingClientRect();
        if (!canvasRect) return;
        const toX = Math.max(0, event.clientX - canvasRect.left);
        const toY = Math.max(0, event.clientY - canvasRect.top);
        setConnectionDrag((prev) =>
          prev ? { ...prev, toX, toY } : prev,
        );
      } else if (draggingEdgeId) {
        const canvasRect = blueprintCanvasRef.current?.getBoundingClientRect();
        if (!canvasRect) return;
        const x = Math.max(0, event.clientX - canvasRect.left);
        const y = Math.max(0, event.clientY - canvasRect.top);
        setEdgeReroutes((prev) => ({ ...prev, [draggingEdgeId]: { x, y } }));
      }
    },
    [
      connectionDrag,
      dragOffset.x,
      dragOffset.y,
      draggingEdgeId,
      draggingNodeId,
      draggingNodeIds,
      draggingWindowId,
      marqueeSelection,
    ],
  );

  const onGlobalMouseUp = useCallback(() => {
    if (marqueeSelection && marqueeBounds) {
      const inside = state.blueprintNodes
        .filter((node) => {
          const rect = toNodeRect(node);
          return (
            rect.left >= marqueeBounds.left &&
            rect.right <= marqueeBounds.right &&
            rect.top >= marqueeBounds.top &&
            rect.bottom <= marqueeBounds.bottom
          );
        })
        .map((node) => node.id);
      setSelectedNodeIds(inside);
      setState((prev) => ({
        ...prev,
        selectedBlueprintNodeId: inside[0] || null,
      }));
      setMarqueeSelection(null);
    }
    if (draggingNodeId) {
      appendLog(`Moved blueprint node: ${draggingNodeId}`);
      setDraggingNodeId(null);
      setDraggingNodeIds(null);
    }
    if (draggingWindowId) {
      appendLog(`Moved widget window: ${draggingWindowId}`);
      setDraggingWindowId(null);
    }
    if (draggingEdgeId) {
      setDraggingEdgeId(null);
    }
    if (connectionDrag) {
      setConnectionDrag(null);
    }
  }, [
    appendLog,
    connectionDrag,
    draggingEdgeId,
    draggingNodeId,
    draggingWindowId,
    marqueeBounds,
    marqueeSelection,
    state.blueprintNodes,
    toNodeRect,
  ]);

  React.useEffect(() => {
    if (
      !draggingNodeId &&
      !draggingWindowId &&
      !connectionDrag &&
      !draggingEdgeId &&
      !marqueeSelection
    ) {
      return;
    }
    window.addEventListener("mousemove", onGlobalMouseMove);
    window.addEventListener("mouseup", onGlobalMouseUp);
    return () => {
      window.removeEventListener("mousemove", onGlobalMouseMove);
      window.removeEventListener("mouseup", onGlobalMouseUp);
    };
  }, [
    connectionDrag,
    draggingEdgeId,
    draggingNodeId,
    draggingWindowId,
    marqueeSelection,
    onGlobalMouseMove,
    onGlobalMouseUp,
  ]);

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const isMeta = event.ctrlKey || event.metaKey;
      if (!isMeta) {
        if (event.key === "Delete") {
          setState((prev) => removeSelectedBlueprintNode(prev));
        }
        return;
      }
      if (event.key.toLowerCase() === "d") {
        event.preventDefault();
        setState((prev) => duplicateSelectedBlueprintNode(prev));
      } else if (event.key.toLowerCase() === "l") {
        event.preventDefault();
        setState((prev) => autoLayoutBlueprintNodes(prev));
      } else if (event.key.toLowerCase() === "g") {
        event.preventDefault();
        setState((prev) => snapBlueprintNodesToGrid(prev, 16));
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  React.useEffect(() => {
    loadLayout();
  }, [loadLayout]);

  React.useEffect(() => {
    try {
      const payload: SavedLayout = {
        blueprintNodes: state.blueprintNodes,
        blueprintEdges: state.blueprintEdges,
        edgeReroutes,
        floatingWindows,
        activeThemeId: state.activeThemeId,
        activeWorkspaceId: state.activeWorkspaceId,
        selectedLeftListId: state.selectedLeftListId,
        selectedInspectorSectionId: state.selectedInspectorSectionId,
      };
      localStorage.setItem(layoutStorageKey, JSON.stringify(payload));
    } catch (_e) {
      // ignore persistence errors
    }
  }, [
    edgeReroutes,
    floatingWindows,
    layoutStorageKey,
    state.activeThemeId,
    state.activeWorkspaceId,
    state.blueprintEdges,
    state.blueprintNodes,
    state.selectedInspectorSectionId,
    state.selectedLeftListId,
  ]);

  React.useEffect(() => {
    const valid = new Set(
      state.blueprintEdges.map((edge) => edgeKey(edge.from, edge.to)),
    );
    setEdgeReroutes((prev) => {
      const next: Record<string, EdgeReroute> = {};
      Object.entries(prev).forEach(([key, value]) => {
        if (valid.has(key)) {
          next[key] = value;
        }
      });
      return next;
    });
  }, [edgeKey, state.blueprintEdges]);

  React.useEffect(() => {
    const onDocumentMouseDown = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (topMenuBarRef.current?.contains(target)) return;
      setOpenMenu(null);
    };
    document.addEventListener("mousedown", onDocumentMouseDown);
    return () => document.removeEventListener("mousedown", onDocumentMouseDown);
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "30px 42px 40px 1fr 120px 24px",
        height: "100vh",
        background: activeThemeBg,
        color: "#e5e7eb",
        fontFamily: "Segoe UI, Tahoma, sans-serif",
      }}
    >
      <div
        ref={topMenuBarRef}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "0 12px",
          background: "#1f2937",
          borderBottom: "1px solid #374151",
          fontSize: 12,
          userSelect: "none",
        }}
      >
        {unrealTopMenus.map((menu) => (
          <div key={menu.label} style={{ position: "relative" }}>
            <div
              style={{
                padding: "4px 6px",
                borderRadius: 4,
                background:
                  state.selectedMenu === menu.label
                    ? "rgba(59,130,246,0.25)"
                    : "none",
                cursor: "pointer",
              }}
              onClick={() => {
                setState((prev) => ({
                  ...prev,
                  selectedMenu: menu.label,
                }));
                setOpenMenu((prev) => (prev === menu.label ? null : menu.label));
              }}
            >
              {menu.label}
            </div>
            {openMenu === menu.label && (
              <div
                style={{
                  position: "absolute",
                  top: 24,
                  left: 0,
                  minWidth: 210,
                  background: "#0f172a",
                  border: "1px solid #334155",
                  zIndex: 20,
                }}
              >
                {menu.items.map((item) => (
                  <div
                    key={`${menu.label}-${item}`}
                    style={{
                      ...listRowStyle,
                      borderBottom: "1px solid #334155",
                    }}
                    onClick={(event) => {
                      event.stopPropagation();
                      handleMenuCommand(menu.label, item);
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 8,
          padding: "6px 10px",
          background: "#0b1220",
          borderBottom: "1px solid #374151",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {workspacePresets.map((workspace) => (
            <button
              key={workspace.id}
              style={{
                ...buttonStyle,
                background:
                  state.activeWorkspaceId === workspace.id ? "#1d4ed8" : "#273244",
              }}
              title={workspace.description}
              onClick={() => setState((prev) => setWorkspace(prev, workspace.id))}
            >
              {workspace.label}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 10, color: "#94a3b8" }}>Theme</span>
            <select
              value={state.activeThemeId}
              onChange={(e) =>
                setState((prev) => setEditorTheme(prev, e.currentTarget.value))
              }
              style={{
                background: "#0f172a",
                color: "#e5e7eb",
                border: "1px solid #334155",
                borderRadius: 4,
                padding: "4px 6px",
                fontSize: 12,
              }}
            >
              {editorThemes.map((theme) => (
                <option key={theme.id} value={theme.id}>
                  {theme.label}
                </option>
              ))}
            </select>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 10, color: "#94a3b8" }}>Colors</span>
            <select
              value={state.activeColorProfileId}
              onChange={(e) =>
                setState((prev) => setColorProfile(prev, e.currentTarget.value))
              }
              style={{
                background: "#0f172a",
                color: "#e5e7eb",
                border: "1px solid #334155",
                borderRadius: 4,
                padding: "4px 6px",
                fontSize: 12,
              }}
            >
              {RPG_COLOR_PROFILES.map((profile) => (
                <option key={profile.id} value={profile.id}>
                  {profile.label}
                </option>
              ))}
            </select>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 10, color: "#94a3b8" }}>Preset</span>
            <select
              value={state.activeSettingsPresetId}
              onChange={(e) =>
                setState((prev) => setSettingsPreset(prev, e.currentTarget.value))
              }
              style={{
                background: "#0f172a",
                color: "#e5e7eb",
                border: "1px solid #334155",
                borderRadius: 4,
                padding: "4px 6px",
                fontSize: 12,
              }}
            >
              {RPG_SETTINGS_PRESETS.map((preset) => (
                <option key={preset.id} value={preset.id}>
                  {preset.label}
                </option>
              ))}
            </select>
          </div>
          <button
            style={buttonStyle}
            onClick={() => setState((prev) => openToolLink(prev, "docs-engine"))}
          >
            Docs
          </button>
          <button
            style={buttonStyle}
            onClick={() => setState((prev) => openToolLink(prev, "github-repo"))}
          >
            GitHub
          </button>
          <button style={buttonStyle} onClick={() => void importSourceProgram("c")}>
            Import C
          </button>
          <button style={buttonStyle} onClick={() => void importSourceProgram("asm")}>
            Import ASM
          </button>
          <button style={buttonStyle} onClick={saveLayout}>
            Save Layout
          </button>
          <button style={buttonStyle} onClick={loadLayout}>
            Load Layout
          </button>
          <button style={buttonStyle} onClick={resetLayout}>
            Reset Layout
          </button>
          {Object.entries(quickToolsByGroup).map(([group, tools]) => (
            <div
              key={group}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                paddingRight: 8,
                borderRight: "1px solid #334155",
              }}
            >
              <span style={{ fontSize: 10, color: "#94a3b8" }}>{group}</span>
              {tools.map((tool) => (
                <button
                  key={tool.id}
                  style={{
                    ...buttonStyle,
                    padding: "3px 6px",
                    background:
                      state.activeQuickToolId === tool.id ? "#2563eb" : "#374151",
                  }}
                  onClick={() => setState((prev) => triggerQuickTool(prev, tool.id))}
                >
                  {tool.label}
                </button>
              ))}
            </div>
          ))}
          <input
            value={state.topSearchQuery}
            placeholder="Search assets, actors, layers..."
            onChange={(e) =>
              setState((prev) => setTopSearchQuery(prev, e.currentTarget.value))
            }
            style={{
              width: 260,
              background: "#0f172a",
              color: "#e5e7eb",
              border: "1px solid #334155",
              borderRadius: 4,
              padding: "6px 8px",
              fontSize: 12,
            }}
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "6px 10px",
          background: "#111827",
          borderBottom: "1px solid #374151",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {unrealToolbar.map((group) => (
            <div
              key={group.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                paddingRight: 10,
                marginRight: 10,
                borderRight: "1px solid #374151",
              }}
            >
              <strong style={{ fontSize: 11 }}>{group.name}</strong>
              {group.actions.map((action) => (
                <button
                  key={`${group.name}-${action}`}
                  style={{
                    ...buttonStyle,
                    background:
                      state.activeTool === action ? "#2563eb" : buttonStyle.background,
                  }}
                  onClick={() => {
                    if (group.name === "Blueprint" && action === "Compile") {
                      runSourceDiagnostics();
                    }
                    if (group.name === "Blueprint" && action === "Debug") {
                      appendLog("[RPG] Blueprint debugger activated");
                    }
                    applySafeStateUpdate(`Toolbar ${group.name}: ${action}`, (prev) =>
                      runToolbarAction(prev, group.name, action),
                    );
                  }}
                >
                  {action}
                </button>
              ))}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button style={buttonStyle}>Target: Game Boy</button>
          <button style={buttonStyle}>Build: Development</button>
          <button
            style={buttonStyle}
            onClick={() =>
              applySafeStateUpdate("Toolbar Play: Play", (prev) =>
                runToolbarAction(prev, "Play", "Play"),
              )
            }
          >
            Play In Editor
          </button>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "280px 1fr 320px",
          gap: 8,
          padding: 8,
          overflow: "hidden",
        }}
      >
        <div style={{ display: "grid", gridTemplateRows: "1fr 1fr 1fr 1fr", gap: 8 }}>
          <div style={panelStyle}>
            <div style={panelHeaderStyle}>Content Browser</div>
            <div style={panelBodyStyle}>
              {filteredAssets.map((asset) => (
                <div
                  key={asset.id}
                  style={{
                    ...listRowStyle,
                    background:
                      state.selectedAssetId === asset.id
                        ? "rgba(37,99,235,0.2)"
                        : "transparent",
                  }}
                  onClick={() => setState((prev) => selectAsset(prev, asset.id))}
                >
                  <strong>[{asset.type}]</strong> {asset.name}
                </div>
              ))}
            </div>
          </div>

          <div style={panelStyle}>
            <div style={panelHeaderStyle}>World Outliner</div>
            <div style={panelBodyStyle}>
              {filteredOutliner.map((entry) => (
                <div
                  key={entry}
                  style={{
                    ...listRowStyle,
                    background:
                      state.selectedOutlinerId === entry
                        ? "rgba(37,99,235,0.2)"
                        : "transparent",
                  }}
                  onClick={() => setState((prev) => selectOutlinerEntry(prev, entry))}
                >
                  {entry}
                </div>
              ))}
            </div>
          </div>

          <div style={panelStyle}>
            <div style={panelHeaderStyle}>Scene Lists</div>
            <div style={panelBodyStyle}>
              <div style={{ display: "flex", gap: 6, marginBottom: 8, flexWrap: "wrap" }}>
                {leftSidebarLists.map((list) => (
                  <button
                    key={list.id}
                    style={{
                      ...buttonStyle,
                      background:
                        state.selectedLeftListId === list.id ? "#2563eb" : "#374151",
                    }}
                    onClick={() => setState((prev) => setLeftSidebarList(prev, list.id))}
                  >
                    {list.title}
                  </button>
                ))}
              </div>
              {filteredLeftEntries.map((entry) => (
                <div
                  key={entry}
                  style={{
                    ...listRowStyle,
                    background:
                      state.selectedLeftListEntry === entry
                        ? "rgba(37,99,235,0.2)"
                        : "transparent",
                  }}
                  onClick={() => setState((prev) => selectLeftSidebarEntry(prev, entry))}
                >
                  {entry}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateRows: "46% 27% 27%", gap: 8 }}>
          <div
            style={{
              ...panelStyle,
              background:
                "linear-gradient(180deg, #0f172a 0%, #111827 60%, #0b1220 100%)",
            }}
          >
            <div style={panelHeaderStyle}>
              <span>2D Viewport</span>
              <span>Active Tool: {state.activeTool}</span>
            </div>
            <div
              ref={viewportRef}
              onDragOver={(event) => {
                event.preventDefault();
                event.dataTransfer.dropEffect = "copy";
              }}
              onDrop={onDropWidgetTemplate}
              style={{
                position: "relative",
                overflow: "hidden",
                backgroundImage:
                  "linear-gradient(to right, rgba(148,163,184,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.12) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            >
              {floatingWindows
                .slice()
                .sort((a, b) => a.z - b.z)
                .map((windowItem) => (
                  <div
                    key={windowItem.id}
                    style={{
                      position: "absolute",
                      left: windowItem.x,
                      top: windowItem.y,
                      width: windowItem.width,
                      height: windowItem.height,
                      borderRadius: 8,
                      border: "1px solid #475569",
                      background: "rgba(15,23,42,0.95)",
                      boxShadow: "0 12px 24px rgba(0,0,0,0.35)",
                      zIndex: windowItem.z,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "6px 10px",
                        background: "#1e293b",
                        borderBottom: "1px solid #475569",
                        cursor: "move",
                        fontSize: 11,
                        fontWeight: 700,
                      }}
                      onMouseDown={onMouseDownWindowHeader(windowItem.id)}
                    >
                      <span>{windowItem.title}</span>
                      <button
                        style={{ ...buttonStyle, padding: "2px 6px" }}
                        onClick={() => closeFloatingWindow(windowItem.id)}
                      >
                        x
                      </button>
                    </div>
                    <div
                      style={{
                        padding: 10,
                        fontSize: 11,
                        lineHeight: 1.45,
                        color: "#dbeafe",
                      }}
                    >
                      {windowItem.body}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div style={panelStyle}>
            <div style={panelHeaderStyle}>
              <span>Blueprint Graph</span>
              <div style={{ display: "flex", gap: 6 }}>
                <button
                  style={buttonStyle}
                  onClick={() => setState((prev) => addBlueprintNodeFromCategory(prev))}
                >
                  Add Node
                </button>
                <button
                  style={buttonStyle}
                  onClick={() => setState((prev) => connectSelectedToLatestNode(prev))}
                >
                  Connect
                </button>
                <button
                  style={buttonStyle}
                  onClick={() => setState((prev) => duplicateSelectedBlueprintNode(prev))}
                >
                  Duplicate
                </button>
                <button
                  style={buttonStyle}
                  onClick={() => setState((prev) => disconnectSelectedBlueprintNode(prev))}
                >
                  Disconnect
                </button>
                <button
                  style={buttonStyle}
                  onClick={() => setState((prev) => removeSelectedBlueprintNode(prev))}
                >
                  Remove
                </button>
                <button
                  style={buttonStyle}
                  onClick={() => setState((prev) => autoLayoutBlueprintNodes(prev))}
                >
                  Auto Layout
                </button>
                <button
                  style={buttonStyle}
                  onClick={() => setState((prev) => snapBlueprintNodesToGrid(prev, 16))}
                >
                  Snap 16
                </button>
                <button
                  style={buttonStyle}
                  onClick={() => setState((prev) => clearBlueprintGraph(prev))}
                >
                  Clear
                </button>
              </div>
            </div>
            <div
              ref={blueprintCanvasRef}
              onMouseDown={onMouseDownBlueprintCanvas}
              onDragOver={(event) => {
                event.preventDefault();
                event.dataTransfer.dropEffect = "copy";
              }}
              onDrop={onDropBlueprintNodeTemplate}
              style={{
                position: "relative",
                overflow: "hidden",
                background: "#0b1220",
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgba(148,163,184,0.25) 1px, transparent 0)",
                backgroundSize: "24px 24px",
              }}
            >
              <svg
                width="100%"
                height="100%"
                style={{ position: "absolute", inset: 0, pointerEvents: "auto" }}
              >
                {state.blueprintEdges.map((edge, index) => {
                  const from = nodeById.get(edge.from);
                  const to = nodeById.get(edge.to);
                  if (!from || !to) return null;
                  const key = edgeKey(edge.from, edge.to);
                  const reroute = edgeReroutes[key];
                  const midX = reroute ? reroute.x : Math.round((from.x + 170 + to.x) * 0.5);
                  const midY = reroute ? reroute.y : Math.round((from.y + 25 + to.y + 25) * 0.5);
                  return (
                    <g key={`${edge.from}-${edge.to}-${index}`}>
                      <path
                        d={`M ${from.x + 170} ${from.y + 25} C ${from.x + 220} ${
                          from.y + 25
                        }, ${midX - 45} ${midY}, ${midX} ${midY}`}
                        stroke="#94a3b8"
                        strokeWidth="2"
                        fill="none"
                        style={{ pointerEvents: "none" }}
                      />
                      <path
                        d={`M ${midX} ${midY} C ${midX + 45} ${midY}, ${to.x - 70} ${
                          to.y + 25
                        }, ${to.x} ${to.y + 25}`}
                        stroke="#94a3b8"
                        strokeWidth="2"
                        fill="none"
                        style={{ pointerEvents: "none" }}
                      />
                      <circle
                        cx={midX}
                        cy={midY}
                        r={6}
                        fill="#0f172a"
                        stroke="#93c5fd"
                        strokeWidth={2}
                        onMouseDown={onMouseDownEdgeHandle(edge.from, edge.to)}
                        style={{ cursor: "grab", pointerEvents: "auto" }}
                      />
                    </g>
                  );
                })}
                {connectionDrag && (() => {
                  const from = nodeById.get(connectionDrag.fromId);
                  if (!from) return null;
                  return (
                    <path
                      d={`M ${from.x + 170} ${from.y + 25} C ${from.x + 235} ${
                        from.y + 25
                      }, ${connectionDrag.toX - 80} ${connectionDrag.toY}, ${
                        connectionDrag.toX
                      } ${connectionDrag.toY}`}
                      stroke="#60a5fa"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      fill="none"
                      style={{ pointerEvents: "none" }}
                    />
                  );
                })()}
              </svg>
              {marqueeBounds && (
                <div
                  style={{
                    position: "absolute",
                    left: marqueeBounds.left,
                    top: marqueeBounds.top,
                    width: marqueeBounds.right - marqueeBounds.left,
                    height: marqueeBounds.bottom - marqueeBounds.top,
                    border: "1px solid rgba(96,165,250,0.9)",
                    background: "rgba(96,165,250,0.15)",
                    pointerEvents: "none",
                  }}
                />
              )}
              {state.blueprintNodes.map((node) => (
                <div
                  key={node.id}
                  data-blueprint-node="true"
                  style={{
                    position: "absolute",
                    left: node.x,
                    top: node.y,
                    width: 170,
                    borderRadius: 8,
                    border:
                      selectedNodeIds.includes(node.id)
                        ? "2px solid #60a5fa"
                        : "1px solid #4b5563",
                    background: node.color,
                    color: "#f8fafc",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.35)",
                    overflow: "hidden",
                    cursor: "move",
                    userSelect: "none",
                  }}
                  onMouseDown={onMouseDownBlueprintNode(node.id)}
                  onClick={(event) =>
                    setState((prev) => {
                      const activeId = prev.selectedBlueprintNodeId;
                      if (event.shiftKey && activeId && activeId !== node.id) {
                        return connectBlueprintNodes(
                          selectBlueprintNode(prev, node.id),
                          activeId,
                          node.id,
                        );
                      }
                      return selectBlueprintNode(prev, node.id);
                    })
                  }
                >
                  <div
                    style={{
                      position: "absolute",
                      left: -6,
                      top: 22,
                      width: 12,
                      height: 12,
                      borderRadius: 999,
                      border: "2px solid #93c5fd",
                      background: "#0f172a",
                      cursor: "crosshair",
                    }}
                    onMouseUp={onMouseUpInputPin(node.id)}
                    title="Input Pin"
                  />
                  <div
                    style={{
                      position: "absolute",
                      right: -6,
                      top: 22,
                      width: 12,
                      height: 12,
                      borderRadius: 999,
                      border: "2px solid #93c5fd",
                      background: "#0f172a",
                      cursor: "crosshair",
                    }}
                    onMouseDown={onMouseDownOutputPin(node.id)}
                    title="Output Pin"
                  />
                  <div
                    style={{
                      padding: "6px 10px",
                      fontWeight: 700,
                      fontSize: 12,
                      borderBottom: "1px solid rgba(255,255,255,0.15)",
                    }}
                  >
                    {node.title}
                  </div>
                  <div style={{ padding: "6px 10px", fontSize: 11 }}>
                    {node.id} | Exec In/Out
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={panelStyle}>
            <div style={panelHeaderStyle}>
              <span>Source Code IDE</span>
              <div style={{ display: "flex", gap: 6 }}>
                <button style={buttonStyle} onClick={() => void importSourceProgram("c")}>
                  Open C
                </button>
                <button
                  style={buttonStyle}
                  onClick={() => void importSourceProgram("asm")}
                >
                  Open ASM
                </button>
                <button style={buttonStyle} onClick={runSourceDiagnostics}>
                  Build Check
                </button>
              </div>
            </div>
            <div style={{ ...panelBodyStyle, display: "grid", gridTemplateRows: "30px 1fr 80px", gap: 8 }}>
              <div style={{ display: "flex", gap: 6, overflowX: "auto" }}>
                {sourceFiles.map((file) => (
                  <button
                    key={file.id}
                    style={{
                      ...buttonStyle,
                      background:
                        activeSourceFileId === file.id ? "#1d4ed8" : "#334155",
                      whiteSpace: "nowrap",
                    }}
                    onClick={() => setActiveSourceFileId(file.id)}
                  >
                    {file.name}
                    {file.dirty ? "*" : ""}
                  </button>
                ))}
              </div>
              <textarea
                value={activeSourceFile?.content ?? ""}
                onChange={(event) => {
                  const nextValue = event.currentTarget.value;
                  if (!activeSourceFile) return;
                  setSourceFiles((prev) =>
                    prev.map((entry) =>
                      entry.id === activeSourceFile.id
                        ? { ...entry, content: nextValue, dirty: true }
                        : entry,
                    ),
                  );
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  resize: "none",
                  borderRadius: 6,
                  border: "1px solid #334155",
                  background: "#020617",
                  color: "#e2e8f0",
                  fontFamily: "Consolas, monospace",
                  fontSize: 12,
                  padding: 8,
                }}
              />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                <div style={{ border: "1px solid #334155", borderRadius: 6, padding: 8 }}>
                  <div style={{ fontWeight: 700, marginBottom: 6 }}>Search/Replace</div>
                  <div style={{ display: "flex", gap: 6, marginBottom: 6 }}>
                    <input
                      value={sourceSearch}
                      placeholder="Find"
                      onChange={(event) => setSourceSearch(event.currentTarget.value)}
                      style={{ ...buttonStyle, width: "100%", cursor: "text", textAlign: "left" }}
                    />
                    <input
                      value={sourceReplace}
                      placeholder="Replace"
                      onChange={(event) => setSourceReplace(event.currentTarget.value)}
                      style={{ ...buttonStyle, width: "100%", cursor: "text", textAlign: "left" }}
                    />
                    <button style={buttonStyle} onClick={applySourceReplace}>
                      Apply
                    </button>
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button
                      style={buttonStyle}
                      onClick={() => {
                        if (!activeSourceFile) return;
                        setSourceFiles((prev) =>
                          prev.map((entry) =>
                            entry.id === activeSourceFile.id
                              ? {
                                  ...entry,
                                  content: entry.content
                                    .split(/\r?\n/)
                                    .map((line) => line.replace(/\s+$/g, ""))
                                    .join("\n"),
                                  dirty: true,
                                }
                              : entry,
                          ),
                        );
                        appendLog(`[IDE] Formatted ${activeSourceFile.name}`);
                      }}
                    >
                      Format
                    </button>
                    <button
                      style={buttonStyle}
                      onClick={() => {
                        if (!activeSourceFile) return;
                        setSourceFiles((prev) =>
                          prev.map((entry) =>
                            entry.id === activeSourceFile.id
                              ? { ...entry, dirty: false }
                              : entry,
                          ),
                        );
                        appendLog(`[IDE] Saved ${activeSourceFile.name}`);
                      }}
                    >
                      Save
                    </button>
                  </div>
                </div>
                <div style={{ border: "1px solid #334155", borderRadius: 6, padding: 8 }}>
                  <div style={{ fontWeight: 700, marginBottom: 6 }}>Diagnostics</div>
                  {(activeSourceFile?.diagnostics ?? ["No file selected"]).map((diagnostic) => (
                    <div key={diagnostic} style={listRowStyle}>
                      {diagnostic}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateRows: "1fr 1fr 1fr", gap: 8 }}>
          <div style={panelStyle}>
            <div style={panelHeaderStyle}>Details</div>
            <div style={panelBodyStyle}>
              <div style={listRowStyle}>Project: {state.projectName}</div>
              <div style={listRowStyle}>Map: {state.mapName}</div>
              <div style={listRowStyle}>Layer: {state.layerName}</div>
              <div style={listRowStyle}>
                Workspace:{" "}
                {workspacePresets.find((w) => w.id === state.activeWorkspaceId)?.label}
              </div>
              <div style={listRowStyle}>
                Color Profile: {selectedColorProfile?.label ?? state.activeColorProfileId}
              </div>
              <div style={listRowStyle}>
                Settings Preset:{" "}
                {selectedSettingsPreset?.label ?? state.activeSettingsPresetId}
              </div>
              <div style={listRowStyle}>
                Settings Count: {Object.keys(state.settingValues).length}
              </div>
              <div style={listRowStyle}>Modified: {state.modified ? "Yes" : "No"}</div>
              <div style={listRowStyle}>
                Selection:{" "}
                {state.selectedAssetId ||
                  state.selectedOutlinerId ||
                  state.selectedLeftListEntry ||
                  state.selectedBlueprintNodeId ||
                  "None"}
              </div>
            </div>
          </div>

          <div style={panelStyle}>
            <div style={panelHeaderStyle}>Tools and Features</div>
            <div style={panelBodyStyle}>
              <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
                <input
                  value={pendingNodeTitle}
                  placeholder="Rename selected node"
                  onChange={(e) => setPendingNodeTitle(e.currentTarget.value)}
                  style={{
                    ...buttonStyle,
                    width: "100%",
                    textAlign: "left",
                    cursor: "text",
                  }}
                />
                <button
                  style={buttonStyle}
                  onClick={() =>
                    setState((prev) =>
                      renameSelectedBlueprintNode(prev, pendingNodeTitle),
                    )
                  }
                >
                  Rename
                </button>
              </div>
              <div style={{ display: "flex", gap: 6, marginBottom: 8, flexWrap: "wrap" }}>
                {blueprintNodeCatalog.map((group) => (
                  <button
                    key={group.category}
                    style={{
                      ...buttonStyle,
                      background:
                        state.selectedToolCategory === group.category
                          ? "#2563eb"
                          : "#374151",
                    }}
                    onClick={() =>
                      setState((prev) => setToolCategory(prev, group.category))
                    }
                  >
                    {group.category}
                  </button>
                ))}
              </div>
              {(blueprintNodeCatalog.find(
                (group) => group.category === state.selectedToolCategory,
              )?.nodes ?? []
              ).map((node) => (
                <div
                  key={node}
                  style={{
                    ...listRowStyle,
                    border: "1px dashed #475569",
                    borderRadius: 6,
                    marginBottom: 6,
                  }}
                  draggable
                  onDragStart={onDragBlueprintNodeTemplate(
                    node,
                    state.selectedToolCategory,
                  )}
                >
                  {node}
                  <span style={{ opacity: 0.65, float: "right" }}>drag</span>
                </div>
              ))}
              <div style={{ marginTop: 10, fontWeight: 700 }}>Widget Windows</div>
              {widgetTemplates.map((widget) => (
                <div
                  key={widget.id}
                  style={{
                    ...listRowStyle,
                    border: "1px dashed #64748b",
                    borderRadius: 6,
                    marginBottom: 6,
                  }}
                  draggable
                  onDragStart={onDragWidgetTemplate(widget.id)}
                  onDoubleClick={() => openWidgetWindow(widget.id)}
                >
                  {widget.title}
                  <span style={{ opacity: 0.65, float: "right" }}>drag/drop</span>
                </div>
              ))}
              <div style={{ marginTop: 10, fontWeight: 700 }}>
                Open Windows
              </div>
              {floatingWindows.map((windowItem) => (
                <div key={windowItem.id} style={listRowStyle}>
                  {windowItem.title}
                  <button
                    style={{ ...buttonStyle, padding: "2px 6px", marginLeft: 6 }}
                    onClick={() => closeFloatingWindow(windowItem.id)}
                  >
                    close
                  </button>
                </div>
              ))}
              {!floatingWindows.length && (
                <div style={listRowStyle}>No open windows</div>
              )}
              <div style={{ marginTop: 10, fontWeight: 700 }}>Audio Libraries</div>
              <div style={listRowStyle}>
                Music Packs: {audioLibraryPacks.music.join(", ")}
              </div>
              <div style={listRowStyle}>SFX Packs: {audioLibraryPacks.sfx.join(", ")}</div>
              <div style={{ marginTop: 10, fontWeight: 700 }}>Linked RPG Features</div>
              {linkedRPGFeatureNames.map((featureName) => (
                <div
                  key={featureName}
                  style={listRowStyle}
                  onClick={() => {
                    const action = resolveFeatureAction(featureName);
                    if (!action || !action.toolLabel) {
                      appendLog(`[WARN] Feature not linked: ${featureName}`);
                      return;
                    }
                    activateRpgTool(action.toolLabel, action.source);
                    appendLog(`[RPG] ${action.message || `Feature opened: ${featureName}`}`);
                  }}
                >
                  {featureName}
                </div>
              ))}
              <div style={{ marginTop: 10, fontWeight: 700 }}>
                Linked Feature Capabilities
              </div>
              {linkedRPGFeatureCapabilities.slice(0, 20).map((capability) => (
                <div
                  key={capability}
                  style={listRowStyle}
                  onClick={() => {
                    const action = resolveFeatureAction(capability);
                    if (action?.toolLabel) {
                      activateRpgTool(action.toolLabel, action.source);
                    }
                    appendLog(`[RPG] ${action?.message || `Capability inspected: ${capability}`}`);
                  }}
                >
                  {capability}
                </div>
              ))}
              <div style={{ marginTop: 10, fontWeight: 700 }}>Main Menus</div>
              {linkedRPGSystemMenus.map((menu) => (
                <div
                  key={menu}
                  style={listRowStyle}
                  onClick={() =>
                    applySafeStateUpdate(`RPG Menu ${menu}`, (prev) => ({
                      ...prev,
                      selectedMenu: menu,
                    }))
                  }
                >
                  {menu}
                </div>
              ))}
              <div style={{ marginTop: 10, fontWeight: 700 }}>Sub Menus</div>
              {flatRpgSubMenus.map((subMenu) => (
                <div
                  key={`${subMenu.menuLabel}-${subMenu.id}`}
                  style={listRowStyle}
                  onClick={() => {
                    appendLog(
                      `[RPG] Submenu opened: ${subMenu.menuLabel} > ${subMenu.label}`,
                    );
                    if (subMenu.tools[0]) {
                      activateRpgTool(
                        subMenu.tools[0],
                        `${subMenu.menuLabel} > ${subMenu.label}`,
                      );
                    }
                    if (subMenu.actions[0]?.functionName) {
                      runRpgSubMenuAction(
                        subMenu,
                        subMenu.actions[0].label,
                        subMenu.actions[0].functionName,
                      );
                    }
                  }}
                >
                  {subMenu.menuLabel}
                  {" > "}
                  {subMenu.label}
                </div>
              ))}
              <div style={{ marginTop: 10, fontWeight: 700 }}>
                Sub Menu Actions
              </div>
              {flatRpgSubMenus.flatMap((subMenu) =>
                subMenu.actions.map((action) => (
                  <div
                    key={`${subMenu.id}-${action.id}`}
                    style={listRowStyle}
                    onClick={() =>
                      runRpgSubMenuAction(subMenu, action.label, action.functionName)
                    }
                  >
                    {subMenu.label}: {action.label}
                  </div>
                ))
              )}
              <div style={{ marginTop: 10, fontWeight: 700 }}>Menu Functions</div>
              {linkedRPGMenuFunctions.slice(0, 24).map((fn) => (
                <div
                  key={fn}
                  style={listRowStyle}
                  onClick={() => executeFunctionListEntry(fn, "Menu Functions")}
                >
                  {fn}
                </div>
              ))}
              <div style={{ marginTop: 10, fontWeight: 700 }}>Engine Logic</div>
              {linkedRPGEngineLogic.map((logic) => (
                <div
                  key={logic}
                  style={listRowStyle}
                  onClick={() => runEngineLogicEntry(logic)}
                >
                  {logic}
                </div>
              ))}
              <div style={{ marginTop: 10, fontWeight: 700 }}>
                Engine Logic Tools
              </div>
              {linkedRPGEngineLogicTools.map((tool) => (
                <div
                  key={tool}
                  style={listRowStyle}
                  onClick={() =>
                    activateRpgTool(tool.replace(/\s+\[[^\]]+\]$/, ""), "Engine Tool")
                  }
                >
                  {tool}
                </div>
              ))}
              <div style={{ marginTop: 10, fontWeight: 700 }}>Engine Functions</div>
              {linkedRPGEngineFunctions.slice(0, 30).map((fn) => (
                <div
                  key={fn}
                  style={listRowStyle}
                  onClick={() => executeFunctionListEntry(fn, "Engine Functions")}
                >
                  {fn}
                </div>
              ))}
              <div style={{ marginTop: 10, fontWeight: 700 }}>
                Registered RPG Tools
              </div>
              {linkedRPGInputTools.map((tool) => (
                <div
                  key={tool}
                  style={listRowStyle}
                  onClick={() => {
                    activateRpgTool(tool, "Registered RPG Tool");
                  }}
                >
                  {tool}
                </div>
              ))}
              <div style={{ marginTop: 10, fontWeight: 700 }}>
                Premade RPG/MMORPG Systems
              </div>
              {linkedRPGPremadeSystems.map((system) => (
                <div
                  key={system}
                  style={listRowStyle}
                  onClick={() => openPremadeSystem(system)}
                >
                  {system}
                </div>
              ))}
              <div style={{ marginTop: 10, fontWeight: 700 }}>
                Template Library
              </div>
              {linkedRPGTemplateLibrary.map((template) => (
                <div
                  key={template}
                  style={listRowStyle}
                  onClick={() => openTemplateLibraryItem(template)}
                >
                  {template}
                </div>
              ))}
              <div style={{ marginTop: 10, fontWeight: 700 }}>
                Plugin System Templates
              </div>
              {linkedRPGPluginTemplates.map((plugin) => (
                <div
                  key={plugin}
                  style={listRowStyle}
                  onClick={() => openPluginTemplateItem(plugin)}
                >
                  {plugin}
                </div>
              ))}
              <div style={{ marginTop: 10, fontWeight: 700 }}>
                RPG Color Profiles
              </div>
              {linkedRpgColorProfiles.map((profile) => (
                <div key={profile} style={listRowStyle}>
                  {profile}
                </div>
              ))}
              <div style={{ marginTop: 10, fontWeight: 700 }}>Color Variables</div>
              {linkedRpgColorVariables.slice(0, 48).map((entry) => (
                <div key={entry} style={listRowStyle}>
                  {entry}
                </div>
              ))}
              <div style={{ marginTop: 10, fontWeight: 700 }}>
                RPG Settings Groups
              </div>
              {linkedRpgSettingsGroups.map((group) => (
                <div key={group} style={listRowStyle}>
                  {group}
                </div>
              ))}
              <div style={{ marginTop: 10, fontWeight: 700 }}>
                RPG Settings Presets
              </div>
              {linkedRpgSettingsPresets.map((preset) => (
                <div key={preset} style={listRowStyle}>
                  {preset}
                </div>
              ))}
              <div style={{ marginTop: 10, fontWeight: 700 }}>
                RPG Settings Options
              </div>
              {linkedRpgSettingsOptions.slice(0, 80).map((option) => (
                <div key={option} style={listRowStyle}>
                  {option}
                </div>
              ))}
              <div style={{ marginTop: 10, fontWeight: 700 }}>
                RPG Settings Functions
              </div>
              {linkedRpgSettingsFunctions.slice(0, 80).map((fn) => (
                <div key={fn} style={listRowStyle}>
                  {fn}
                </div>
              ))}
              <div style={{ marginTop: 10, fontWeight: 700 }}>
                RPG Settings Logic
              </div>
              {linkedRpgSettingsLogic.slice(0, 80).map((logic) => (
                <div key={logic} style={listRowStyle}>
                  {logic}
                </div>
              ))}
              <div style={{ marginTop: 10, fontWeight: 700 }}>
                Wolfman Alpha Battle Profile
              </div>
              {linkedWolfmanAlphaProfiles.map((entry) => (
                <div key={entry} style={listRowStyle}>
                  {entry}
                </div>
              ))}
              <div style={{ marginTop: 10, fontWeight: 700 }}>DnD5E Abilities</div>
              {linkedDnd5eAbilities.map((ability) => (
                <div key={ability} style={listRowStyle}>
                  {ability}
                </div>
              ))}
              <div style={{ marginTop: 10, fontWeight: 700 }}>DnD5E Skills</div>
              {linkedDnd5eSkills.map((skill) => (
                <div key={skill} style={listRowStyle}>
                  {skill}
                </div>
              ))}
              <div style={{ marginTop: 10, fontWeight: 700 }}>DnD5E Classes</div>
              {linkedDnd5eClasses.map((dndClass) => (
                <div key={dndClass} style={listRowStyle}>
                  {dndClass}
                </div>
              ))}
              <div style={{ marginTop: 10, fontWeight: 700 }}>
                DnD5E Action Economy
              </div>
              {linkedDnd5eActionEconomy.map((actionType) => (
                <div key={actionType} style={listRowStyle}>
                  {actionType}
                </div>
              ))}
              <div style={{ marginTop: 10, fontWeight: 700 }}>DnD5E Conditions</div>
              {linkedDnd5eConditions.map((condition) => (
                <div key={condition} style={listRowStyle}>
                  {condition}
                </div>
              ))}
              <div style={{ marginTop: 10, fontWeight: 700 }}>
                DnD5E Damage Types
              </div>
              {linkedDnd5eDamageTypes.map((damageType) => (
                <div key={damageType} style={listRowStyle}>
                  {damageType}
                </div>
              ))}
              <div style={{ marginTop: 10, fontWeight: 700 }}>
                DnD5E Core Rule Notes
              </div>
              {linkedDnd5eRuleNotes.map((rule) => (
                <div key={rule} style={listRowStyle}>
                  {rule}
                </div>
              ))}
              <div style={{ marginTop: 10, fontWeight: 700 }}>
                DnD5E RPG System Fields
              </div>
              {linkedDnd5eSystemFields.slice(0, 120).map((field) => (
                <div key={field} style={listRowStyle}>
                  {field}
                </div>
              ))}
              <div style={{ marginTop: 10, fontWeight: 700 }}>Tool Links</div>
              {toolLinks.map((link) => (
                <div
                  key={link.id}
                  style={{
                    ...listRowStyle,
                    background:
                      state.lastOpenedLinkId === link.id
                        ? "rgba(37,99,235,0.2)"
                        : "transparent",
                  }}
                  onClick={() => setState((prev) => openToolLink(prev, link.id))}
                >
                  [{link.category}] {link.label}
                </div>
              ))}
            </div>
          </div>

          <div style={panelStyle}>
            <div style={panelHeaderStyle}>
              <span>Terminal Console</span>
              <div style={{ display: "flex", gap: 4 }}>
                {(["all", "ai", "rpg", "warn", "error", "system"] as const).map(
                  (filter) => (
                    <button
                      key={filter}
                      style={{
                        ...buttonStyle,
                        padding: "2px 6px",
                        background: terminalFilter === filter ? "#1d4ed8" : "#374151",
                      }}
                      onClick={() => setTerminalFilter(filter)}
                    >
                      {filter.toUpperCase()}
                    </button>
                  ),
                )}
              </div>
            </div>
            <div style={{ ...panelBodyStyle, fontFamily: "Consolas, monospace" }}>
              <div style={{ display: "flex", gap: 6, marginBottom: 8, flexWrap: "wrap" }}>
                <button
                  style={buttonStyle}
                  onClick={() => appendLog("[AI] inference request queued")}
                >
                  Test AI Log
                </button>
                <button
                  style={buttonStyle}
                  onClick={() => appendLog("[RPG] battle sim step complete")}
                >
                  Test RPG Log
                </button>
                <button
                  style={buttonStyle}
                  onClick={() => appendLog("[WARN] palette budget near cap")}
                >
                  Test Warn
                </button>
                <button
                  style={buttonStyle}
                  onClick={() => appendLog("[ERROR] map script compile failed")}
                >
                  Test Error
                </button>
                <button
                  style={buttonStyle}
                  onClick={() =>
                    setState((prev) => ({ ...prev, outputLog: ["Terminal cleared"] }))
                  }
                >
                  Clear
                </button>
              </div>
              {terminalEntries.slice(-80).map((entry, idx) => (
                <div
                  key={`term-${idx}`}
                  style={{
                    ...listRowStyle,
                    borderBottom: "1px solid #1f2937",
                    color:
                      entry.channel === "error"
                        ? "#fca5a5"
                        : entry.channel === "warn"
                          ? "#fde68a"
                          : entry.channel === "ai"
                            ? "#93c5fd"
                            : entry.channel === "rpg"
                              ? "#86efac"
                              : "#cbd5e1",
                  }}
                >
                  [{entry.channel.toUpperCase()}] {entry.text}
                </div>
              ))}
              {terminalEntries.length === 0 && (
                <div style={listRowStyle}>No terminal entries for this filter.</div>
              )}
            </div>
          </div>

          <div style={panelStyle}>
            <div style={panelHeaderStyle}>Inspector</div>
            <div style={panelBodyStyle}>
              <div style={{ display: "flex", gap: 6, marginBottom: 8, flexWrap: "wrap" }}>
                {rightInspectorSections.map((section) => (
                  <button
                    key={section.id}
                    style={{
                      ...buttonStyle,
                      background:
                        state.selectedInspectorSectionId === section.id
                          ? "#2563eb"
                          : "#374151",
                    }}
                    onClick={() =>
                      setState((prev) => setInspectorSection(prev, section.id))
                    }
                  >
                    {section.title}
                  </button>
                ))}
              </div>
              {(inspectorSection?.fields ?? []).map((field) => (
                <div key={field} style={listRowStyle}>
                  {field}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          borderTop: "1px solid #374151",
          background: "#0f172a",
          padding: "8px 10px",
          overflow: "auto",
          fontSize: 11,
          fontFamily: "Consolas, monospace",
        }}
      >
        {state.outputLog.map((line, idx) => (
          <div key={`log-${idx}`}>{line}</div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 10px",
          fontSize: 11,
          background: "#1f2937",
          borderTop: "1px solid #374151",
        }}
      >
        <span>
          Project: {state.projectName} | Map: {state.mapName} | Layer: {state.layerName}
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {statusActions.map((action) => (
            <button
              key={action.id}
              style={{ ...buttonStyle, padding: "2px 6px" }}
              onClick={() =>
                setState((prev) => triggerQuickTool(prev, `status:${action.id}`))
              }
            >
              {action.label}
            </button>
          ))}
          <span>RAM Budget: 68% | ROM Bank: 21/32 | FPS: 60</span>
          <span>
            Theme: {editorThemes.find((theme) => theme.id === state.activeThemeId)?.label}
          </span>
          <span>Colors: {selectedColorProfile?.label ?? state.activeColorProfileId}</span>
          <span>
            Preset: {selectedSettingsPreset?.label ?? state.activeSettingsPresetId}
          </span>
        </span>
      </div>
    </div>
  );
};

export default RPGGameMakerUILayout;
