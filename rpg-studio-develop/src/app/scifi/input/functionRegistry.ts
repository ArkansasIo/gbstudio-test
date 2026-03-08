import { SCIFI_ENGINE_SYSTEMS } from "./engineSystems";
import { SCIFI_MENU_TREE } from "./menuTree";

export const SCIFI_MENU_FUNCTION_REGISTRY = SCIFI_MENU_TREE.flatMap((menu) =>
  menu.subMenus.flatMap((subMenu) =>
    subMenu.actions.map(
      (action) => `${menu.label} > ${subMenu.label}: ${action.functionName}`,
    ),
  ),
);

export const SCIFI_ENGINE_FUNCTION_REGISTRY = SCIFI_ENGINE_SYSTEMS.flatMap(
  (system) =>
    system.functions.map((fn) => `${system.name}: ${fn}`),
);

export const SCIFI_FUNCTION_REGISTRY = [
  ...SCIFI_MENU_FUNCTION_REGISTRY,
  ...SCIFI_ENGINE_FUNCTION_REGISTRY,
];
