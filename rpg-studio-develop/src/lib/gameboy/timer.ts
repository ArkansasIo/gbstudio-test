/**
 * Game Boy Timer Emulator
 */

import type { GameBoyState } from './types';
import { CPU } from './cpu';

/**
 * Timer Emulator
 */
export class Timer {
  private static readonly FREQUENCIES = [1024, 16, 64, 256]; // Clock cycles per TIMA increment

  /**
   * Step timer by cycles
   */
  static step(gb: GameBoyState, cycles: number): void {
    // Update DIV register (increments at 16384 Hz)
    gb.timer.divCycles += cycles;
    while (gb.timer.divCycles >= 256) {
      gb.timer.divCycles -= 256;
      gb.timer.div = (gb.timer.div + 1) & 0xFF;
      CPU.writeByte(gb, 0xFF04, gb.timer.div);
    }

    // Check if timer is enabled
    if ((gb.timer.tac & 0x04) === 0) {
      return;
    }

    // Update TIMA register
    const frequency = this.FREQUENCIES[gb.timer.tac & 0x03];
    gb.timer.timaCycles += cycles;

    while (gb.timer.timaCycles >= frequency) {
      gb.timer.timaCycles -= frequency;
      gb.timer.tima++;

      // Check for overflow
      if (gb.timer.tima > 0xFF) {
        gb.timer.tima = gb.timer.tma; // Reset to modulo
        this.requestInterrupt(gb, 2); // Timer interrupt
      }
    }

    CPU.writeByte(gb, 0xFF05, gb.timer.tima);
  }

  /**
   * Request interrupt
   */
  private static requestInterrupt(gb: GameBoyState, bit: number): void {
    const IF = CPU.readByte(gb, 0xFF0F);
    CPU.writeByte(gb, 0xFF0F, IF | (1 << bit));
  }

  /**
   * Write to timer register
   */
  static writeRegister(gb: GameBoyState, address: number, value: number): void {
    switch (address) {
      case 0xFF04: // DIV
        gb.timer.div = 0;
        gb.timer.divCycles = 0;
        break;
      case 0xFF05: // TIMA
        gb.timer.tima = value;
        break;
      case 0xFF06: // TMA
        gb.timer.tma = value;
        break;
      case 0xFF07: // TAC
        gb.timer.tac = value & 0x07;
        break;
    }
  }
}
