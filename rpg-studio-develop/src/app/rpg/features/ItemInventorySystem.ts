import type { RPGFeatureDefinition } from "./types";

export const ITEM_INVENTORY_SYSTEM_FEATURE: RPGFeatureDefinition = {
  id: "item_inventory_system",
  name: "Item/Inventory System Editor",
  summary: "Define item catalogs, stack rules, and inventory constraints.",
  status: "alpha",
  capabilities: [
    "Create consumable and equipment item entries",
    "Configure stack and carry limits",
    "Define inventory categories",
  ],
};

export function initItemInventorySystem(): RPGFeatureDefinition {
  return ITEM_INVENTORY_SYSTEM_FEATURE;
}
