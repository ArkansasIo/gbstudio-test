/**
 * RPG Workbench Debugger Utilities
 * Provides debugging helpers for the RPG Workbench system
 */

import type { WorkbenchToolRecordMap } from "../runtime/toolWorkbench";
import type { EditorState } from "components/rpgMakerEditorSystems";

export interface DebugReport {
  timestamp: string;
  toolCount: number;
  activeTools: string[];
  completedTools: string[];
  blockedTools: string[];
  averageCompletion: number;
  highRiskTools: string[];
  recentRuns: Array<{ tool: string; time: string }>;
}

export const generateDebugReport = (
  records: WorkbenchToolRecordMap,
  state: EditorState
): DebugReport => {
  const tools = Object.values(records);
  const activeTools = tools.filter((t) => t.status === "in_progress").map((t) => t.label);
  const completedTools = tools.filter((t) => t.status === "ready").map((t) => t.label);
  const blockedTools = tools.filter((t) => t.status === "blocked").map((t) => t.label);
  const highRiskTools = tools.filter((t) => t.config.risk === "high").map((t) => t.label);

  const totalCompletion = tools.reduce((sum, t) => sum + t.completion, 0);
  const averageCompletion = tools.length > 0 ? Math.round(totalCompletion / tools.length) : 0;

  const recentRuns = tools
    .filter((t) => t.lastRunAt)
    .sort((a, b) => {
      const timeA = a.lastRunAt || "";
      const timeB = b.lastRunAt || "";
      return timeB.localeCompare(timeA);
    })
    .slice(0, 10)
    .map((t) => ({ tool: t.label, time: t.lastRunAt || "" }));

  return {
    timestamp: new Date().toISOString(),
    toolCount: tools.length,
    activeTools,
    completedTools,
    blockedTools,
    averageCompletion,
    highRiskTools,
    recentRuns,
  };
};

export const validateToolRecord = (
  toolLabel: string,
  records: WorkbenchToolRecordMap
): { valid: boolean; issues: string[] } => {
  const issues: string[] = [];
  const record = records[toolLabel];

  if (!record) {
    issues.push(`Tool record not found: ${toolLabel}`);
    return { valid: false, issues };
  }

  if (!record.toolId) {
    issues.push("Missing toolId");
  }

  if (!record.label) {
    issues.push("Missing label");
  }

  if (!record.category) {
    issues.push("Missing category");
  }

  if (record.completion < 0 || record.completion > 100) {
    issues.push(`Invalid completion: ${record.completion}`);
  }

  if (record.config.frameBudgetMs < 1) {
    issues.push(`Invalid frame budget: ${record.config.frameBudgetMs}`);
  }

  if (record.config.coverageTarget < 0 || record.config.coverageTarget > 100) {
    issues.push(`Invalid coverage target: ${record.config.coverageTarget}`);
  }

  if (record.checklist.length === 0) {
    issues.push("Empty checklist");
  }

  return {
    valid: issues.length === 0,
    issues,
  };
};

export const exportDebugData = (
  records: WorkbenchToolRecordMap,
  state: EditorState
): string => {
  const report = generateDebugReport(records, state);
  const validationResults = Object.keys(records).map((toolLabel) => ({
    tool: toolLabel,
    validation: validateToolRecord(toolLabel, records),
  }));

  return JSON.stringify(
    {
      report,
      validationResults: validationResults.filter((v) => !v.validation.valid),
      state: {
        activeTool: state.activeTool,
        projectName: state.projectName,
        modified: state.modified,
        logCount: state.outputLog.length,
      },
      records: Object.keys(records).reduce((acc, key) => {
        acc[key] = {
          status: records[key].status,
          completion: records[key].completion,
          owner: records[key].owner,
          lastRunAt: records[key].lastRunAt,
        };
        return acc;
      }, {} as Record<string, any>),
    },
    null,
    2
  );
};

export const logDebugInfo = (
  records: WorkbenchToolRecordMap,
  state: EditorState
): void => {
  const report = generateDebugReport(records, state);
  console.group("🔧 RPG Workbench Debug Report");
  console.log("Timestamp:", report.timestamp);
  console.log("Total Tools:", report.toolCount);
  console.log("Average Completion:", `${report.averageCompletion}%`);
  console.log("Active Tools:", report.activeTools);
  console.log("Completed Tools:", report.completedTools);
  console.log("Blocked Tools:", report.blockedTools);
  console.log("High Risk Tools:", report.highRiskTools);
  console.log("Recent Runs:", report.recentRuns);
  console.groupEnd();
};

export const findUnhandledFunctions = (
  menuTree: any[],
  knownFunctions: Set<string>
): string[] => {
  const unhandled: string[] = [];

  menuTree.forEach((menu) => {
    menu.subMenus?.forEach((subMenu: any) => {
      subMenu.actions?.forEach((action: any) => {
        const functionName = action.functionName;
        if (functionName) {
          const parsed = functionName.match(/^([A-Za-z_]\w*)\(/);
          const name = parsed ? parsed[1] : functionName;
          if (!knownFunctions.has(name)) {
            unhandled.push(`${menu.label} > ${subMenu.label} > ${action.label}: ${functionName}`);
          }
        }
      });
    });
  });

  return unhandled;
};

export const analyzeToolCoverage = (
  records: WorkbenchToolRecordMap
): {
  byCategory: Record<string, { count: number; avgCompletion: number }>;
  byStatus: Record<string, number>;
  byRisk: Record<string, number>;
} => {
  const tools = Object.values(records);

  const byCategory: Record<string, { count: number; avgCompletion: number }> = {};
  const byStatus: Record<string, number> = {};
  const byRisk: Record<string, number> = {};

  tools.forEach((tool) => {
    // By category
    if (!byCategory[tool.category]) {
      byCategory[tool.category] = { count: 0, avgCompletion: 0 };
    }
    byCategory[tool.category].count++;
    byCategory[tool.category].avgCompletion += tool.completion;

    // By status
    byStatus[tool.status] = (byStatus[tool.status] || 0) + 1;

    // By risk
    byRisk[tool.config.risk] = (byRisk[tool.config.risk] || 0) + 1;
  });

  // Calculate averages
  Object.keys(byCategory).forEach((category) => {
    const data = byCategory[category];
    data.avgCompletion = Math.round(data.avgCompletion / data.count);
  });

  return { byCategory, byStatus, byRisk };
};

export const suggestNextActions = (
  records: WorkbenchToolRecordMap,
  activeTool: string
): string[] => {
  const suggestions: string[] = [];
  const activeRecord = records[activeTool];

  if (!activeRecord) {
    suggestions.push("Select a tool to get started");
    return suggestions;
  }

  if (activeRecord.status === "draft") {
    suggestions.push("Set status to 'in_progress' to begin work");
  }

  if (activeRecord.owner === "unassigned") {
    suggestions.push("Assign an owner to this tool");
  }

  const incompleteTasks = activeRecord.checklist.filter((item) => !item.done);
  if (incompleteTasks.length > 0) {
    suggestions.push(`Complete ${incompleteTasks.length} remaining checklist items`);
  }

  if (!activeRecord.lastRunAt) {
    suggestions.push("Click 'Mark Run' to test the tool");
  }

  if (activeRecord.completion === 100 && activeRecord.status !== "ready") {
    suggestions.push("All tasks complete! Set status to 'ready'");
  }

  if (activeRecord.config.risk === "high") {
    suggestions.push("High risk tool - ensure thorough testing");
  }

  if (activeRecord.notes.trim() === "") {
    suggestions.push("Add implementation notes for documentation");
  }

  return suggestions;
};

// Export for browser console debugging
if (typeof window !== "undefined") {
  (window as any).rpgWorkbenchDebug = {
    generateDebugReport,
    validateToolRecord,
    exportDebugData,
    logDebugInfo,
    findUnhandledFunctions,
    analyzeToolCoverage,
    suggestNextActions,
  };
}
