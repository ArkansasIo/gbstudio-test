import { RPG_ENGINE_SYSTEMS } from "./engineSystems";
import { RPG_MENU_TREE } from "./menuTree";
import type { RPGToolInputDefinition } from "./types";

const dedupeTools = (tools: RPGToolInputDefinition[]): RPGToolInputDefinition[] => {
  const map = new Map<string, RPGToolInputDefinition>();
  tools.forEach((tool) => {
    if (!map.has(tool.id)) {
      map.set(tool.id, tool);
    }
  });
  return [...map.values()];
};

const menuTools = RPG_MENU_TREE.flatMap((menu) =>
  menu.subMenus.flatMap((subMenu) => subMenu.tools),
);

const engineTools = RPG_ENGINE_SYSTEMS.flatMap((system) => system.tools);

export const RPG_TOOL_REGISTRY = dedupeTools([...menuTools, ...engineTools]);

export const RPG_TOOL_LABELS = RPG_TOOL_REGISTRY.map((tool) => tool.label);
