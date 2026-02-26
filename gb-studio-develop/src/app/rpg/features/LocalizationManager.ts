import type { RPGFeatureDefinition } from "./types";

export const LOCALIZATION_MANAGER_FEATURE: RPGFeatureDefinition = {
  id: "localization_manager",
  name: "Localization/Translation Manager",
  summary: "Track language packs, missing keys, and translation quality checks.",
  status: "alpha",
  capabilities: [
    "Register supported locales",
    "Detect missing translation keys",
    "Export translation bundles",
  ],
};

export function initLocalizationManager(): RPGFeatureDefinition {
  return LOCALIZATION_MANAGER_FEATURE;
}
