import type { RPGFeatureDefinition } from "./types";

export const IMPORT_EXPORT_TOOL_FEATURE: RPGFeatureDefinition = {
  id: "import_export_tool",
  name: "Import/Export Tool",
  summary: "Move projects and assets in and out with validation checks.",
  status: "alpha",
  capabilities: [
    "Import assets from structured bundles",
    "Export project subsets",
    "Validate required dependencies",
  ],
};

export function initImportExportTool(): RPGFeatureDefinition {
  return IMPORT_EXPORT_TOOL_FEATURE;
}
