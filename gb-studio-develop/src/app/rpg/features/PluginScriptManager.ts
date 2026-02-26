import type { RPGFeatureDefinition } from "./types";

export const PLUGIN_SCRIPT_MANAGER_FEATURE: RPGFeatureDefinition = {
  id: "plugin_script_manager",
  name: "Plugin/Script Manager",
  summary: "Manage plugin registration, script hooks, and runtime permissions.",
  status: "alpha",
  capabilities: [
    "Register script extension points",
    "Track enabled plugin modules",
    "Validate plugin compatibility",
  ],
};

export function initPluginScriptManager(): RPGFeatureDefinition {
  return PLUGIN_SCRIPT_MANAGER_FEATURE;
}
