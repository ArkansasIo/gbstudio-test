export type SciFiToolCategory =
  | "authoring"
  | "runtime"
  | "debug"
  | "build"
  | "content";

export interface SciFiToolInputDefinition {
  id: string;
  label: string;
  category: SciFiToolCategory;
  description: string;
}

export interface SciFiActionInputDefinition {
  id: string;
  label: string;
  functionName: string;
}

export interface SciFiSubMenuInputDefinition {
  id: string;
  label: string;
  tools: SciFiToolInputDefinition[];
  actions: SciFiActionInputDefinition[];
}

export interface SciFiMenuInputDefinition {
  id: string;
  label: string;
  subMenus: SciFiSubMenuInputDefinition[];
}

export type SciFiEngineDomain =
  | "combat"
  | "navigation"
  | "systems"
  | "crew"
  | "runtime";

export interface SciFiEngineSystemInputDefinition {
  id: string;
  name: string;
  domain: SciFiEngineDomain;
  summary: string;
  tools: SciFiToolInputDefinition[];
  functions: string[];
}
