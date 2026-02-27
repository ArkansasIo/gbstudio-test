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

export interface RPGColorProfileDefinition {
  id: string;
  label: string;
  description: string;
  colors: Record<string, string>;
}

export type RPGSettingValue = string | number | boolean;

export type RPGSettingValueType = "boolean" | "number" | "select";

export interface RPGSettingOptionDefinition {
  id: string;
  label: string;
  valueType: RPGSettingValueType;
  defaultValue: RPGSettingValue;
  description: string;
  functionName: string;
  logic: string;
  choices?: Array<string | number>;
}

export interface RPGSettingGroupDefinition {
  id: string;
  label: string;
  description: string;
  options: RPGSettingOptionDefinition[];
}

export interface RPGSettingsPresetDefinition {
  id: string;
  label: string;
  description: string;
  values: Record<string, RPGSettingValue>;
}
