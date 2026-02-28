/**
 * Audio System Types
 * Game Boy sound hardware and modern audio support
 */

// ============================================================================
// Game Boy Sound Hardware Types (DMG/CGB)
// ============================================================================

/**
 * Game Boy has 4 sound channels
 */
export type GBChannel = 'pulse1' | 'pulse2' | 'wave' | 'noise';

/**
 * Pulse wave duty cycles (Channel 1 & 2)
 * 12.5%, 25%, 50%, 75%
 */
export type DutyCycle = 0 | 1 | 2 | 3;

/**
 * Wave pattern for Channel 3 (32 4-bit samples)
 */
export type WavePattern = number[]; // 32 samples, 0-15 each

/**
 * Noise channel configuration
 */
export interface NoiseConfig {
  shiftClockFrequency: number; // 0-15
  counterStep: boolean; // false = 15-bit, true = 7-bit
  dividingRatio: number; // 0-7
}

/**
 * Envelope configuration (volume fade)
 */
export interface Envelope {
  initialVolume: number; // 0-15
  direction: 'increase' | 'decrease';
  sweepPace: number; // 0-7 (0 = disabled)
}

/**
 * Frequency sweep (Channel 1 only)
 */
export interface FrequencySweep {
  time: number; // 0-7 (0 = disabled)
  direction: 'increase' | 'decrease';
  shift: number; // 0-7
}

/**
 * Game Boy Sound Channel Configuration
 */
export interface GBSoundChannel {
  channel: GBChannel;
  enabled: boolean;
  
  // Common properties
  frequency: number; // Hz
  length: number; // 0-64 (sound length)
  volume: number; // 0-15
  
  // Channel-specific
  dutyCycle?: DutyCycle; // Pulse channels only
  wavePattern?: WavePattern; // Wave channel only
  noiseConfig?: NoiseConfig; // Noise channel only
  envelope?: Envelope;
  sweep?: FrequencySweep; // Channel 1 only
}

// ============================================================================
// Music Composition Types
// ============================================================================

/**
 * Musical note
 */
export interface Note {
  pitch: number; // MIDI note number (0-127)
  duration: number; // In ticks
  velocity: number; // 0-127
  channel: number; // 0-15
}

/**
 * Note names
 */
export type NoteName = 
  | 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F' 
  | 'F#' | 'G' | 'G#' | 'A' | 'A#' | 'B';

/**
 * Octave range
 */
export type Octave = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

/**
 * Pattern (sequence of notes)
 */
export interface Pattern {
  id: string;
  name: string;
  length: number; // In ticks
  notes: Note[];
  tempo: number; // BPM
}

/**
 * Track (multiple patterns)
 */
export interface Track {
  id: string;
  name: string;
  channel: GBChannel;
  patterns: string[]; // Pattern IDs
  volume: number; // 0-1
  muted: boolean;
  solo: boolean;
}

/**
 * Song composition
 */
export interface Song {
  id: string;
  name: string;
  artist: string;
  tempo: number; // BPM
  timeSignature: [number, number]; // e.g., [4, 4]
  tracks: Track[];
  patterns: Pattern[];
  length: number; // Total ticks
}

// ============================================================================
// Sound Effect Types
// ============================================================================

/**
 * Sound effect types
 */
export type SFXType = 
  | 'jump' | 'land' | 'hit' | 'damage' | 'heal'
  | 'pickup' | 'coin' | 'powerup' | 'explosion'
  | 'shoot' | 'laser' | 'menu' | 'select' | 'cancel'
  | 'door' | 'chest' | 'switch' | 'teleport';

/**
 * Sound effect configuration
 */
export interface SoundEffect {
  id: string;
  name: string;
  type: SFXType;
  channel: GBChannel;
  duration: number; // milliseconds
  
  // Waveform
  waveform: 'pulse' | 'wave' | 'noise';
  
  // Frequency envelope
  startFrequency: number;
  endFrequency: number;
  frequencyCurve: 'linear' | 'exponential' | 'logarithmic';
  
  // Volume envelope
  startVolume: number;
  endVolume: number;
  volumeCurve: 'linear' | 'exponential' | 'logarithmic';
  
  // Additional parameters
  dutyCycle?: DutyCycle;
  noiseType?: 'white' | 'periodic';
}

// ============================================================================
// Audio Engine Types
// ============================================================================

/**
 * Audio context configuration
 */
export interface AudioConfig {
  sampleRate: number; // 44100, 48000, etc.
  bufferSize: number; // 256, 512, 1024, etc.
  channels: number; // 1 (mono) or 2 (stereo)
  gbEmulation: boolean; // Enable GB sound emulation
}

/**
 * Audio playback state
 */
export interface PlaybackState {
  playing: boolean;
  paused: boolean;
  currentTick: number;
  currentPattern: number;
  tempo: number;
  volume: number; // Master volume 0-1
}

/**
 * Instrument definition
 */
export interface Instrument {
  id: string;
  name: string;
  type: 'pulse' | 'wave' | 'noise' | 'sample';
  
  // ADSR Envelope
  attack: number; // 0-1 (seconds)
  decay: number; // 0-1 (seconds)
  sustain: number; // 0-1 (level)
  release: number; // 0-1 (seconds)
  
  // Waveform
  dutyCycle?: DutyCycle;
  wavePattern?: WavePattern;
  noiseConfig?: NoiseConfig;
  
  // Effects
  vibrato?: {
    rate: number; // Hz
    depth: number; // 0-1
  };
  tremolo?: {
    rate: number; // Hz
    depth: number; // 0-1
  };
}

// ============================================================================
// Tracker Format Types (MOD, XM, IT style)
// ============================================================================

/**
 * Tracker row (one step in pattern)
 */
export interface TrackerRow {
  note?: NoteName | 'OFF' | '---'; // Note or note-off or empty
  octave?: Octave;
  instrument?: number; // 0-255
  volume?: number; // 0-64
  effect?: string; // Effect code (e.g., '0xy', '1xx', etc.)
  effectParam?: number; // Effect parameter
}

/**
 * Tracker pattern
 */
export interface TrackerPattern {
  id: string;
  rows: TrackerRow[][]; // [channel][row]
  length: number; // Number of rows (typically 64)
}

/**
 * Tracker module
 */
export interface TrackerModule {
  name: string;
  type: 'MOD' | 'XM' | 'IT' | 'S3M';
  channels: number;
  patterns: TrackerPattern[];
  instruments: Instrument[];
  orderList: number[]; // Pattern play order
  tempo: number;
  speed: number; // Ticks per row
}

// ============================================================================
// Audio File Types
// ============================================================================

/**
 * Supported audio formats
 */
export type AudioFormat = 'wav' | 'mp3' | 'ogg' | 'mod' | 'xm' | 'it' | 'uge' | 'vgm';

/**
 * Audio file metadata
 */
export interface AudioFile {
  id: string;
  name: string;
  format: AudioFormat;
  duration: number; // seconds
  sampleRate: number;
  channels: number;
  bitDepth: number;
  size: number; // bytes
  data: ArrayBuffer;
}

// ============================================================================
// Sequencer Types
// ============================================================================

/**
 * Sequencer event
 */
export interface SequencerEvent {
  tick: number;
  type: 'note_on' | 'note_off' | 'tempo_change' | 'volume_change';
  channel: number;
  data: any;
}

/**
 * Sequencer configuration
 */
export interface SequencerConfig {
  ppq: number; // Pulses per quarter note (typically 96 or 480)
  tempo: number; // BPM
  timeSignature: [number, number];
  loop: boolean;
  loopStart: number; // Tick
  loopEnd: number; // Tick
}

// ============================================================================
// Mixer Types
// ============================================================================

/**
 * Channel strip
 */
export interface ChannelStrip {
  id: string;
  name: string;
  volume: number; // 0-1
  pan: number; // -1 (left) to 1 (right)
  muted: boolean;
  solo: boolean;
  effects: AudioEffect[];
}

/**
 * Audio effect
 */
export interface AudioEffect {
  type: 'reverb' | 'delay' | 'chorus' | 'distortion' | 'eq' | 'compressor';
  enabled: boolean;
  parameters: Record<string, number>;
}

/**
 * Mixer state
 */
export interface MixerState {
  masterVolume: number;
  channels: ChannelStrip[];
}

// ============================================================================
// Visualization Types
// ============================================================================

/**
 * Waveform visualization data
 */
export interface WaveformData {
  samples: Float32Array;
  peaks: number[];
  rms: number[];
}

/**
 * Spectrum analyzer data
 */
export interface SpectrumData {
  frequencies: Float32Array;
  magnitudes: Float32Array;
  binCount: number;
}

// ============================================================================
// Music Track Types (for Music Parser)
// ============================================================================

/**
 * Music note for parsed tracks
 */
export interface MusicNote {
  pitch: number; // MIDI note number
  duration: number; // Duration in seconds
  velocity: number; // Volume 0-15
  startTime: number; // Start time in seconds
}

/**
 * Music channel
 */
export interface MusicChannel {
  channelType: GBChannel;
  notes: MusicNote[];
  volume: number; // 0-1
  pan: number; // 0-1 (0=left, 0.5=center, 1=right)
  effects: any[];
}

/**
 * Complete music track
 */
export interface MusicTrack {
  name: string;
  tempo: number; // BPM
  timeSignature: {
    numerator: number;
    denominator: number;
  };
  channels: MusicChannel[];
}
