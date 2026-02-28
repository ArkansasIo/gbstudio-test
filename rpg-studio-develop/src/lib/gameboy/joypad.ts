/**
 * Game Boy Joypad Input Handler
 */

import type { GameBoyState, JoypadState } from './types';
import { CPU } from './cpu';

/**
 * Joypad Handler
 */
export class Joypad {
  /**
   * Read joypad register (P1)
   */
  static read(gb: GameBoyState): number {
    const joypad = gb.joypad;
    let value = 0xCF; // Bits 6-7 always 1, bits 4-5 input

    // Check which button group is selected
    if (!joypad.selectButtons) {
      // Action buttons (A, B, Select, Start)
      if (joypad.a) value &= ~0x01;
      if (joypad.b) value &= ~0x02;
      if (joypad.select) value &= ~0x04;
      if (joypad.start) value &= ~0x08;
      value &= ~0x10; // P14 selected
    }

    if (!joypad.selectDpad) {
      // Direction buttons (Right, Left, Up, Down)
      if (joypad.right) value &= ~0x01;
      if (joypad.left) value &= ~0x02;
      if (joypad.up) value &= ~0x04;
      if (joypad.down) value &= ~0x08;
      value &= ~0x20; // P15 selected
    }

    return value;
  }

  /**
   * Write to joypad register (P1)
   */
  static write(gb: GameBoyState, value: number): void {
    gb.joypad.selectButtons = (value & 0x20) === 0;
    gb.joypad.selectDpad = (value & 0x10) === 0;
  }

  /**
   * Press button
   */
  static pressButton(gb: GameBoyState, button: keyof JoypadState): void {
    if (typeof gb.joypad[button] === 'boolean') {
      gb.joypad[button] = true;
      this.requestInterrupt(gb);
    }
  }

  /**
   * Release button
   */
  static releaseButton(gb: GameBoyState, button: keyof JoypadState): void {
    if (typeof gb.joypad[button] === 'boolean') {
      gb.joypad[button] = false;
    }
  }

  /**
   * Request joypad interrupt
   */
  private static requestInterrupt(gb: GameBoyState): void {
    const IF = CPU.readByte(gb, 0xFF0F);
    CPU.writeByte(gb, 0xFF0F, IF | (1 << 4)); // Joypad interrupt
  }

  /**
   * Map keyboard key to Game Boy button
   */
  static mapKey(key: string): keyof JoypadState | null {
    const keyMap: Record<string, keyof JoypadState> = {
      'ArrowRight': 'right',
      'ArrowLeft': 'left',
      'ArrowUp': 'up',
      'ArrowDown': 'down',
      'z': 'a',
      'x': 'b',
      'Enter': 'start',
      'Shift': 'select'
    };

    return keyMap[key] || null;
  }
}
