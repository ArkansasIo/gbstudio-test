import type { RollContext } from "./types";

export type ConditionName =
  | "blinded"
  | "charmed"
  | "deafened"
  | "frightened"
  | "grappled"
  | "incapacitated"
  | "invisible"
  | "paralyzed"
  | "petrified"
  | "poisoned"
  | "prone"
  | "restrained"
  | "stunned"
  | "unconscious";

export interface ConditionEffect {
  name: ConditionName;
  blocksActions?: boolean;
  blocksMovement?: boolean;
  imposesDisadvantageOnAttackRolls?: boolean;
  grantsAdvantageToAttackers?: boolean;
  imposesDisadvantageOnAbilityChecks?: boolean;
}

export const CONDITION_EFFECTS: Record<ConditionName, ConditionEffect> = {
  blinded: {
    name: "blinded",
    imposesDisadvantageOnAttackRolls: true,
    grantsAdvantageToAttackers: true,
  },
  charmed: { name: "charmed" },
  deafened: { name: "deafened" },
  frightened: {
    name: "frightened",
    imposesDisadvantageOnAbilityChecks: true,
    imposesDisadvantageOnAttackRolls: true,
  },
  grappled: { name: "grappled", blocksMovement: true },
  incapacitated: { name: "incapacitated", blocksActions: true },
  invisible: { name: "invisible", grantsAdvantageToAttackers: false },
  paralyzed: {
    name: "paralyzed",
    blocksActions: true,
    blocksMovement: true,
    grantsAdvantageToAttackers: true,
  },
  petrified: {
    name: "petrified",
    blocksActions: true,
    blocksMovement: true,
    grantsAdvantageToAttackers: true,
  },
  poisoned: {
    name: "poisoned",
    imposesDisadvantageOnAttackRolls: true,
    imposesDisadvantageOnAbilityChecks: true,
  },
  prone: { name: "prone" },
  restrained: {
    name: "restrained",
    blocksMovement: true,
    imposesDisadvantageOnAttackRolls: true,
    grantsAdvantageToAttackers: true,
  },
  stunned: {
    name: "stunned",
    blocksActions: true,
    blocksMovement: true,
    grantsAdvantageToAttackers: true,
  },
  unconscious: {
    name: "unconscious",
    blocksActions: true,
    blocksMovement: true,
    grantsAdvantageToAttackers: true,
  },
};

export const hasCondition = (
  conditions: ConditionName[],
  condition: ConditionName,
): boolean => conditions.includes(condition);

export const addCondition = (
  conditions: ConditionName[],
  condition: ConditionName,
): ConditionName[] => (conditions.includes(condition) ? conditions : [...conditions, condition]);

export const removeCondition = (
  conditions: ConditionName[],
  condition: ConditionName,
): ConditionName[] => conditions.filter((entry) => entry !== condition);

export const canTakeActions = (conditions: ConditionName[]): boolean =>
  !conditions.some((entry) => CONDITION_EFFECTS[entry].blocksActions);

export const canMove = (conditions: ConditionName[]): boolean =>
  !conditions.some((entry) => CONDITION_EFFECTS[entry].blocksMovement);

export const attackRollContextFromConditions = (
  conditions: ConditionName[],
): RollContext => {
  const disadvantage = conditions.some(
    (entry) => CONDITION_EFFECTS[entry].imposesDisadvantageOnAttackRolls,
  );
  return disadvantage ? { disadvantage: true } : {};
};

export const abilityCheckContextFromConditions = (
  conditions: ConditionName[],
): RollContext => {
  const disadvantage = conditions.some(
    (entry) => CONDITION_EFFECTS[entry].imposesDisadvantageOnAbilityChecks,
  );
  return disadvantage ? { disadvantage: true } : {};
};
