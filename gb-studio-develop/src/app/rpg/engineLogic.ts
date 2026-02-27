import { RPG_ENGINE_FUNCTION_REGISTRY, RPG_ENGINE_SYSTEMS } from "./input";

export type EngineLogicDomain =
  | "combat"
  | "world"
  | "progression"
  | "systems"
  | "runtime";

export interface EngineLogicToolDefinition {
  id: string;
  name: string;
  domain: EngineLogicDomain;
  description: string;
  functions: string[];
}

export const RPG_ENGINE_LOGIC_TOOLS: EngineLogicToolDefinition[] =
  RPG_ENGINE_SYSTEMS.map((system) => ({
    id: system.id,
    name: system.name,
    domain: system.domain,
    description: system.summary,
    functions: system.functions,
  }));

export const RPG_ENGINE_LOGIC = RPG_ENGINE_SYSTEMS.map((system) => system.summary);

export const RPG_ENGINE_FUNCTIONS = RPG_ENGINE_FUNCTION_REGISTRY;
