import type { RPGFeatureDefinition } from "./types";

export const SKILL_ABILITY_EDITOR_FEATURE: RPGFeatureDefinition = {
  id: "skill_ability_editor",
  name: "Skill/Ability Editor",
  summary: "Author abilities, resource costs, and effects for actors and enemies.",
  status: "alpha",
  capabilities: [
    "Define active and passive skills",
    "Configure cost and cooldown rules",
    "Attach effect formulas",
  ],
};

export function initSkillAbilityEditor(): RPGFeatureDefinition {
  return SKILL_ABILITY_EDITOR_FEATURE;
}
