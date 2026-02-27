// 2D 8-bit Math Library for Game Boy & RPGs (Wolfman Alpha inspired)
// Provides fixed-point, vector, matrix, and RPG math utilities for 8-bit games

// --- Fixed-Point Math (8.8 format) ---
export function fxMul(a: number, b: number): number {
  // Multiply two 8.8 fixed-point numbers
  return ((a * b) >> 8) & 0xFFFF;
}

export function fxDiv(a: number, b: number): number {
  // Divide two 8.8 fixed-point numbers
  if (b === 0) return 0xFFFF;
  return ((a << 8) / b) & 0xFFFF;
}

export function fxFromInt(n: number): number {
  return (n << 8) & 0xFFFF;
}

export function fxToInt(fx: number): number {
  return (fx >> 8) & 0xFF;
}

// --- 2D Vector Math ---
export interface Vec2 {
  x: number;
  y: number;
}

export function vec2(x: number, y: number): Vec2 {
  return { x, y };
}

export function vec2Add(a: Vec2, b: Vec2): Vec2 {
  return { x: a.x + b.x, y: a.y + b.y };
}

export function vec2Sub(a: Vec2, b: Vec2): Vec2 {
  return { x: a.x - b.x, y: a.y - b.y };
}

export function vec2Dot(a: Vec2, b: Vec2): number {
  return a.x * b.x + a.y * b.y;
}

export function vec2Len(a: Vec2): number {
  return Math.sqrt(a.x * a.x + a.y * a.y);
}

export function vec2Scale(a: Vec2, s: number): Vec2 {
  return { x: a.x * s, y: a.y * s };
}

// --- 2x2 Matrix Math ---
export interface Mat2 {
  m00: number; m01: number;
  m10: number; m11: number;
}

export function mat2Identity(): Mat2 {
  return { m00: 1, m01: 0, m10: 0, m11: 1 };
}

export function mat2MulVec2(m: Mat2, v: Vec2): Vec2 {
  return {
    x: m.m00 * v.x + m.m01 * v.y,
    y: m.m10 * v.x + m.m11 * v.y
  };
}

export function mat2Mul(a: Mat2, b: Mat2): Mat2 {
  return {
    m00: a.m00 * b.m00 + a.m01 * b.m10,
    m01: a.m00 * b.m01 + a.m01 * b.m11,
    m10: a.m10 * b.m00 + a.m11 * b.m10,
    m11: a.m10 * b.m01 + a.m11 * b.m11
  };
}

// --- RPG Math: Damage, Stats, RNG ---
export function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function calcDamage(attacker: { atk: number }, defender: { def: number }, base = 10): number {
  // Simple RPG damage formula
  const damage = base + attacker.atk - defender.def;
  return clamp(damage, 1, 255);
}

export function calcExp(level: number): number {
  // Example: Wolfman Alpha style EXP curve
  return Math.floor(10 * Math.pow(level, 1.5));
}

export function statGrowth(base: number, level: number, growth: number): number {
  // Stat = base + level * growth
  return base + level * growth;
}

// --- Collision/Tile Math ---
export function tileIndex(x: number, y: number, width: number): number {
  return y * width + x;
}

export function isColliding(a: Vec2, b: Vec2, size = 8): boolean {
  return Math.abs(a.x - b.x) < size && Math.abs(a.y - b.y) < size;
}

// --- Angle/Trig (8-bit) ---
export function degToRad(deg: number): number {
  return deg * (Math.PI / 180);
}

export function radToDeg(rad: number): number {
  return rad * (180 / Math.PI);
}

// --- Utility ---
export function sign(n: number): number {
  return n < 0 ? -1 : n > 0 ? 1 : 0;
}

export function abs(n: number): number {
  return n < 0 ? -n : n;
}
