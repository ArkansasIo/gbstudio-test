/**
 * Game Boy Interrupt Handler
 */

import type { GameBoyState } from './types';
import { CPU } from './cpu';

/**
 * Interrupt Handler
 */
export class Interrupts {
  private static readonly INTERRUPT_VECTORS = [
    0x0040, // VBlank
    0x0048, // LCD STAT
    0x0050, // Timer
    0x0058, // Serial
    0x0060  // Joypad
  ];

  /**
   * Handle interrupts
   */
  static handle(gb: GameBoyState): number {
    if (!gb.cpu.ime) {
      return 0;
    }

    const IF = CPU.readByte(gb, 0xFF0F);
    const IE = CPU.readByte(gb, 0xFFFF);
    const triggered = IF & IE & 0x1F;

    if (triggered === 0) {
      return 0;
    }

    // Wake from HALT
    if (gb.cpu.halted) {
      gb.cpu.halted = false;
    }

    // Find highest priority interrupt
    for (let i = 0; i < 5; i++) {
      if ((triggered & (1 << i)) !== 0) {
        this.serviceInterrupt(gb, i);
        return 20; // Interrupt handling takes 20 cycles
      }
    }

    return 0;
  }

  /**
   * Service interrupt
   */
  private static serviceInterrupt(gb: GameBoyState, interrupt: number): void {
    // Disable interrupts
    gb.cpu.ime = false;

    // Clear interrupt flag
    const IF = CPU.readByte(gb, 0xFF0F);
    CPU.writeByte(gb, 0xFF0F, IF & ~(1 << interrupt));

    // Push PC to stack
    CPU.push(gb, gb.cpu.registers.pc);

    // Jump to interrupt vector
    gb.cpu.registers.pc = this.INTERRUPT_VECTORS[interrupt];
  }

  /**
   * Request interrupt
   */
  static request(gb: GameBoyState, interrupt: number): void {
    const IF = CPU.readByte(gb, 0xFF0F);
    CPU.writeByte(gb, 0xFF0F, IF | (1 << interrupt));
  }

  /**
   * Enable interrupt
   */
  static enable(gb: GameBoyState, interrupt: number): void {
    const IE = CPU.readByte(gb, 0xFFFF);
    CPU.writeByte(gb, 0xFFFF, IE | (1 << interrupt));
  }

  /**
   * Disable interrupt
   */
  static disable(gb: GameBoyState, interrupt: number): void {
    const IE = CPU.readByte(gb, 0xFFFF);
    CPU.writeByte(gb, 0xFFFF, IE & ~(1 << interrupt));
  }
}
