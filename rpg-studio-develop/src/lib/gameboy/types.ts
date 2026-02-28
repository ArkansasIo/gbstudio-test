/**
 * Game Boy Hardware Emulation Types
 * Complete DMG/CGB hardware specifications
 */

// ============================================================================
// CPU Types (Sharp LR35902 - Z80-like)
// ============================================================================

/**
 * CPU Registers
 */
export interface CPURegisters {
  // 8-bit registers
  a: number; // Accumulator
  b: number;
  c: number;
  d: number;
  e: number;
  h: number;
  l: number;
  f: number; // Flags
  
  // 16-bit registers
  sp: number; // Stack Pointer
  pc: number; // Program Counter
}

/**
 * CPU Flags (F register)
 */
export interface CPUFlags {
  z: boolean; // Zero flag (bit 7)
  n: boolean; // Subtract flag (bit 6)
  h: boolean; // Half-carry flag (bit 5)
  c: boolean; // Carry flag (bit 4)
}

/**
 * CPU State
 */
export interface CPUState {
  registers: CPURegisters;
  flags: CPUFlags;
  ime: boolean; // Interrupt Master Enable
  halted: boolean;
  stopped: boolean;
  cycles: number;
}

// ============================================================================
// PPU Types (Picture Processing Unit)
// ============================================================================

/**
 * PPU Mode
 */
export type PPUMode = 0 | 1 | 2 | 3; // HBlank, VBlank, OAM Search, Transfer

/**
 * LCD Control Register (LCDC)
 */
export interface LCDControl {
  lcdEnable: boolean; // Bit 7
  windowTileMap: number; // Bit 6 (0x9800 or 0x9C00)
  windowEnable: boolean; // Bit 5
  bgWindowTileData: number; // Bit 4 (0x8000 or 0x8800)
  bgTileMap: number; // Bit 3 (0x9800 or 0x9C00)
  objSize: number; // Bit 2 (8x8 or 8x16)
  objEnable: boolean; // Bit 1
  bgWindowEnable: boolean; // Bit 0
}

/**
 * LCD Status Register (STAT)
 */
export interface LCDStatus {
  lycInterrupt: boolean; // Bit 6
  oamInterrupt: boolean; // Bit 5
  vblankInterrupt: boolean; // Bit 4
  hblankInterrupt: boolean; // Bit 3
  lycFlag: boolean; // Bit 2
  mode: PPUMode; // Bits 0-1
}

/**
 * Sprite (OAM Entry)
 */
export interface Sprite {
  y: number; // Y position
  x: number; // X position
  tile: number; // Tile index
  flags: SpriteFlags;
}

/**
 * Sprite Flags
 */
export interface SpriteFlags {
  priority: boolean; // Bit 7 (0=above BG, 1=behind BG)
  yFlip: boolean; // Bit 6
  xFlip: boolean; // Bit 5
  palette: number; // Bit 4 (DMG: 0=OBP0, 1=OBP1)
  bank: number; // Bit 3 (CGB only)
  cgbPalette: number; // Bits 0-2 (CGB only)
}

/**
 * PPU State
 */
export interface PPUState {
  mode: PPUMode;
  modeClock: number;
  line: number; // Current scanline (LY)
  lyCompare: number; // LYC
  scrollX: number; // SCX
  scrollY: number; // SCY
  windowX: number; // WX
  windowY: number; // WY
  lcdc: LCDControl;
  stat: LCDStatus;
  bgPalette: number; // BGP
  objPalette0: number; // OBP0
  objPalette1: number; // OBP1
  framebuffer: Uint8Array; // 160x144x4 (RGBA)
  oam: Sprite[]; // 40 sprites
}

// ============================================================================
// Memory Types
// ============================================================================

/**
 * Memory Map
 */
export interface MemoryMap {
  // ROM
  rom0: Uint8Array; // 0x0000-0x3FFF (16KB)
  romN: Uint8Array; // 0x4000-0x7FFF (16KB, switchable)
  
  // VRAM
  vram: Uint8Array; // 0x8000-0x9FFF (8KB)
  
  // External RAM
  eram: Uint8Array; // 0xA000-0xBFFF (8KB, switchable)
  
  // Work RAM
  wram0: Uint8Array; // 0xC000-0xCFFF (4KB)
  wramN: Uint8Array; // 0xD000-0xDFFF (4KB, CGB: switchable)
  
  // Echo RAM (mirror of WRAM)
  // 0xE000-0xFDFF
  
  // OAM (Sprite Attribute Table)
  oam: Uint8Array; // 0xFE00-0xFE9F (160 bytes)
  
  // I/O Registers
  io: Uint8Array; // 0xFF00-0xFF7F (128 bytes)
  
  // High RAM
  hram: Uint8Array; // 0xFF80-0xFFFE (127 bytes)
  
  // Interrupt Enable Register
  ie: number; // 0xFFFF
}

/**
 * Memory Bank Controller Type
 */
export type MBCType = 
  | 'NONE' 
  | 'MBC1' 
  | 'MBC2' 
  | 'MBC3' 
  | 'MBC5' 
  | 'MBC6' 
  | 'MBC7';

/**
 * Cartridge Header
 */
export interface CartridgeHeader {
  title: string;
  manufacturer: string;
  cgbFlag: number;
  licensee: string;
  sgbFlag: number;
  cartridgeType: number;
  romSize: number;
  ramSize: number;
  destination: number;
  version: number;
  checksum: number;
}

// ============================================================================
// Timer Types
// ============================================================================

/**
 * Timer State
 */
export interface TimerState {
  div: number; // Divider Register (0xFF04)
  tima: number; // Timer Counter (0xFF05)
  tma: number; // Timer Modulo (0xFF06)
  tac: number; // Timer Control (0xFF07)
  divCycles: number;
  timaCycles: number;
}

// ============================================================================
// Joypad Types
// ============================================================================

/**
 * Joypad Buttons
 */
export interface JoypadState {
  // Direction buttons
  right: boolean;
  left: boolean;
  up: boolean;
  down: boolean;
  
  // Action buttons
  a: boolean;
  b: boolean;
  select: boolean;
  start: boolean;
  
  // Selection
  selectButtons: boolean; // P14
  selectDpad: boolean; // P15
}

// ============================================================================
// Interrupt Types
// ============================================================================

/**
 * Interrupt Flags
 */
export interface InterruptFlags {
  vblank: boolean; // Bit 0
  lcdStat: boolean; // Bit 1
  timer: boolean; // Bit 2
  serial: boolean; // Bit 3
  joypad: boolean; // Bit 4
}

// ============================================================================
// Serial Types
// ============================================================================

/**
 * Serial Transfer State
 */
export interface SerialState {
  data: number; // SB (0xFF01)
  control: number; // SC (0xFF02)
  transferring: boolean;
  bitsSent: number;
  cycles: number;
}

// ============================================================================
// DMA Types
// ============================================================================

/**
 * DMA Transfer State
 */
export interface DMAState {
  active: boolean;
  source: number;
  destination: number;
  length: number;
  cycles: number;
}

// ============================================================================
// CGB Types (Color Game Boy)
// ============================================================================

/**
 * CGB Palette
 */
export interface CGBPalette {
  colors: number[]; // 4 colors per palette, 8 palettes
}

/**
 * CGB State
 */
export interface CGBState {
  mode: boolean; // CGB mode enabled
  speed: number; // 1 = normal, 2 = double speed
  vramBank: number; // 0 or 1
  wramBank: number; // 1-7
  bgPalettes: CGBPalette[];
  objPalettes: CGBPalette[];
  hdma: HDMAState;
}

/**
 * HDMA (Horizontal DMA) State
 */
export interface HDMAState {
  active: boolean;
  mode: number; // 0 = General, 1 = HBlank
  source: number;
  destination: number;
  length: number;
}

// ============================================================================
// Emulator Types
// ============================================================================

/**
 * Game Boy Model
 */
export type GBModel = 'DMG' | 'CGB' | 'SGB';

/**
 * Emulator Configuration
 */
export interface EmulatorConfig {
  model: GBModel;
  bootRom?: Uint8Array;
  skipBootRom: boolean;
  audioEnabled: boolean;
  colorCorrection: boolean;
  frameSkip: number;
  speedMultiplier: number;
}

/**
 * Complete Game Boy State
 */
export interface GameBoyState {
  model: GBModel;
  cpu: CPUState;
  ppu: PPUState;
  memory: MemoryMap;
  timer: TimerState;
  joypad: JoypadState;
  serial: SerialState;
  dma: DMAState;
  interrupts: {
    flags: InterruptFlags;
    enable: InterruptFlags;
  };
  cgb?: CGBState;
  cartridge: CartridgeHeader;
  cycles: number;
  frame: number;
}

/**
 * Emulator Callbacks
 */
export interface EmulatorCallbacks {
  onFrame?: (framebuffer: Uint8Array) => void;
  onAudio?: (samples: Float32Array) => void;
  onSerial?: (byte: number) => void;
  onSave?: (sram: Uint8Array) => void;
}

// ============================================================================
// Instruction Types
// ============================================================================

/**
 * CPU Instruction
 */
export interface Instruction {
  opcode: number;
  mnemonic: string;
  length: number; // Bytes
  cycles: number; // Clock cycles
  execute: (gb: GameBoyState) => void;
}

/**
 * Addressing Mode
 */
export type AddressingMode =
  | 'implied'
  | 'immediate'
  | 'register'
  | 'indirect'
  | 'indexed'
  | 'relative';

// ============================================================================
// Debug Types
// ============================================================================

/**
 * Breakpoint
 */
export interface Breakpoint {
  address: number;
  enabled: boolean;
  condition?: string;
}

/**
 * Debug State
 */
export interface DebugState {
  breakpoints: Breakpoint[];
  watchpoints: number[];
  stepping: boolean;
  paused: boolean;
  history: CPUState[];
}

/**
 * Disassembly Line
 */
export interface DisassemblyLine {
  address: number;
  opcode: number[];
  mnemonic: string;
  operands: string;
  comment?: string;
}

// ============================================================================
// Save State Types
// ============================================================================

/**
 * Save State
 */
export interface SaveState {
  version: number;
  timestamp: number;
  state: GameBoyState;
  screenshot?: Uint8Array;
}

// ============================================================================
// Performance Types
// ============================================================================

/**
 * Performance Metrics
 */
export interface PerformanceMetrics {
  fps: number;
  cyclesPerSecond: number;
  frameTime: number;
  audioLatency: number;
  memoryUsage: number;
}
