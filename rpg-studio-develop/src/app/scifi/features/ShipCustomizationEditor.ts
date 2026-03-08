import type { SciFiFeatureDefinition } from "./types";

export const SHIP_CUSTOMIZATION_EDITOR_FEATURE: SciFiFeatureDefinition = {
  id: "ship_customization_editor",
  name: "Ship Customization Editor",
  summary: "Apply cosmetic paint schemes, decals, nameplates, and livery options to ship classes.",
  status: "planned",
  capabilities: [
    "Define colour zones and paint material regions per hull",
    "Create decal libraries with faction and custom insignia",
    "Preview full customisation in a 3D viewport render",
  ],
};

export function initShipCustomizationEditor(): SciFiFeatureDefinition {
  return SHIP_CUSTOMIZATION_EDITOR_FEATURE;
}
