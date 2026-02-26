import type { RPGFeatureDefinition } from "./types";

export const BATTLE_SYSTEM_DESIGNER_FEATURE: RPGFeatureDefinition = {
  id: "battle_system_designer",
  name: "Battle System Designer",
  summary: "Configure turn order, command flow, and encounter pacing rules.",
  status: "alpha",
  capabilities: [
    "Select battle mode templates",
    "Configure turn and action order",
    "Define battle command sets",
  ],
};

export function initBattleSystemDesigner(): RPGFeatureDefinition {
  return BATTLE_SYSTEM_DESIGNER_FEATURE;
}
