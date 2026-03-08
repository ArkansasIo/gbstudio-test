import type { SciFiFeatureDefinition } from "./types";

export const ALIEN_SPECIES_DATABASE_FEATURE: SciFiFeatureDefinition = {
  id: "alien_species_database",
  name: "Alien Species Database",
  summary: "Define alien species with biology, culture, technology level, traits, and relations.",
  status: "alpha",
  capabilities: [
    "Author species profiles with biological and cultural attributes",
    "Assign default technology tiers and combat traits",
    "Configure inter-species relation defaults and bonuses",
  ],
};

export function initAlienSpeciesDatabase(): SciFiFeatureDefinition {
  return ALIEN_SPECIES_DATABASE_FEATURE;
}
