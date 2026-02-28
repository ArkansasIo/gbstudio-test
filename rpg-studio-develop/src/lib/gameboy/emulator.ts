/**
 * Game Boy Emulator
 * Main emulator class that coordinates all subsystems
 */

import type { GameBoyState, EmulatorConfig, EmulatorCallbacks } from './types';
import { CPU } from './cpu';
import { PPU } from './ppu';
import { Memory } from './memory';
import { Timer } from './timer';
import { Joypad } from './joypad';
import { Interrupts } from './interrupts';

/**
 * Game Boy Emulator
 */
export class GameBoyEmulator {
  private state: GameBoyState;
  private config: EmulatorConfig;
  private callbacks: EmulatorCallbacks;
  private running = false;
  private lastFrameTime = 0;
  private cyclesPerFrame: number;

  constructor(rom: Uint8Array, config: Partial<EmulatorConfig> = {}, callbacks: EmulatorCallbacks = {}) {
    this.config = {
      model: 'DMG',
      skipBootRom: true,
      audioEnabled: true,
      colorCorrection: false,
      frameSkip: 0,
      speedMultiplier: 1,
      ...config
    };

    this.callbacks = callbacks;
    this.state = Memory.loadROM(rom);
    
    // Game Boy runs at ~4.194 MHz, ~59.7 FPS
    // Cycles per frame = 4194304 / 59.7 ≈ 70224
    this.cyclesPerFrame = Math.floor(4194304 / 59.7 * this.config.speedMultiplier);
  }

  /**
   * Get emulator state
   */
  getState(): GameBoyState {
    return this.state;
  }

  /**
   * Start emulation
   */
  start(): void {
    if (this.running) return;
    this.running = true;
    this.lastFrameTime = performance.now();
    this.runFrame();
  }

  /**
   * Stop emulation
   */
  stop(): void {
    this.running = false;
  }

  /**
   * Reset emulator
   */
  reset(): void {
    const rom = new Uint8Array(this.state.memory.rom0.length + this.state.memory.romN.length);
    rom.set(this.state.memory.rom0, 0);
    rom.set(this.state.memory.romN, 0x4000);
    this.state = Memory.loadROM(rom);
  }

  /**
   * Run one frame
   */
  private runFrame(): void {
    if (!this.running) return;

    let cycles = 0;
    
    while (cycles < this.cyclesPerFrame) {
      // Execute one CPU instruction
      const cpuCycles = CPU.step(this.state);
      
      // Update other components
      PPU.step(this.state, cpuCycles);
      Timer.step(this.state, cpuCycles);
      
      // Handle interrupts
      const interruptCycles = Interrupts.handle(this.state);
      
      cycles += cpuCycles + interruptCycles;
      this.state.cycles += cpuCycles + interruptCycles;
    }

    // Frame complete callback
    if (this.callbacks.onFrame) {
      this.callbacks.onFrame(this.state.ppu.framebuffer);
    }

    // Schedule next frame
    const now = performance.now();
    const elapsed = now - this.lastFrameTime;
    const targetFrameTime = 1000 / 59.7;
    const delay = Math.max(0, targetFrameTime - elapsed);
    
    this.lastFrameTime = now + delay;
    setTimeout(() => this.runFrame(), delay);
  }

  /**
   * Step one instruction (for debugging)
   */
  step(): void {
    const cpuCycles = CPU.step(this.state);
    PPU.step(this.state, cpuCycles);
    Timer.step(this.state, cpuCycles);
    Interrupts.handle(this.state);
    this.state.cycles += cpuCycles;
  }

  /**
   * Run until next frame
   */
  stepFrame(): void {
    const startFrame = this.state.frame;
    while (this.state.frame === startFrame) {
      this.step();
    }
  }

  /**
   * Press button
   */
  pressButton(button: string): void {
    const gbButton = Joypad.mapKey(button);
    if (gbButton) {
      Joypad.pressButton(this.state, gbButton);
    }
  }

  /**
   * Release button
   */
  releaseButton(button: string): void {
    const gbButton = Joypad.mapKey(button);
    if (gbButton) {
      Joypad.releaseButton(this.state, gbButton);
    }
  }

  /**
   * Get framebuffer
   */
  getFramebuffer(): Uint8Array {
    return this.state.ppu.framebuffer;
  }

  /**
   * Get current frame number
   */
  getFrame(): number {
    return this.state.frame;
  }

  /**
   * Get total cycles executed
   */
  getCycles(): number {
    return this.state.cycles;
  }

  /**
   * Read memory (for debugging)
   */
  readMemory(address: number): number {
    return CPU.readByte(this.state, address);
  }

  /**
   * Write memory (for debugging)
   */
  writeMemory(address: number, value: number): void {
    CPU.writeByte(this.state, address, value);
  }

  /**
   * Get CPU registers (for debugging)
   */
  getRegisters() {
    return { ...this.state.cpu.registers };
  }

  /**
   * Get CPU flags (for debugging)
   */
  getFlags() {
    return { ...this.state.cpu.flags };
  }

  /**
   * Save state
   */
  saveState(): Uint8Array {
    // Serialize state to binary format
    const json = JSON.stringify({
      version: 1,
      timestamp: Date.now(),
      state: this.state
    });
    return new TextEncoder().encode(json);
  }

  /**
   * Load state
   */
  loadState(data: Uint8Array): void {
    const json = new TextDecoder().decode(data);
    const saveState = JSON.parse(json);
    
    if (saveState.version === 1) {
      this.state = saveState.state;
    }
  }

  /**
   * Get cartridge info
   */
  getCartridgeInfo() {
    return { ...this.state.cartridge };
  }

  /**
   * Is running
   */
  isRunning(): boolean {
    return this.running;
  }

  /**
   * Set speed multiplier
   */
  setSpeed(multiplier: number): void {
    this.config.speedMultiplier = multiplier;
    this.cyclesPerFrame = Math.floor(4194304 / 59.7 * multiplier);
  }

  /**
   * Get FPS
   */
  getFPS(): number {
    return 59.7 * this.config.speedMultiplier;
  }
}

/**
 * Create emulator from ROM file
 */
export async function createEmulatorFromFile(file: File, config?: Partial<EmulatorConfig>, callbacks?: EmulatorCallbacks): Promise<GameBoyEmulator> {
  const buffer = await file.arrayBuffer();
  const rom = new Uint8Array(buffer);
  return new GameBoyEmulator(rom, config, callbacks);
}

/**
 * Create emulator from ROM URL
 */
export async function createEmulatorFromURL(url: string, config?: Partial<EmulatorConfig>, callbacks?: EmulatorCallbacks): Promise<GameBoyEmulator> {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  const rom = new Uint8Array(buffer);
  return new GameBoyEmulator(rom, config, callbacks);
}
