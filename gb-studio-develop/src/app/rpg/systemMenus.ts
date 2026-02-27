import { RPG_MENU_FUNCTION_REGISTRY, RPG_MENU_TREE } from "./input";

export interface RPGMenuActionDefinition {
  id: string;
  label: string;
  functionName: string;
}

export interface RPGSubMenuDefinition {
  id: string;
  label: string;
  tools: string[];
  actions: RPGMenuActionDefinition[];
}

export interface RPGSystemMenuDefinition {
  id: string;
  label: string;
  subMenus: RPGSubMenuDefinition[];
}

export const RPG_SYSTEM_MENU_DEFINITIONS: RPGSystemMenuDefinition[] = RPG_MENU_TREE.map(
  (menu) => ({
    id: menu.id,
    label: menu.label,
    subMenus: menu.subMenus.map((subMenu) => ({
      id: subMenu.id,
      label: subMenu.label,
      tools: subMenu.tools.map((tool) => tool.label),
      actions: subMenu.actions.map((action) => ({
        id: action.id,
        label: action.label,
        functionName: action.functionName,
      })),
    })),
  }),
);

export const RPG_SYSTEM_MENUS = RPG_SYSTEM_MENU_DEFINITIONS.map(
  (menu) => menu.label,
);

export const RPG_SYSTEM_SUB_MENUS = RPG_SYSTEM_MENU_DEFINITIONS.flatMap((menu) =>
  menu.subMenus.map((subMenu) => `${menu.label}: ${subMenu.label}`),
);

export const RPG_SYSTEM_MENU_FUNCTIONS = RPG_MENU_FUNCTION_REGISTRY;
