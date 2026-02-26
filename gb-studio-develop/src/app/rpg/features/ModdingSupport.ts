import type { RPGFeatureDefinition } from "./types";

export const MODDING_SUPPORT_FEATURE: RPGFeatureDefinition = {
  id: "modding_support",
  name: "Modding Support Tools",
  summary: "Provide mod package metadata, compatibility checks, and load order info.",
  status: "alpha",
  capabilities: [
    "Register mod manifests",
    "Check feature compatibility",
    "Track mod dependency order",
  ],
};

export function initModdingSupport(): RPGFeatureDefinition {
  return MODDING_SUPPORT_FEATURE;
}
