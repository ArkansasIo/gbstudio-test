/**
 * Seeded Random Number Generator
 * Deterministic RNG for reproducible world generation
 */

export class SeededRNG {
  private state: number;

  constructor(seed: number) {
    this.state = seed >>> 0;
  }

  /**
   * xorshift32 algorithm
   */
  nextU32(): number {
    let x = this.state;
    x ^= x << 13;
    x >>>= 0;
    x ^= x >>> 17;
    x >>>= 0;
    x ^= x << 5;
    x >>>= 0;
    this.state = x;
    return x;
  }

  /**
   * Random float in [0, 1)
   */
  next(): number {
    return (this.nextU32() >>> 0) / 0x100000000;
  }

  /**
   * Random integer in [min, max] (inclusive)
   */
  int(min: number, max: number): number {
    if (max < min) [min, max] = [max, min];
    const r = this.next();
    return min + Math.floor(r * (max - min + 1));
  }

  /**
   * Random float in [min, max)
   */
  float(min: number, max: number): number {
    if (max < min) [min, max] = [max, min];
    return min + this.next() * (max - min);
  }

  /**
   * Pick random element from array
   */
  pick<T>(arr: readonly T[]): T {
    if (arr.length === 0) throw new Error('Cannot pick from empty array');
    return arr[this.int(0, arr.length - 1)];
  }

  /**
   * Weighted random selection
   */
  weightedPick<T>(items: readonly { item: T; weight: number }[]): T {
    const total = items.reduce((sum, it) => sum + Math.max(0, it.weight), 0);
    if (total <= 0) throw new Error('Total weight must be > 0');
    
    let threshold = this.next() * total;
    for (const it of items) {
      const w = Math.max(0, it.weight);
      if ((threshold -= w) <= 0) return it.item;
    }
    
    return items[items.length - 1].item;
  }

  /**
   * Shuffle array (Fisher-Yates)
   */
  shuffle<T>(arr: T[]): T[] {
    const result = [...arr];
    for (let i = result.length - 1; i > 0; i--) {
      const j = this.int(0, i);
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }
}
