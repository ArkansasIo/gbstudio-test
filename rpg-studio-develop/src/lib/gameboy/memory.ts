/**
 * Game Boy Memory Management
 * Handles memory banking and cartridge types
 */

import type { GameBoyState, MBCType, CartridgeHeader } from './types';

/**
 * Memory Management
 */
export class Memory {
  /**
   * Initialize memory from ROM
   */
  static loadROM(rom: Uint8Array): GameBoyState {
    const header = this.parseHeader(rom);
    
    const gb: GameBoyState = {
      model: header.cgbFlag === 0x80 || header.cgbFlag === 0xC0 ? 'CGB' : 'DMG',
      cpu: {
        registers: { a: 0x01, b: 0x00, c: 0x13, d: 0x00, e: 0xD8, h: 0x01, l: 0x4D, f: 0xB0, sp: 0xFFFE, pc: 0x0100 },
        flags: { z: true, n: false, h: true, c: true },
        ime: false,
        halted: false,
        stopped: false,
        cycles: 0
      },
      ppu: {
        mode: 2,
        modeClock: 0,
        line: 0,
        lyCompare: 0,
        scrollX: 0,
        scrollY: 0,
        windowX: 0,
        windowY: 0,
        lcdc: {
          lcdEnable: true,
          windowTileMap: 0x9800,
          windowEnable: false,
          bgWindowTileData: 0x8000,
          bgTileMap: 0x9800,
          objSize: 0,
          objEnable: false,
          bgWindowEnable: true
        },
        stat: {
          lycInterrupt: false,
          oamInterrupt: false,
          vblankInterrupt: false,
          hblankInterrupt: false,
          lycFlag: false,
          mode: 2
        },
        bgPalette: 0xFC,
        objPalette0: 0xFF,
        objPalette1: 0xFF,
        framebuffer: new Uint8Array(160 * 144 * 4),
        oam: Array(40).fill(null).map(() => ({
          y: 0,
          x: 0,
          tile: 0,
          flags: { priority: false, yFlip: false, xFlip: false, palette: 0, bank: 0, cgbPalette: 0 }
        }))
      },
      memory: {
        rom0: rom.slice(0, 0x4000),
        romN: rom.slice(0x4000, 0x8000),
        vram: new Uint8Array(0x2000),
        eram: new Uint8Array(0x2000),
        wram0: new Uint8Array(0x1000),
        wramN: new Uint8Array(0x1000),
        oam: new Uint8Array(0xA0),
        io: new Uint8Array(0x80),
        hram: new Uint8Array(0x7F),
        ie: 0x00
      },
      timer: {
        div: 0,
        tima: 0,
        tma: 0,
        tac: 0,
        divCycles: 0,
        timaCycles: 0
      },
      joypad: {
        right: false,
        left: false,
        up: false,
        down: false,
        a: false,
        b: false,
        select: false,
        start: false,
        selectButtons: false,
        selectDpad: false
      },
      serial: {
        data: 0,
        control: 0,
        transferring: false,
        bitsSent: 0,
        cycles: 0
      },
      dma: {
        active: false,
        source: 0,
        destination: 0,
        length: 0,
        cycles: 0
      },
      interrupts: {
        flags: { vblank: false, lcdStat: false, timer: false, serial: false, joypad: false },
        enable: { vblank: false, lcdStat: false, timer: false, serial: false, joypad: false }
      },
      cartridge: header,
      cycles: 0,
      frame: 0
    };

    // Initialize framebuffer to white
    gb.ppu.framebuffer.fill(255);

    return gb;
  }

  /**
   * Parse cartridge header
   */
  static parseHeader(rom: Uint8Array): CartridgeHeader {
    // Title (0x0134-0x0143)
    let title = '';
    for (let i = 0x0134; i < 0x0143; i++) {
      if (rom[i] === 0) break;
      title += String.fromCharCode(rom[i]);
    }

    return {
      title: title.trim(),
      manufacturer: '',
      cgbFlag: rom[0x0143],
      licensee: '',
      sgbFlag: rom[0x0146],
      cartridgeType: rom[0x0147],
      romSize: rom[0x0148],
      ramSize: rom[0x0149],
      destination: rom[0x014A],
      version: rom[0x014C],
      checksum: rom[0x014D]
    };
  }

  /**
   * Get MBC type from cartridge type
   */
  static getMBCType(cartridgeType: number): MBCType {
    if (cartridgeType === 0x00) return 'NONE';
    if (cartridgeType >= 0x01 && cartridgeType <= 0x03) return 'MBC1';
    if (cartridgeType >= 0x05 && cartridgeType <= 0x06) return 'MBC2';
    if (cartridgeType >= 0x0F && cartridgeType <= 0x13) return 'MBC3';
    if (cartridgeType >= 0x19 && cartridgeType <= 0x1E) return 'MBC5';
    if (cartridgeType === 0x20) return 'MBC6';
    if (cartridgeType === 0x22) return 'MBC7';
    return 'NONE';
  }

  /**
   * Get ROM size in bytes
   */
  static getROMSize(romSizeCode: number): number {
    return 32768 * (1 << romSizeCode);
  }

  /**
   * Get RAM size in bytes
   */
  static getRAMSize(ramSizeCode: number): number {
    const sizes = [0, 2048, 8192, 32768, 131072, 65536];
    return sizes[ramSizeCode] || 0;
  }
}

/**
 * MBC1 Controller
 */
export class MBC1 {
  private romBank = 1;
  private ramBank = 0;
  private ramEnabled = false;
  private bankingMode = 0; // 0 = ROM banking, 1 = RAM banking

  handleWrite(address: number, value: number, gb: GameBoyState): void {
    // RAM Enable (0x0000-0x1FFF)
    if (address < 0x2000) {
      this.ramEnabled = (value & 0x0F) === 0x0A;
      return;
    }

    // ROM Bank Number (0x2000-0x3FFF)
    if (address < 0x4000) {
      this.romBank = (this.romBank & 0x60) | (value & 0x1F);
      if (this.romBank === 0) this.romBank = 1;
      return;
    }

    // RAM Bank Number / Upper ROM Bank (0x4000-0x5FFF)
    if (address < 0x6000) {
      if (this.bankingMode === 0) {
        this.romBank = (this.romBank & 0x1F) | ((value & 0x03) << 5);
      } else {
        this.ramBank = value & 0x03;
      }
      return;
    }

    // Banking Mode Select (0x6000-0x7FFF)
    if (address < 0x8000) {
      this.bankingMode = value & 0x01;
      return;
    }
  }

  getROMBank(): number {
    return this.romBank;
  }

  getRAMBank(): number {
    return this.ramBank;
  }

  isRAMEnabled(): boolean {
    return this.ramEnabled;
  }
}

/**
 * MBC3 Controller (with RTC support)
 */
export class MBC3 {
  private romBank = 1;
  private ramBank = 0;
  private ramEnabled = false;
  private rtcEnabled = false;
  private rtcRegister = 0;

  handleWrite(address: number, value: number, gb: GameBoyState): void {
    // RAM/RTC Enable (0x0000-0x1FFF)
    if (address < 0x2000) {
      this.ramEnabled = (value & 0x0F) === 0x0A;
      return;
    }

    // ROM Bank Number (0x2000-0x3FFF)
    if (address < 0x4000) {
      this.romBank = value & 0x7F;
      if (this.romBank === 0) this.romBank = 1;
      return;
    }

    // RAM Bank / RTC Register (0x4000-0x5FFF)
    if (address < 0x6000) {
      if (value <= 0x03) {
        this.ramBank = value;
        this.rtcEnabled = false;
      } else if (value >= 0x08 && value <= 0x0C) {
        this.rtcRegister = value;
        this.rtcEnabled = true;
      }
      return;
    }

    // Latch Clock Data (0x6000-0x7FFF)
    if (address < 0x8000) {
      // Latch RTC data
      return;
    }
  }

  getROMBank(): number {
    return this.romBank;
  }

  getRAMBank(): number {
    return this.ramBank;
  }

  isRAMEnabled(): boolean {
    return this.ramEnabled;
  }

  isRTCEnabled(): boolean {
    return this.rtcEnabled;
  }
}

/**
 * MBC5 Controller
 */
export class MBC5 {
  private romBank = 1;
  private ramBank = 0;
  private ramEnabled = false;

  handleWrite(address: number, value: number, gb: GameBoyState): void {
    // RAM Enable (0x0000-0x1FFF)
    if (address < 0x2000) {
      this.ramEnabled = (value & 0x0F) === 0x0A;
      return;
    }

    // ROM Bank Number (lower 8 bits) (0x2000-0x2FFF)
    if (address < 0x3000) {
      this.romBank = (this.romBank & 0x100) | value;
      return;
    }

    // ROM Bank Number (9th bit) (0x3000-0x3FFF)
    if (address < 0x4000) {
      this.romBank = (this.romBank & 0xFF) | ((value & 0x01) << 8);
      return;
    }

    // RAM Bank Number (0x4000-0x5FFF)
    if (address < 0x6000) {
      this.ramBank = value & 0x0F;
      return;
    }
  }

  getROMBank(): number {
    return this.romBank;
  }

  getRAMBank(): number {
    return this.ramBank;
  }

  isRAMEnabled(): boolean {
    return this.ramEnabled;
  }
}
