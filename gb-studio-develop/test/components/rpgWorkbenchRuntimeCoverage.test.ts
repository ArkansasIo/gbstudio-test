import { RPG_ENGINE_SYSTEMS, RPG_MENU_TREE } from "app/rpg/input";
import {
  createInitialEditorState,
  executeRpgMenuFunction,
} from "components/rpgMakerEditorSystems";

const collectWorkbenchFunctionCalls = (): string[] => {
  const menuCalls = RPG_MENU_TREE.flatMap((menu) =>
    menu.subMenus.flatMap((subMenu) =>
      subMenu.actions.map((action) => action.functionName),
    ),
  );
  const engineCalls = RPG_ENGINE_SYSTEMS.flatMap((system) => system.functions);
  return [...new Set([...menuCalls, ...engineCalls])];
};

describe("RPG workbench runtime coverage", () => {
  test("handles all registered menu and engine function calls", () => {
    const functionCalls = collectWorkbenchFunctionCalls();
    let state = createInitialEditorState();
    const unhandled: string[] = [];

    functionCalls.forEach((fnCall) => {
      const nextState = executeRpgMenuFunction(state, fnCall, "Coverage");
      const lastLog = nextState.outputLog[nextState.outputLog.length - 1] ?? "";
      if (lastLog.includes("[WARN] Unhandled RPG function")) {
        unhandled.push(`${fnCall} -> ${lastLog}`);
      }
      state = nextState;
    });

    expect(unhandled).toEqual([]);
  });
});
