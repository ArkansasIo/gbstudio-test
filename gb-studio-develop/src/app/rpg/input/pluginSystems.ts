export type PluginTemplateType =
  | "feature"
  | "runtime"
  | "integration"
  | "tooling"
  | "mmorpg";

export interface RPGPluginTemplate {
  id: string;
  name: string;
  type: PluginTemplateType;
  summary: string;
  extensionPoints: string[];
  apiHooks: string[];
}

export const RPG_PLUGIN_SYSTEM_TEMPLATES: RPGPluginTemplate[] = [
  {
    id: "plugin-combat-rule-pack",
    name: "Combat Rule Pack Plugin",
    type: "feature",
    summary: "Inject custom hit, crit, and elemental resolution rules.",
    extensionPoints: ["battle:start", "battle:beforeDamage", "battle:afterDamage"],
    apiHooks: ["registerCombatRule", "overrideDamageFormula", "registerStatusResolver"],
  },
  {
    id: "plugin-quest-procedural",
    name: "Procedural Quest Generator Plugin",
    type: "feature",
    summary: "Generate quest lines from templates and world state tags.",
    extensionPoints: ["quest:create", "quest:advance", "quest:complete"],
    apiHooks: ["registerQuestTemplate", "generateQuest", "bindQuestRewards"],
  },
  {
    id: "plugin-economy-dynamic",
    name: "Dynamic Economy Plugin",
    type: "runtime",
    summary: "Adjust shop prices and drops based on market telemetry.",
    extensionPoints: ["economy:tick", "shop:open", "loot:roll"],
    apiHooks: ["registerPriceModifier", "registerLootModifier", "emitEconomyMetric"],
  },
  {
    id: "plugin-chat-moderation",
    name: "Chat Moderation Plugin",
    type: "mmorpg",
    summary: "Filter, moderate, and audit social channels for MMO flows.",
    extensionPoints: ["chat:send", "chat:receive", "chat:moderation"],
    apiHooks: ["registerChatFilter", "registerModerationPolicy", "flagMessage"],
  },
  {
    id: "plugin-raid-orchestrator",
    name: "Raid Orchestrator Plugin",
    type: "mmorpg",
    summary: "Coordinate raid phases, mechanics, and reward distribution.",
    extensionPoints: ["raid:start", "raid:phase", "raid:complete"],
    apiHooks: ["registerRaidMechanic", "advanceRaidPhase", "grantRaidRewards"],
  },
  {
    id: "plugin-analytics-sink",
    name: "Analytics Sink Plugin",
    type: "integration",
    summary: "Forward gameplay telemetry to custom analytics backends.",
    extensionPoints: ["telemetry:event", "session:start", "session:end"],
    apiHooks: ["registerTelemetrySink", "emitEvent", "flushSessionMetrics"],
  },
  {
    id: "plugin-localization-pipeline",
    name: "Localization Pipeline Plugin",
    type: "tooling",
    summary: "Automate extraction, validation, and packaging of localization keys.",
    extensionPoints: ["content:export", "localization:validate", "build:package"],
    apiHooks: ["extractLocalizationKeys", "validateLocalizationBundle", "packageLanguagePack"],
  },
  {
    id: "plugin-save-migration-kit",
    name: "Save Migration Kit Plugin",
    type: "runtime",
    summary: "Version and migrate save payloads with rollback safeguards.",
    extensionPoints: ["save:load", "save:migrate", "save:write"],
    apiHooks: ["registerSaveMigration", "validateSaveSchema", "backupSaveSlot"],
  },
];

export const RPG_PLUGIN_TEMPLATE_LABELS = RPG_PLUGIN_SYSTEM_TEMPLATES.map(
  (plugin) => `${plugin.name} [${plugin.type}]`,
);
