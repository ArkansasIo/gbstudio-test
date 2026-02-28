export type EightBitTarget = "gameboy" | "nes" | "sms" | "generic-8bit";

export interface WolfmanAlphaConfig {
  target: EightBitTarget;
  maxLevel: number;
  baseExp: number;
  expExponent: number;
  damageFloor: number;
  damageCeil: number;
}

export const defaultWolfmanAlphaConfig: WolfmanAlphaConfig = {
  target: "gameboy",
  maxLevel: 99,
  baseExp: 10,
  expExponent: 1.5,
  damageFloor: 1,
  damageCeil: 255,
};

export interface CombatantStats {
  atk: number;
  def: number;
  level: number;
}

export const wolfmanAlphaExpForLevel = (
  level: number,
  config: WolfmanAlphaConfig = defaultWolfmanAlphaConfig,
): number => {
  const clampedLevel = Math.max(1, Math.min(config.maxLevel, level));
  return Math.floor(config.baseExp * Math.pow(clampedLevel, config.expExponent));
};

export const wolfmanAlphaDamage = (
  attacker: CombatantStats,
  defender: CombatantStats,
  config: WolfmanAlphaConfig = defaultWolfmanAlphaConfig,
): number => {
  const levelScale = Math.max(1, attacker.level - defender.level + 1);
  const raw = attacker.atk * levelScale - defender.def;
  return Math.max(config.damageFloor, Math.min(config.damageCeil, raw));
};

export const wolfmanAlphaDebugLine = (
  message: string,
  target: EightBitTarget = "gameboy",
): string => {
  return `[WolfmanAlpha/${target}] ${message}`;
};
