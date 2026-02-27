import { RPG_FEATURE_DEFINITIONS } from "app/rpg/features";
import {
  RPG_ENGINE_SYSTEMS,
  RPG_PLUGIN_SYSTEM_TEMPLATES,
  RPG_PREMADE_SYSTEMS,
  RPG_TEMPLATE_LIBRARY,
} from "app/rpg/input";
import type { RpgRuntimeAction } from "./types";

const stripLabelSuffix = (label: string): string =>
  label.replace(/\s+\[[^\]]+\]\s*$/, "").trim();

const ensureFunctionCall = (fn: string): string =>
  fn.includes("(") ? fn : `${fn}()`;

export const resolveFeatureAction = (label: string): RpgRuntimeAction | null => {
  const clean = label.trim();
  if (!clean) return null;

  if (clean.includes(":")) {
    const featureName = clean.slice(0, clean.indexOf(":")).trim();
    const capability = clean.slice(clean.indexOf(":") + 1).trim();
    if (!featureName) return null;
    return {
      source: `Feature ${featureName}`,
      toolLabel: featureName,
      message: capability || `Feature opened: ${featureName}`,
    };
  }

  return {
    source: `Feature ${clean}`,
    toolLabel: clean,
    message: `Feature opened: ${clean}`,
  };
};

export const resolveEngineLogicAction = (
  summaryOrName: string,
): RpgRuntimeAction | null => {
  const clean = stripLabelSuffix(summaryOrName);
  const system = RPG_ENGINE_SYSTEMS.find(
    (entry) => entry.summary === clean || entry.name === clean,
  );
  if (!system) return null;
  return {
    source: `Engine Logic ${system.name}`,
    toolLabel: system.tools[0]?.label ?? system.name,
    functionName: system.functions[0]
      ? ensureFunctionCall(system.functions[0])
      : undefined,
    message: `Engine logic opened: ${system.name}`,
  };
};

export const resolvePremadeSystemAction = (label: string): RpgRuntimeAction | null => {
  const clean = label.trim();
  const system = RPG_PREMADE_SYSTEMS.find(
    (entry) => `${entry.name} [${entry.category}]` === clean || entry.name === clean,
  );
  if (!system) return null;
  return {
    source: `Premade ${system.name}`,
    toolLabel: system.includes[0] || system.name,
    message: `Premade system loaded: ${system.name}`,
  };
};

export const resolveTemplateAction = (label: string): RpgRuntimeAction | null => {
  const clean = label.trim();
  const template = RPG_TEMPLATE_LIBRARY.find(
    (entry) => `${entry.name} [${entry.domain}]` === clean || entry.name === clean,
  );
  if (!template) return null;
  return {
    source: `Template ${template.name}`,
    toolLabel: template.name,
    message: `Template opened: ${template.name} (${template.fields.length} fields)`,
  };
};

export const resolvePluginTemplateAction = (
  label: string,
): RpgRuntimeAction | null => {
  const clean = label.trim();
  const plugin = RPG_PLUGIN_SYSTEM_TEMPLATES.find(
    (entry) => `${entry.name} [${entry.type}]` === clean || entry.name === clean,
  );
  if (!plugin) return null;
  return {
    source: `Plugin ${plugin.name}`,
    toolLabel: plugin.name,
    functionName: plugin.apiHooks[0]
      ? ensureFunctionCall(plugin.apiHooks[0])
      : undefined,
    message: `Plugin template opened: ${plugin.name}`,
  };
};

export const isKnownFeature = (name: string): boolean =>
  RPG_FEATURE_DEFINITIONS.some((feature) => feature.name === name.trim());

