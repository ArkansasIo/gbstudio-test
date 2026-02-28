import type { RPGFeatureDefinition } from "./types";

export const ENEMY_AI_EDITOR_FEATURE: RPGFeatureDefinition = {
  id: "enemy_ai_editor",
  name: "Enemy AI Behavior Editor",
  summary: "Configure behavior states, transitions, and combat priorities.",
  status: "alpha",
  capabilities: [
    "Define AI states",
    "Set transition conditions",
    "Tune decision priorities",
  ],
};

export function initEnemyAIEditor(): RPGFeatureDefinition {
  return ENEMY_AI_EDITOR_FEATURE;
}
