import type { SciFiFeatureDefinition } from "./types";

export const FACTION_DIPLOMACY_SYSTEM_FEATURE: SciFiFeatureDefinition = {
  id: "faction_diplomacy_system",
  name: "Faction Diplomacy System",
  summary: "Define factions, configure relation scores, war triggers, and treaty templates.",
  status: "alpha",
  capabilities: [
    "Create faction profiles with ideology, territory, and traits",
    "Set default relation scores and faction-specific modifiers",
    "Author treaty templates with terms, penalties, and expiry rules",
  ],
};

export function initFactionDiplomacySystem(): SciFiFeatureDefinition {
  return FACTION_DIPLOMACY_SYSTEM_FEATURE;
}
