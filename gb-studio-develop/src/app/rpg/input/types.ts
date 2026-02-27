export type RPGToolCategory =
  | "authoring"
  | "runtime"
  | "debug"
  | "build"
  | "content";

export interface RPGToolInputDefinition {
  id: string;
  label: string;
  category: RPGToolCategory;
  description: string;
}

export interface RPGActionInputDefinition {
  id: string;
  label: string;
  functionName: string;
}

export interface RPGSubMenuInputDefinition {
  id: string;
  label: string;
  tools: RPGToolInputDefinition[];
  actions: RPGActionInputDefinition[];
}

export interface RPGMenuInputDefinition {
  id: string;
  label: string;
  subMenus: RPGSubMenuInputDefinition[];
}

export type RPGEngineDomain =
  | "combat"
  | "world"
  | "progression"
  | "systems"
  | "runtime";

export interface RPGEngineSystemInputDefinition {
  id: string;
  name: string;
  domain: RPGEngineDomain;
  summary: string;
  tools: RPGToolInputDefinition[];
  functions: string[];
}
