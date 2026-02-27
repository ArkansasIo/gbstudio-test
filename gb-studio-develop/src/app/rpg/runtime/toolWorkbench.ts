import {
  RPG_ENGINE_SYSTEMS,
  RPG_MENU_TREE,
  RPG_TOOL_REGISTRY,
  type RPGToolCategory,
  type RPGToolInputDefinition,
} from "app/rpg/input";

export type WorkbenchBitMode = "8bit" | "16bit" | "32bit" | "64bit";
export type WorkbenchRisk = "low" | "medium" | "high";
export type WorkbenchStatus = "draft" | "in_progress" | "ready" | "blocked";

export interface WorkbenchChecklistItem {
  id: string;
  label: string;
  done: boolean;
}

export interface WorkbenchRuntimeConfig {
  frameBudgetMs: number;
  coverageTarget: number;
  risk: WorkbenchRisk;
}

export interface WorkbenchToolRecord {
  toolId: string;
  label: string;
  category: RPGToolCategory | "unknown";
  description: string;
  status: WorkbenchStatus;
  owner: string;
  bitMode: WorkbenchBitMode;
  completion: number;
  menuPaths: string[];
  engineSystems: string[];
  config: WorkbenchRuntimeConfig;
  checklist: WorkbenchChecklistItem[];
  notes: string;
  lastRunAt: string | null;
}

export type WorkbenchToolRecordMap = Record<string, WorkbenchToolRecord>;

const defaultChecklistByCategory: Record<RPGToolCategory | "unknown", string[]> = {
  authoring: [
    "Schema defined",
    "Editor UX wired",
    "Validation rules added",
    "Export path verified",
  ],
  runtime: [
    "Runtime contract mapped",
    "State transition tested",
    "Error handling covered",
    "Performance budget checked",
  ],
  debug: [
    "Telemetry output mapped",
    "Inspector hooks wired",
    "Failure snapshots added",
    "Regression checks active",
  ],
  build: [
    "Build pipeline target mapped",
    "Artifact format validated",
    "Packaging path tested",
    "Rollback path documented",
  ],
  content: [
    "Content schema mapped",
    "Import/export path validated",
    "Metadata sync checked",
    "Localization review complete",
  ],
  unknown: [
    "Tool record initialized",
    "Scope reviewed",
    "Owner assigned",
    "Integration planned",
  ],
};

const menuPathsByToolLabel = new Map<string, string[]>();
RPG_MENU_TREE.forEach((menu) => {
  menu.subMenus.forEach((subMenu) => {
    const path = `${menu.label} > ${subMenu.label}`;
    subMenu.tools.forEach((tool) => {
      const current = menuPathsByToolLabel.get(tool.label) || [];
      menuPathsByToolLabel.set(tool.label, [...current, path]);
    });
  });
});

const engineSystemsByToolLabel = new Map<string, string[]>();
RPG_ENGINE_SYSTEMS.forEach((system) => {
  system.tools.forEach((tool) => {
    const current = engineSystemsByToolLabel.get(tool.label) || [];
    engineSystemsByToolLabel.set(tool.label, [...current, system.name]);
  });
});

const toolByLabel = new Map<string, RPGToolInputDefinition>();
RPG_TOOL_REGISTRY.forEach((tool) => {
  toolByLabel.set(tool.label, tool);
});

const slugify = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "tool";

const initialRiskByCategory = (
  category: RPGToolCategory | "unknown",
): WorkbenchRisk => {
  if (category === "runtime" || category === "build") return "high";
  if (category === "debug") return "medium";
  return "low";
};

const frameBudgetByCategory = (category: RPGToolCategory | "unknown"): number => {
  if (category === "runtime") return 16;
  if (category === "debug") return 24;
  if (category === "build") return 40;
  return 20;
};

const defaultBitModeByCategory = (
  category: RPGToolCategory | "unknown",
): WorkbenchBitMode => {
  if (category === "runtime") return "8bit";
  if (category === "build") return "32bit";
  return "16bit";
};

const defaultCoverageByCategory = (category: RPGToolCategory | "unknown"): number => {
  if (category === "runtime" || category === "build") return 90;
  if (category === "debug") return 85;
  return 75;
};

const calcCompletion = (checklist: WorkbenchChecklistItem[]): number => {
  if (!checklist.length) return 0;
  const done = checklist.filter((item) => item.done).length;
  return Math.round((done / checklist.length) * 100);
};

const nowStamp = (): string => new Date().toISOString();

export const createWorkbenchToolRecord = (toolLabel: string): WorkbenchToolRecord => {
  const tool = toolByLabel.get(toolLabel);
  const category = tool?.category || "unknown";
  const checklist = (defaultChecklistByCategory[category] || []).map((label, index) => ({
    id: `${slugify(toolLabel)}-task-${index + 1}`,
    label,
    done: false,
  }));
  return {
    toolId: tool?.id || `custom-${slugify(toolLabel)}`,
    label: toolLabel,
    category,
    description: tool?.description || "Custom tool record created from active context.",
    status: "draft",
    owner: "unassigned",
    bitMode: defaultBitModeByCategory(category),
    completion: calcCompletion(checklist),
    menuPaths: menuPathsByToolLabel.get(toolLabel) || [],
    engineSystems: engineSystemsByToolLabel.get(toolLabel) || [],
    config: {
      frameBudgetMs: frameBudgetByCategory(category),
      coverageTarget: defaultCoverageByCategory(category),
      risk: initialRiskByCategory(category),
    },
    checklist,
    notes: "",
    lastRunAt: null,
  };
};

export const createToolWorkbenchRecords = (): WorkbenchToolRecordMap =>
  RPG_TOOL_REGISTRY.reduce<WorkbenchToolRecordMap>((memo, tool) => {
    memo[tool.label] = createWorkbenchToolRecord(tool.label);
    return memo;
  }, {});

export const ensureWorkbenchToolRecord = (
  records: WorkbenchToolRecordMap,
  toolLabel: string,
): WorkbenchToolRecordMap => {
  const normalized = toolLabel.trim();
  if (!normalized || records[normalized]) return records;
  return {
    ...records,
    [normalized]: createWorkbenchToolRecord(normalized),
  };
};

export const setWorkbenchToolStatus = (
  records: WorkbenchToolRecordMap,
  toolLabel: string,
  status: WorkbenchStatus,
): WorkbenchToolRecordMap => {
  const next = ensureWorkbenchToolRecord(records, toolLabel);
  const record = next[toolLabel];
  if (!record) return next;
  return {
    ...next,
    [toolLabel]: {
      ...record,
      status,
    },
  };
};

export const setWorkbenchToolOwner = (
  records: WorkbenchToolRecordMap,
  toolLabel: string,
  owner: string,
): WorkbenchToolRecordMap => {
  const next = ensureWorkbenchToolRecord(records, toolLabel);
  const record = next[toolLabel];
  if (!record) return next;
  return {
    ...next,
    [toolLabel]: {
      ...record,
      owner: owner.trim() || "unassigned",
    },
  };
};

export const setWorkbenchToolBitMode = (
  records: WorkbenchToolRecordMap,
  toolLabel: string,
  bitMode: WorkbenchBitMode,
): WorkbenchToolRecordMap => {
  const next = ensureWorkbenchToolRecord(records, toolLabel);
  const record = next[toolLabel];
  if (!record) return next;
  return {
    ...next,
    [toolLabel]: {
      ...record,
      bitMode,
    },
  };
};

export const setWorkbenchToolRisk = (
  records: WorkbenchToolRecordMap,
  toolLabel: string,
  risk: WorkbenchRisk,
): WorkbenchToolRecordMap => {
  const next = ensureWorkbenchToolRecord(records, toolLabel);
  const record = next[toolLabel];
  if (!record) return next;
  return {
    ...next,
    [toolLabel]: {
      ...record,
      config: {
        ...record.config,
        risk,
      },
    },
  };
};

export const setWorkbenchToolCoverageTarget = (
  records: WorkbenchToolRecordMap,
  toolLabel: string,
  coverageTarget: number,
): WorkbenchToolRecordMap => {
  const next = ensureWorkbenchToolRecord(records, toolLabel);
  const record = next[toolLabel];
  if (!record) return next;
  return {
    ...next,
    [toolLabel]: {
      ...record,
      config: {
        ...record.config,
        coverageTarget: Math.max(0, Math.min(100, Math.round(coverageTarget))),
      },
    },
  };
};

export const setWorkbenchToolFrameBudget = (
  records: WorkbenchToolRecordMap,
  toolLabel: string,
  frameBudgetMs: number,
): WorkbenchToolRecordMap => {
  const next = ensureWorkbenchToolRecord(records, toolLabel);
  const record = next[toolLabel];
  if (!record) return next;
  return {
    ...next,
    [toolLabel]: {
      ...record,
      config: {
        ...record.config,
        frameBudgetMs: Math.max(1, Math.round(frameBudgetMs)),
      },
    },
  };
};

export const setWorkbenchToolNotes = (
  records: WorkbenchToolRecordMap,
  toolLabel: string,
  notes: string,
): WorkbenchToolRecordMap => {
  const next = ensureWorkbenchToolRecord(records, toolLabel);
  const record = next[toolLabel];
  if (!record) return next;
  return {
    ...next,
    [toolLabel]: {
      ...record,
      notes,
    },
  };
};

export const toggleWorkbenchChecklistItem = (
  records: WorkbenchToolRecordMap,
  toolLabel: string,
  checklistItemId: string,
): WorkbenchToolRecordMap => {
  const next = ensureWorkbenchToolRecord(records, toolLabel);
  const record = next[toolLabel];
  if (!record) return next;
  const checklist = record.checklist.map((item) =>
    item.id === checklistItemId ? { ...item, done: !item.done } : item,
  );
  const completion = calcCompletion(checklist);
  const status: WorkbenchStatus =
    completion === 100
      ? "ready"
      : completion > 0
        ? "in_progress"
        : record.status === "ready"
          ? "in_progress"
          : record.status;
  return {
    ...next,
    [toolLabel]: {
      ...record,
      checklist,
      completion,
      status,
    },
  };
};

export const markWorkbenchToolRun = (
  records: WorkbenchToolRecordMap,
  toolLabel: string,
  notes?: string,
): WorkbenchToolRecordMap => {
  const next = ensureWorkbenchToolRecord(records, toolLabel);
  const record = next[toolLabel];
  if (!record) return next;
  const mergedNotes = notes
    ? `${record.notes}${record.notes ? "\n" : ""}[Run] ${notes}`
    : record.notes;
  const status: WorkbenchStatus =
    record.status === "draft" ? "in_progress" : record.status;
  return {
    ...next,
    [toolLabel]: {
      ...record,
      status,
      lastRunAt: nowStamp(),
      notes: mergedNotes,
    },
  };
};
