/**
 * Game Boy PPU (Picture Processing Unit) Emulator
 * Handles graphics rendering
 */

import type { GameBoyState, PPUMode, Sprite } from './types';
import { CPU } from './cpu';

/**
 * PPU Emulator
 */
export class PPU {
  private static readonly SCREEN_WIDTH = 160;
  private static readonly SCREEN_HEIGHT = 144;
  private static readonly OAM_SCAN_CYCLES = 80;
  private static readonly VRAM_TRANSFER_CYCLES = 172;
  private static readonly HBLANK_CYCLES = 204;
  private static readonly SCANLINE_CYCLES = 456;
  private static readonly VBLANK_LINES = 10;

  /**
   * Step PPU by cycles
   */
  static step(gb: GameBoyState, cycles: number): void {
    if (!gb.ppu.lcdc.lcdEnable) {
      return;
    }

    gb.ppu.modeClock += cycles;

    switch (gb.ppu.mode) {
      case 2: // OAM Scan
        if (gb.ppu.modeClock >= this.OAM_SCAN_CYCLES) {
          gb.ppu.modeClock -= this.OAM_SCAN_CYCLES;
          this.setMode(gb, 3);
        }
        break;

      case 3: // VRAM Transfer
        if (gb.ppu.modeClock >= this.VRAM_TRANSFER_CYCLES) {
          gb.ppu.modeClock -= this.VRAM_TRANSFER_CYCLES;
          this.setMode(gb, 0);
          this.renderScanline(gb);
        }
        break;

      case 0: // HBlank
        if (gb.ppu.modeClock >= this.HBLANK_CYCLES) {
          gb.ppu.modeClock -= this.HBLANK_CYCLES;
          gb.ppu.line++;

          if (gb.ppu.line === this.SCREEN_HEIGHT) {
            this.setMode(gb, 1);
            this.requestInterrupt(gb, 0); // VBlank interrupt
            gb.frame++;
          } else {
            this.setMode(gb, 2);
          }
        }
        break;

      case 1: // VBlank
        if (gb.ppu.modeClock >= this.SCANLINE_CYCLES) {
          gb.ppu.modeClock -= this.SCANLINE_CYCLES;
          gb.ppu.line++;

          if (gb.ppu.line > this.SCREEN_HEIGHT + this.VBLANK_LINES - 1) {
            gb.ppu.line = 0;
            this.setMode(gb, 2);
          }
        }
        break;
    }

    // LYC=LY comparison
    gb.ppu.stat.lycFlag = gb.ppu.line === gb.ppu.lyCompare;
    if (gb.ppu.stat.lycFlag && gb.ppu.stat.lycInterrupt) {
      this.requestInterrupt(gb, 1); // LCD STAT interrupt
    }
  }

  /**
   * Set PPU mode
   */
  private static setMode(gb: GameBoyState, mode: PPUMode): void {
    gb.ppu.mode = mode;
    gb.ppu.stat.mode = mode;

    // Request STAT interrupt based on mode
    if ((mode === 0 && gb.ppu.stat.hblankInterrupt) ||
        (mode === 1 && gb.ppu.stat.vblankInterrupt) ||
        (mode === 2 && gb.ppu.stat.oamInterrupt)) {
      this.requestInterrupt(gb, 1); // LCD STAT interrupt
    }
  }

  /**
   * Request interrupt
   */
  private static requestInterrupt(gb: GameBoyState, bit: number): void {
    const IF = CPU.readByte(gb, 0xFF0F);
    CPU.writeByte(gb, 0xFF0F, IF | (1 << bit));
  }

  /**
   * Render scanline
   */
  private static renderScanline(gb: GameBoyState): void {
    const line = gb.ppu.line;
    if (line >= this.SCREEN_HEIGHT) return;

    // Clear scanline
    const offset = line * this.SCREEN_WIDTH * 4;
    for (let x = 0; x < this.SCREEN_WIDTH; x++) {
      const pixelOffset = offset + x * 4;
      gb.ppu.framebuffer[pixelOffset] = 255;     // R
      gb.ppu.framebuffer[pixelOffset + 1] = 255; // G
      gb.ppu.framebuffer[pixelOffset + 2] = 255; // B
      gb.ppu.framebuffer[pixelOffset + 3] = 255; // A
    }

    // Render background
    if (gb.ppu.lcdc.bgWindowEnable) {
      this.renderBackground(gb, line);
    }

    // Render window
    if (gb.ppu.lcdc.windowEnable && line >= gb.ppu.windowY) {
      this.renderWindow(gb, line);
    }

    // Render sprites
    if (gb.ppu.lcdc.objEnable) {
      this.renderSprites(gb, line);
    }
  }

  /**
   * Render background scanline
   */
  private static renderBackground(gb: GameBoyState, line: number): void {
    const scrollY = gb.ppu.scrollY;
    const scrollX = gb.ppu.scrollX;
    const y = (line + scrollY) & 0xFF;
    const tileY = Math.floor(y / 8);
    const tilePixelY = y % 8;

    for (let x = 0; x < this.SCREEN_WIDTH; x++) {
      const pixelX = (x + scrollX) & 0xFF;
      const tileX = Math.floor(pixelX / 8);
      const tilePixelX = pixelX % 8;

      // Get tile index from tilemap
      const tilemapAddr = gb.ppu.lcdc.bgTileMap + tileY * 32 + tileX;
      const tileIndex = CPU.readByte(gb, tilemapAddr);

      // Get tile data
      const tileDataAddr = this.getTileDataAddress(gb, tileIndex);
      const color = this.getTilePixel(gb, tileDataAddr, tilePixelX, tilePixelY);

      // Apply palette
      const paletteColor = this.applyPalette(gb.ppu.bgPalette, color);

      // Write to framebuffer
      this.setPixel(gb, x, line, paletteColor);
    }
  }

  /**
   * Render window scanline
   */
  private static renderWindow(gb: GameBoyState, line: number): void {
    const windowY = gb.ppu.windowY;
    const windowX = gb.ppu.windowX - 7;
    
    if (windowX >= this.SCREEN_WIDTH) return;

    const y = line - windowY;
    const tileY = Math.floor(y / 8);
    const tilePixelY = y % 8;

    for (let x = Math.max(0, windowX); x < this.SCREEN_WIDTH; x++) {
      const pixelX = x - windowX;
      const tileX = Math.floor(pixelX / 8);
      const tilePixelX = pixelX % 8;

      // Get tile index from tilemap
      const tilemapAddr = gb.ppu.lcdc.windowTileMap + tileY * 32 + tileX;
      const tileIndex = CPU.readByte(gb, tilemapAddr);

      // Get tile data
      const tileDataAddr = this.getTileDataAddress(gb, tileIndex);
      const color = this.getTilePixel(gb, tileDataAddr, tilePixelX, tilePixelY);

      // Apply palette
      const paletteColor = this.applyPalette(gb.ppu.bgPalette, color);

      // Write to framebuffer
      this.setPixel(gb, x, line, paletteColor);
    }
  }

  /**
   * Render sprites on scanline
   */
  private static renderSprites(gb: GameBoyState, line: number): void {
    const spriteHeight = gb.ppu.lcdc.objSize === 1 ? 16 : 8;
    let spritesDrawn = 0;

    // Scan OAM for sprites on this line (max 10 per line)
    for (let i = 0; i < 40 && spritesDrawn < 10; i++) {
      const sprite = gb.ppu.oam[i];
      const spriteY = sprite.y - 16;
      const spriteX = sprite.x - 8;

      // Check if sprite is on this line
      if (line < spriteY || line >= spriteY + spriteHeight) {
        continue;
      }

      spritesDrawn++;

      // Calculate tile pixel Y
      let tilePixelY = line - spriteY;
      if (sprite.flags.yFlip) {
        tilePixelY = spriteHeight - 1 - tilePixelY;
      }

      // Get tile data
      const tileIndex = spriteHeight === 16 ? sprite.tile & 0xFE : sprite.tile;
      const tileDataAddr = 0x8000 + tileIndex * 16 + tilePixelY * 2;

      // Render sprite pixels
      for (let x = 0; x < 8; x++) {
        const pixelX = spriteX + x;
        if (pixelX < 0 || pixelX >= this.SCREEN_WIDTH) {
          continue;
        }

        // Calculate tile pixel X
        const tilePixelX = sprite.flags.xFlip ? 7 - x : x;
        const color = this.getTilePixel(gb, tileDataAddr, tilePixelX, 0);

        // Color 0 is transparent
        if (color === 0) {
          continue;
        }

        // Check priority
        if (sprite.flags.priority) {
          const bgColor = this.getPixel(gb, pixelX, line);
          if (bgColor !== 0) {
            continue;
          }
        }

        // Apply palette
        const palette = sprite.flags.palette === 0 ? gb.ppu.objPalette0 : gb.ppu.objPalette1;
        const paletteColor = this.applyPalette(palette, color);

        // Write to framebuffer
        this.setPixel(gb, pixelX, line, paletteColor);
      }
    }
  }

  /**
   * Get tile data address
   */
  private static getTileDataAddress(gb: GameBoyState, tileIndex: number): number {
    if (gb.ppu.lcdc.bgWindowTileData === 0x8000) {
      return 0x8000 + tileIndex * 16;
    } else {
      // Signed tile index
      const signedIndex = tileIndex < 128 ? tileIndex : tileIndex - 256;
      return 0x9000 + signedIndex * 16;
    }
  }

  /**
   * Get pixel color from tile
   */
  private static getTilePixel(gb: GameBoyState, tileAddr: number, x: number, y: number): number {
    const byte1 = CPU.readByte(gb, tileAddr + y * 2);
    const byte2 = CPU.readByte(gb, tileAddr + y * 2 + 1);
    
    const bit = 7 - x;
    const colorBit1 = (byte1 >> bit) & 1;
    const colorBit2 = (byte2 >> bit) & 1;
    
    return (colorBit2 << 1) | colorBit1;
  }

  /**
   * Apply palette to color
   */
  private static applyPalette(palette: number, color: number): number {
    return (palette >> (color * 2)) & 0x03;
  }

  /**
   * Set pixel in framebuffer
   */
  private static setPixel(gb: GameBoyState, x: number, y: number, color: number): void {
    // DMG colors (grayscale)
    const colors = [
      [255, 255, 255], // White
      [192, 192, 192], // Light gray
      [96, 96, 96],    // Dark gray
      [0, 0, 0]        // Black
    ];

    const rgb = colors[color];
    const offset = (y * this.SCREEN_WIDTH + x) * 4;
    
    gb.ppu.framebuffer[offset] = rgb[0];
    gb.ppu.framebuffer[offset + 1] = rgb[1];
    gb.ppu.framebuffer[offset + 2] = rgb[2];
    gb.ppu.framebuffer[offset + 3] = 255;
  }

  /**
   * Get pixel from framebuffer
   */
  private static getPixel(gb: GameBoyState, x: number, y: number): number {
    const offset = (y * this.SCREEN_WIDTH + x) * 4;
    const r = gb.ppu.framebuffer[offset];
    
    // Convert back to color index
    if (r === 255) return 0;
    if (r === 192) return 1;
    if (r === 96) return 2;
    return 3;
  }
}
