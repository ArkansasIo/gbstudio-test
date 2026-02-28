import type { RPGFeatureDefinition } from "./types";

export const VISUAL_SCRIPT_DEBUGGER_FEATURE: RPGFeatureDefinition = {
  id: "visual_script_debugger",
  name: "Visual Script Debugger",
  summary: "Inspect event execution with breakpoints, watches, and step controls.",
  status: "alpha",
  capabilities: [
    "Add and remove breakpoints",
    "Watch variable values",
    "Step through script execution",
  ],
};

export function initVisualScriptDebugger(): RPGFeatureDefinition {
  return VISUAL_SCRIPT_DEBUGGER_FEATURE;
}
