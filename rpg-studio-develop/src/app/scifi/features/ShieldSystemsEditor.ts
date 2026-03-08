import type { SciFiFeatureDefinition } from "./types";

export const SHIELD_SYSTEMS_EDITOR_FEATURE: SciFiFeatureDefinition = {
  id: "shield_systems_editor",
  name: "Shield Systems Editor",
  summary: "Design shield generators with capacity, recharge rates, facing distribution, and overload rules.",
  status: "alpha",
  capabilities: [
    "Set shield HP and recharge rate per facing quadrant",
    "Configure overload threshold and cascade failure behaviour",
    "Define shield type resistances against energy and kinetic damage",
  ],
};

export function initShieldSystemsEditor(): SciFiFeatureDefinition {
  return SHIELD_SYSTEMS_EDITOR_FEATURE;
}
