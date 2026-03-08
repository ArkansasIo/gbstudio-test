import { SCIFI_ENGINE_FUNCTION_REGISTRY, SCIFI_ENGINE_SYSTEMS } from "./input";

export type SciFiEngineLogicDomain =
  | "combat"
  | "navigation"
  | "systems"
  | "crew"
  | "runtime";

export interface SciFiEngineLogicToolDefinition {
  id: string;
  name: string;
  domain: SciFiEngineLogicDomain;
  description: string;
  functions: string[];
}

export const SCIFI_ENGINE_LOGIC_TOOLS: SciFiEngineLogicToolDefinition[] =
  SCIFI_ENGINE_SYSTEMS.map((system) => ({
    id: system.id,
    name: system.name,
    domain: system.domain,
    description: system.summary,
    functions: system.functions,
  }));

export const SCIFI_ENGINE_LOGIC = SCIFI_ENGINE_SYSTEMS.map(
  (system) => system.summary,
);

export const SCIFI_ENGINE_FUNCTIONS = SCIFI_ENGINE_FUNCTION_REGISTRY;
