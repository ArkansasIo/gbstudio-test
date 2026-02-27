import { RPG_ENGINE_SYSTEMS } from "./engineSystems";
import { RPG_MENU_TREE } from "./menuTree";

export const RPG_MENU_FUNCTION_REGISTRY = RPG_MENU_TREE.flatMap((menu) =>
  menu.subMenus.flatMap((subMenu) =>
    subMenu.actions.map(
      (action) => `${menu.label} > ${subMenu.label}: ${action.functionName}`,
    ),
  ),
);

export const RPG_ENGINE_FUNCTION_REGISTRY = RPG_ENGINE_SYSTEMS.flatMap((system) =>
  system.functions.map((fn) => `${system.name}: ${fn}`),
);

export const RPG_FUNCTION_REGISTRY = [
  ...RPG_MENU_FUNCTION_REGISTRY,
  ...RPG_ENGINE_FUNCTION_REGISTRY,
];
