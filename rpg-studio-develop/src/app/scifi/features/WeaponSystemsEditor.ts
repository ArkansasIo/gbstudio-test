import type { SciFiFeatureDefinition } from "./types";

export const WEAPON_SYSTEMS_EDITOR_FEATURE: SciFiFeatureDefinition = {
  id: "weapon_systems_editor",
  name: "Weapon Systems Editor",
  summary: "Configure ballistic, energy, and missile weapon stats, firing arcs, and special effects.",
  status: "alpha",
  capabilities: [
    "Define damage, range, fire rate, and energy cost for each weapon",
    "Configure firing arc restrictions and hardpoint compatibility",
    "Set special effects such as EMP, armour-pierce, and splash damage",
  ],
};

export function initWeaponSystemsEditor(): SciFiFeatureDefinition {
  return WEAPON_SYSTEMS_EDITOR_FEATURE;
}
