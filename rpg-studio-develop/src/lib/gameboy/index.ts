/**
 * Game Boy Emulator
 * Complete DMG/CGB hardware emulation
 */

// Main emulator
export { GameBoyEmulator, createEmulatorFromFile, createEmulatorFromURL } from './emulator';

// Core components
export { CPU, INSTRUCTIONS, CB_INSTRUCTIONS } from './cpu';
export { PPU } from './ppu';
export { Memory, MBC1, MBC3, MBC5 } from './memory';
export { Timer } from './timer';
export { Joypad } from './joypad';
export { Interrupts } from './interrupts';

// Types
export type {
  GameBoyState,
  GBModel,
  EmulatorConfig,
  EmulatorCallbacks,
  CPURegisters,
  CPUFlags,
  CPUState,
  PPUMode,
  PPUState,
  LCDControl,
  LCDStatus,
  Sprite,
  SpriteFlags,
  MemoryMap,
  MBCType,
  CartridgeHeader,
  TimerState,
  JoypadState,
  InterruptFlags,
  SerialState,
  DMAState,
  CGBState,
  Instruction,
  AddressingMode,
  Breakpoint,
  DebugState,
  DisassemblyLine,
  SaveState,
  PerformanceMetrics
} from './types';

// Audio integration
export { GBSoundSystem, GBSoundUtils } from '../audio/gbSound';
export type { GBSoundChannel, GBChannel, DutyCycle, WavePattern, NoiseConfig, Envelope, FrequencySweep } from '../audio/types';
