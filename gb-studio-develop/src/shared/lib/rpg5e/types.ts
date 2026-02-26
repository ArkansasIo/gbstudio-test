export type Ability =
  | "strength"
  | "dexterity"
  | "constitution"
  | "intelligence"
  | "wisdom"
  | "charisma";

export type Skill =
  | "acrobatics"
  | "animalHandling"
  | "arcana"
  | "athletics"
  | "deception"
  | "history"
  | "insight"
  | "intimidation"
  | "investigation"
  | "medicine"
  | "nature"
  | "perception"
  | "performance"
  | "persuasion"
  | "religion"
  | "sleightOfHand"
  | "stealth"
  | "survival";

export interface AbilityScores {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export interface RollContext {
  advantage?: boolean;
  disadvantage?: boolean;
  bonus?: number;
}

export interface D20RollResult {
  total: number;
  die: number;
  first: number;
  second?: number;
  usedAdvantage: boolean;
  usedDisadvantage: boolean;
  bonus: number;
  isCriticalSuccess: boolean;
  isCriticalFailure: boolean;
}

export interface DiceRollResult {
  total: number;
  formula: string;
  terms: number[];
  modifier: number;
}

export interface CheckResult {
  roll: D20RollResult;
  dc: number;
  success: boolean;
}

export interface AttackRollInput extends RollContext {
  abilityModifier: number;
  proficiencyBonus?: number;
  proficient?: boolean;
}

export interface CharacterCombatStats {
  level: number;
  abilityScores: AbilityScores;
  proficiencyBonus?: number;
}
