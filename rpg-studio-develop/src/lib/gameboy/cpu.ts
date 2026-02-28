/**
 * Game Boy CPU Emulator (Sharp LR35902)
 * Z80-like instruction set with modifications
 */

import type { GameBoyState, CPURegisters, CPUFlags, Instruction } from './types';

/**
 * CPU Emulator
 */
export class CPU {
  /**
   * Execute one instruction
   */
  static step(gb: GameBoyState): number {
    if (gb.cpu.halted) {
      return 4; // NOP cycles
    }

    const opcode = this.readByte(gb, gb.cpu.registers.pc);
    gb.cpu.registers.pc = (gb.cpu.registers.pc + 1) & 0xFFFF;

    const instruction = opcode === 0xCB 
      ? this.getCBInstruction(gb)
      : this.getInstruction(opcode);

    instruction.execute(gb);
    return instruction.cycles;
  }

  /**
   * Get instruction for opcode
   */
  private static getInstruction(opcode: number): Instruction {
    return INSTRUCTIONS[opcode] || {
      opcode,
      mnemonic: 'UNKNOWN',
      length: 1,
      cycles: 4,
      execute: (gb) => console.log(`Unknown opcode: 0x${opcode.toString(16)}`)
    };
  }

  /**
   * Get CB-prefixed instruction
   */
  private static getCBInstruction(gb: GameBoyState): Instruction {
    const opcode = this.readByte(gb, gb.cpu.registers.pc);
    gb.cpu.registers.pc = (gb.cpu.registers.pc + 1) & 0xFFFF;
    
    return CB_INSTRUCTIONS[opcode] || {
      opcode: 0xCB00 | opcode,
      mnemonic: 'UNKNOWN CB',
      length: 2,
      cycles: 8,
      execute: (gb) => console.log(`Unknown CB opcode: 0x${opcode.toString(16)}`)
    };
  }

  // ============================================================================
  // Memory Access
  // ============================================================================

  static readByte(gb: GameBoyState, address: number): number {
    address &= 0xFFFF;
    
    // ROM Bank 0
    if (address < 0x4000) {
      return gb.memory.rom0[address];
    }
    // ROM Bank N
    if (address < 0x8000) {
      return gb.memory.romN[address - 0x4000];
    }
    // VRAM
    if (address < 0xA000) {
      return gb.memory.vram[address - 0x8000];
    }
    // External RAM
    if (address < 0xC000) {
      return gb.memory.eram[address - 0xA000];
    }
    // WRAM Bank 0
    if (address < 0xD000) {
      return gb.memory.wram0[address - 0xC000];
    }
    // WRAM Bank N
    if (address < 0xE000) {
      return gb.memory.wramN[address - 0xD000];
    }
    // Echo RAM
    if (address < 0xFE00) {
      return this.readByte(gb, address - 0x2000);
    }
    // OAM
    if (address < 0xFEA0) {
      return gb.memory.oam[address - 0xFE00];
    }
    // Unusable
    if (address < 0xFF00) {
      return 0xFF;
    }
    // I/O Registers
    if (address < 0xFF80) {
      return gb.memory.io[address - 0xFF00];
    }
    // HRAM
    if (address < 0xFFFF) {
      return gb.memory.hram[address - 0xFF80];
    }
    // IE Register
    return gb.memory.ie;
  }

  static writeByte(gb: GameBoyState, address: number, value: number): void {
    address &= 0xFFFF;
    value &= 0xFF;
    
    // ROM (MBC control)
    if (address < 0x8000) {
      // Handle MBC writes
      return;
    }
    // VRAM
    if (address < 0xA000) {
      gb.memory.vram[address - 0x8000] = value;
      return;
    }
    // External RAM
    if (address < 0xC000) {
      gb.memory.eram[address - 0xA000] = value;
      return;
    }
    // WRAM Bank 0
    if (address < 0xD000) {
      gb.memory.wram0[address - 0xC000] = value;
      return;
    }
    // WRAM Bank N
    if (address < 0xE000) {
      gb.memory.wramN[address - 0xD000] = value;
      return;
    }
    // Echo RAM
    if (address < 0xFE00) {
      this.writeByte(gb, address - 0x2000, value);
      return;
    }
    // OAM
    if (address < 0xFEA0) {
      gb.memory.oam[address - 0xFE00] = value;
      return;
    }
    // Unusable
    if (address < 0xFF00) {
      return;
    }
    // I/O Registers
    if (address < 0xFF80) {
      gb.memory.io[address - 0xFF00] = value;
      return;
    }
    // HRAM
    if (address < 0xFFFF) {
      gb.memory.hram[address - 0xFF80] = value;
      return;
    }
    // IE Register
    gb.memory.ie = value;
  }

  static readWord(gb: GameBoyState, address: number): number {
    const low = this.readByte(gb, address);
    const high = this.readByte(gb, address + 1);
    return (high << 8) | low;
  }

  static writeWord(gb: GameBoyState, address: number, value: number): void {
    this.writeByte(gb, address, value & 0xFF);
    this.writeByte(gb, address + 1, (value >> 8) & 0xFF);
  }

  // ============================================================================
  // Register Access
  // ============================================================================

  static getBC(r: CPURegisters): number {
    return (r.b << 8) | r.c;
  }

  static setBC(r: CPURegisters, value: number): void {
    r.b = (value >> 8) & 0xFF;
    r.c = value & 0xFF;
  }

  static getDE(r: CPURegisters): number {
    return (r.d << 8) | r.e;
  }

  static setDE(r: CPURegisters, value: number): void {
    r.d = (value >> 8) & 0xFF;
    r.e = value & 0xFF;
  }

  static getHL(r: CPURegisters): number {
    return (r.h << 8) | r.l;
  }

  static setHL(r: CPURegisters, value: number): void {
    r.h = (value >> 8) & 0xFF;
    r.l = value & 0xFF;
  }

  static getAF(r: CPURegisters): number {
    return (r.a << 8) | r.f;
  }

  static setAF(r: CPURegisters, value: number): void {
    r.a = (value >> 8) & 0xFF;
    r.f = value & 0xF0; // Lower 4 bits always 0
  }

  // ============================================================================
  // Flag Operations
  // ============================================================================

  static setFlags(gb: GameBoyState, z?: boolean, n?: boolean, h?: boolean, c?: boolean): void {
    const f = gb.cpu.flags;
    if (z !== undefined) f.z = z;
    if (n !== undefined) f.n = n;
    if (h !== undefined) f.h = h;
    if (c !== undefined) f.c = c;
    
    // Update F register
    gb.cpu.registers.f = 
      (f.z ? 0x80 : 0) |
      (f.n ? 0x40 : 0) |
      (f.h ? 0x20 : 0) |
      (f.c ? 0x10 : 0);
  }

  static updateFlags(gb: GameBoyState): void {
    const f = gb.cpu.registers.f;
    gb.cpu.flags.z = (f & 0x80) !== 0;
    gb.cpu.flags.n = (f & 0x40) !== 0;
    gb.cpu.flags.h = (f & 0x20) !== 0;
    gb.cpu.flags.c = (f & 0x10) !== 0;
  }

  // ============================================================================
  // Stack Operations
  // ============================================================================

  static push(gb: GameBoyState, value: number): void {
    gb.cpu.registers.sp = (gb.cpu.registers.sp - 2) & 0xFFFF;
    this.writeWord(gb, gb.cpu.registers.sp, value);
  }

  static pop(gb: GameBoyState): number {
    const value = this.readWord(gb, gb.cpu.registers.sp);
    gb.cpu.registers.sp = (gb.cpu.registers.sp + 2) & 0xFFFF;
    return value;
  }
}

// ============================================================================
// Instruction Set
// ============================================================================

const INSTRUCTIONS: Instruction[] = new Array(256);
const CB_INSTRUCTIONS: Instruction[] = new Array(256);

// Helper functions for instruction implementation
function imm8(gb: GameBoyState): number {
  const value = CPU.readByte(gb, gb.cpu.registers.pc);
  gb.cpu.registers.pc = (gb.cpu.registers.pc + 1) & 0xFFFF;
  return value;
}

function imm16(gb: GameBoyState): number {
  const value = CPU.readWord(gb, gb.cpu.registers.pc);
  gb.cpu.registers.pc = (gb.cpu.registers.pc + 2) & 0xFFFF;
  return value;
}

// 8-bit loads
INSTRUCTIONS[0x06] = { opcode: 0x06, mnemonic: 'LD B,n', length: 2, cycles: 8, execute: (gb) => { gb.cpu.registers.b = imm8(gb); } };
INSTRUCTIONS[0x0E] = { opcode: 0x0E, mnemonic: 'LD C,n', length: 2, cycles: 8, execute: (gb) => { gb.cpu.registers.c = imm8(gb); } };
INSTRUCTIONS[0x16] = { opcode: 0x16, mnemonic: 'LD D,n', length: 2, cycles: 8, execute: (gb) => { gb.cpu.registers.d = imm8(gb); } };
INSTRUCTIONS[0x1E] = { opcode: 0x1E, mnemonic: 'LD E,n', length: 2, cycles: 8, execute: (gb) => { gb.cpu.registers.e = imm8(gb); } };
INSTRUCTIONS[0x26] = { opcode: 0x26, mnemonic: 'LD H,n', length: 2, cycles: 8, execute: (gb) => { gb.cpu.registers.h = imm8(gb); } };
INSTRUCTIONS[0x2E] = { opcode: 0x2E, mnemonic: 'LD L,n', length: 2, cycles: 8, execute: (gb) => { gb.cpu.registers.l = imm8(gb); } };
INSTRUCTIONS[0x3E] = { opcode: 0x3E, mnemonic: 'LD A,n', length: 2, cycles: 8, execute: (gb) => { gb.cpu.registers.a = imm8(gb); } };

// 16-bit loads
INSTRUCTIONS[0x01] = { opcode: 0x01, mnemonic: 'LD BC,nn', length: 3, cycles: 12, execute: (gb) => { CPU.setBC(gb.cpu.registers, imm16(gb)); } };
INSTRUCTIONS[0x11] = { opcode: 0x11, mnemonic: 'LD DE,nn', length: 3, cycles: 12, execute: (gb) => { CPU.setDE(gb.cpu.registers, imm16(gb)); } };
INSTRUCTIONS[0x21] = { opcode: 0x21, mnemonic: 'LD HL,nn', length: 3, cycles: 12, execute: (gb) => { CPU.setHL(gb.cpu.registers, imm16(gb)); } };
INSTRUCTIONS[0x31] = { opcode: 0x31, mnemonic: 'LD SP,nn', length: 3, cycles: 12, execute: (gb) => { gb.cpu.registers.sp = imm16(gb); } };

// NOP
INSTRUCTIONS[0x00] = { opcode: 0x00, mnemonic: 'NOP', length: 1, cycles: 4, execute: () => {} };

// HALT
INSTRUCTIONS[0x76] = { opcode: 0x76, mnemonic: 'HALT', length: 1, cycles: 4, execute: (gb) => { gb.cpu.halted = true; } };

// DI/EI
INSTRUCTIONS[0xF3] = { opcode: 0xF3, mnemonic: 'DI', length: 1, cycles: 4, execute: (gb) => { gb.cpu.ime = false; } };
INSTRUCTIONS[0xFB] = { opcode: 0xFB, mnemonic: 'EI', length: 1, cycles: 4, execute: (gb) => { gb.cpu.ime = true; } };

// INC/DEC 8-bit
INSTRUCTIONS[0x04] = { opcode: 0x04, mnemonic: 'INC B', length: 1, cycles: 4, execute: (gb) => {
  gb.cpu.registers.b = (gb.cpu.registers.b + 1) & 0xFF;
  CPU.setFlags(gb, gb.cpu.registers.b === 0, false, (gb.cpu.registers.b & 0x0F) === 0);
}};

INSTRUCTIONS[0x05] = { opcode: 0x05, mnemonic: 'DEC B', length: 1, cycles: 4, execute: (gb) => {
  const h = (gb.cpu.registers.b & 0x0F) === 0;
  gb.cpu.registers.b = (gb.cpu.registers.b - 1) & 0xFF;
  CPU.setFlags(gb, gb.cpu.registers.b === 0, true, h);
}};

// ADD A,n
INSTRUCTIONS[0xC6] = { opcode: 0xC6, mnemonic: 'ADD A,n', length: 2, cycles: 8, execute: (gb) => {
  const n = imm8(gb);
  const result = gb.cpu.registers.a + n;
  CPU.setFlags(gb, 
    (result & 0xFF) === 0,
    false,
    ((gb.cpu.registers.a & 0x0F) + (n & 0x0F)) > 0x0F,
    result > 0xFF
  );
  gb.cpu.registers.a = result & 0xFF;
}};

// JP nn
INSTRUCTIONS[0xC3] = { opcode: 0xC3, mnemonic: 'JP nn', length: 3, cycles: 16, execute: (gb) => {
  gb.cpu.registers.pc = imm16(gb);
}};

// CALL nn
INSTRUCTIONS[0xCD] = { opcode: 0xCD, mnemonic: 'CALL nn', length: 3, cycles: 24, execute: (gb) => {
  const addr = imm16(gb);
  CPU.push(gb, gb.cpu.registers.pc);
  gb.cpu.registers.pc = addr;
}};

// RET
INSTRUCTIONS[0xC9] = { opcode: 0xC9, mnemonic: 'RET', length: 1, cycles: 16, execute: (gb) => {
  gb.cpu.registers.pc = CPU.pop(gb);
}};

// Initialize remaining instructions with NOP
for (let i = 0; i < 256; i++) {
  if (!INSTRUCTIONS[i]) {
    INSTRUCTIONS[i] = {
      opcode: i,
      mnemonic: `UNIMPL_${i.toString(16).toUpperCase().padStart(2, '0')}`,
      length: 1,
      cycles: 4,
      execute: () => {}
    };
  }
}

// CB Instructions (bit operations)
for (let i = 0; i < 256; i++) {
  CB_INSTRUCTIONS[i] = {
    opcode: 0xCB00 | i,
    mnemonic: `CB_${i.toString(16).toUpperCase().padStart(2, '0')}`,
    length: 2,
    cycles: 8,
    execute: () => {}
  };
}

export { INSTRUCTIONS, CB_INSTRUCTIONS };
