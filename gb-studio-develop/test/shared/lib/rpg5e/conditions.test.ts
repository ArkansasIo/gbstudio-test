import {
  addCondition,
  attackRollContextFromConditions,
  abilityCheckContextFromConditions,
  canMove,
  canTakeActions,
  hasCondition,
  removeCondition,
} from "shared/lib/rpg5e";

describe("rpg5e conditions", () => {
  it("adds and removes conditions without duplicates", () => {
    const withPoisoned = addCondition([], "poisoned");
    const withDuplicate = addCondition(withPoisoned, "poisoned");

    expect(withDuplicate).toEqual(["poisoned"]);
    expect(hasCondition(withDuplicate, "poisoned")).toBe(true);

    const removed = removeCondition(withDuplicate, "poisoned");
    expect(removed).toEqual([]);
    expect(hasCondition(removed, "poisoned")).toBe(false);
  });

  it("blocks actions and movement for relevant conditions", () => {
    expect(canTakeActions(["incapacitated"])).toBe(false);
    expect(canMove(["grappled"])).toBe(false);
    expect(canTakeActions(["poisoned"])).toBe(true);
    expect(canMove(["poisoned"])).toBe(true);
  });

  it("applies disadvantage to attack and ability checks when required", () => {
    expect(attackRollContextFromConditions(["poisoned"])).toEqual({
      disadvantage: true,
    });
    expect(abilityCheckContextFromConditions(["frightened"])).toEqual({
      disadvantage: true,
    });
    expect(attackRollContextFromConditions(["charmed"])).toEqual({});
  });
});
