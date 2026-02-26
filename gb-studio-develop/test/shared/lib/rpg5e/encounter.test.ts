import {
  evaluateEncounter,
  getEncounterThresholdsForParty,
  xpForCr,
} from "shared/lib/rpg5e";

describe("rpg5e encounter", () => {
  it("returns XP for CR values", () => {
    expect(xpForCr("1/4")).toBe(50);
    expect(xpForCr(5)).toBe(1800);
  });

  it("sums thresholds for a party", () => {
    expect(getEncounterThresholdsForParty([1, 1, 1, 1])).toEqual({
      easy: 100,
      medium: 200,
      hard: 300,
      deadly: 400,
    });
  });

  it("evaluates encounter difficulty with multipliers", () => {
    const encounter = evaluateEncounter([1, 1, 1, 1], ["1/4", "1/4"]);
    expect(encounter.baseXp).toBe(100);
    expect(encounter.multiplier).toBe(1.5);
    expect(encounter.adjustedXp).toBe(150);
    expect(encounter.difficulty).toBe("easy");
  });
});
