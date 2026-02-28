import { SKILL_ABILITY_MAP } from "./data";
import type {
  Ability,
  AbilityScores,
  AttackRollInput,
  CharacterCombatStats,
  CheckResult,
  D20RollResult,
  DiceRollResult,
  RollContext,
  Skill,
} from "./types";

const clampMinOne = (v: number) => (v < 1 ? 1 : v);
const randInt = (max: number, rng: () => number) =>
  clampMinOne(Math.floor(rng() * max) + 1);

export const abilityModifier = (score: number): number =>
  Math.floor((score - 10) / 2);

export const proficiencyBonusByLevel = (level: number): number => {
  if (level <= 4) return 2;
  if (level <= 8) return 3;
  if (level <= 12) return 4;
  if (level <= 16) return 5;
  return 6;
};

export const getAbilityModifier = (
  abilityScores: AbilityScores,
  ability: Ability,
): number => abilityModifier(abilityScores[ability]);

export const rollD20 = (
  context: RollContext = {},
  rng: () => number = Math.random,
): D20RollResult => {
  const first = randInt(20, rng);
  const secondNeeded = !!context.advantage || !!context.disadvantage;
  const second = secondNeeded ? randInt(20, rng) : undefined;
  const usedAdvantage = !!context.advantage && !context.disadvantage;
  const usedDisadvantage = !!context.disadvantage && !context.advantage;

  let die = first;
  if (usedAdvantage && typeof second === "number") {
    die = Math.max(first, second);
  } else if (usedDisadvantage && typeof second === "number") {
    die = Math.min(first, second);
  }

  const bonus = context.bonus ?? 0;
  return {
    total: die + bonus,
    die,
    first,
    second,
    usedAdvantage,
    usedDisadvantage,
    bonus,
    isCriticalSuccess: die === 20,
    isCriticalFailure: die === 1,
  };
};

export const rollDice = (
  formula: string,
  rng: () => number = Math.random,
): DiceRollResult => {
  const cleaned = formula.replace(/\s+/g, "");
  const match = cleaned.match(/^(\d*)d(\d+)([+-]\d+)?$/i);
  if (!match) {
    throw new Error(`Invalid dice formula: ${formula}`);
  }
  const count = parseInt(match[1] || "1", 10);
  const sides = parseInt(match[2], 10);
  const modifier = parseInt(match[3] || "0", 10);
  if (count < 1 || sides < 2) {
    throw new Error(`Invalid dice values in formula: ${formula}`);
  }
  const terms = [...Array(count)].map(() => randInt(sides, rng));
  const total = terms.reduce((sum, term) => sum + term, 0) + modifier;
  return { total, formula: cleaned, terms, modifier };
};

export const abilityCheck = (
  abilityScores: AbilityScores,
  ability: Ability,
  dc: number,
  context: RollContext = {},
  rng: () => number = Math.random,
): CheckResult => {
  const mod = getAbilityModifier(abilityScores, ability);
  const roll = rollD20({ ...context, bonus: (context.bonus ?? 0) + mod }, rng);
  return { roll, dc, success: roll.total >= dc };
};

export const savingThrow = (
  abilityScores: AbilityScores,
  ability: Ability,
  dc: number,
  proficient: boolean,
  proficiencyBonus: number,
  context: RollContext = {},
  rng: () => number = Math.random,
): CheckResult => {
  const mod = getAbilityModifier(abilityScores, ability);
  const prof = proficient ? proficiencyBonus : 0;
  const roll = rollD20(
    { ...context, bonus: (context.bonus ?? 0) + mod + prof },
    rng,
  );
  return { roll, dc, success: roll.total >= dc };
};

export const skillCheck = (
  abilityScores: AbilityScores,
  skill: Skill,
  dc: number,
  proficient: boolean,
  proficiencyBonus: number,
  context: RollContext = {},
  rng: () => number = Math.random,
): CheckResult => {
  const ability = SKILL_ABILITY_MAP[skill];
  return savingThrow(
    abilityScores,
    ability,
    dc,
    proficient,
    proficiencyBonus,
    context,
    rng,
  );
};

export const passiveScore = (
  modifier: number,
  proficient: boolean,
  proficiencyBonus: number,
): number => 10 + modifier + (proficient ? proficiencyBonus : 0);

export const initiativeRoll = (
  dexterityScore: number,
  context: RollContext = {},
  rng: () => number = Math.random,
): D20RollResult =>
  rollD20(
    { ...context, bonus: (context.bonus ?? 0) + abilityModifier(dexterityScore) },
    rng,
  );

export const attackRoll = (
  input: AttackRollInput,
  rng: () => number = Math.random,
): D20RollResult => {
  const prof = input.proficient ? input.proficiencyBonus ?? 0 : 0;
  const bonus = (input.bonus ?? 0) + input.abilityModifier + prof;
  return rollD20({ ...input, bonus }, rng);
};

export const spellSaveDC = (
  castingAbilityModifier: number,
  proficiencyBonus: number,
): number => 8 + castingAbilityModifier + proficiencyBonus;

export const spellAttackBonus = (
  castingAbilityModifier: number,
  proficiencyBonus: number,
): number => castingAbilityModifier + proficiencyBonus;

export const damageRoll = (
  baseFormula: string,
  bonus = 0,
  critical = false,
  rng: () => number = Math.random,
): DiceRollResult => {
  const cleaned = baseFormula.replace(/\s+/g, "");
  const match = cleaned.match(/^(\d*)d(\d+)([+-]\d+)?$/i);
  if (!match) {
    throw new Error(`Invalid damage formula: ${baseFormula}`);
  }
  const count = parseInt(match[1] || "1", 10);
  const sides = parseInt(match[2], 10);
  const modifier = parseInt(match[3] || "0", 10) + bonus;
  const rollCount = critical ? count * 2 : count;
  const terms = [...Array(rollCount)].map(() => randInt(sides, rng));
  const total = terms.reduce((sum, term) => sum + term, 0) + modifier;
  return {
    total,
    formula: `${critical ? rollCount : count}d${sides}${modifier >= 0 ? "+" : ""}${modifier}`,
    terms,
    modifier,
  };
};

export const contestedCheck = (
  leftBonus: number,
  rightBonus: number,
  rng: () => number = Math.random,
) => {
  const left = rollD20({ bonus: leftBonus }, rng);
  const right = rollD20({ bonus: rightBonus }, rng);
  if (left.total === right.total) {
    return { left, right, winner: "tie" as const };
  }
  return {
    left,
    right,
    winner: left.total > right.total ? ("left" as const) : ("right" as const),
  };
};

export const shortRestSpendHitDice = (
  currentHp: number,
  maxHp: number,
  hitDieFaces: number,
  conModifier: number,
  spentDice: number,
  rng: () => number = Math.random,
) => {
  const roll = rollDice(`${spentDice}d${hitDieFaces}`, rng);
  const healed = Math.max(0, roll.total + spentDice * conModifier);
  const nextHp = Math.min(maxHp, currentHp + healed);
  return { healed, nextHp, roll };
};

export const longRestRecover = (
  currentHp: number,
  maxHp: number,
  totalHitDice: number,
  spentHitDice: number,
) => {
  const recoveredHp = maxHp;
  const recoverDice = Math.floor(totalHitDice / 2);
  const remainingSpentDice = Math.max(0, spentHitDice - recoverDice);
  return {
    nextHp: recoveredHp,
    recoveredHitDice: recoverDice,
    remainingSpentDice,
  };
};

export const deriveCombatStats = (
  level: number,
  abilityScores: AbilityScores,
): CharacterCombatStats => ({
  level,
  abilityScores,
  proficiencyBonus: proficiencyBonusByLevel(level),
});
