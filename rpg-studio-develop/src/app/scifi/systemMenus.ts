import { SCIFI_MENU_FUNCTION_REGISTRY, SCIFI_MENU_TREE } from "./input";

export interface SciFiMenuActionDefinition {
  id: string;
  label: string;
  functionName: string;
}

export interface SciFiSubMenuDefinition {
  id: string;
  label: string;
  tools: string[];
  actions: SciFiMenuActionDefinition[];
}

export interface SciFiSystemMenuDefinition {
  id: string;
  label: string;
  subMenus: SciFiSubMenuDefinition[];
}

export const SCIFI_SYSTEM_MENU_DEFINITIONS: SciFiSystemMenuDefinition[] =
  SCIFI_MENU_TREE.map((menu) => ({
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
  }));

export const SCIFI_SYSTEM_MENUS = SCIFI_SYSTEM_MENU_DEFINITIONS.map(
  (menu) => menu.label,
);

export const SCIFI_SYSTEM_SUB_MENUS = SCIFI_SYSTEM_MENU_DEFINITIONS.flatMap(
  (menu) =>
    menu.subMenus.map((subMenu) => `${menu.label}: ${subMenu.label}`),
);

export const SCIFI_SYSTEM_MENU_FUNCTIONS = SCIFI_MENU_FUNCTION_REGISTRY;
