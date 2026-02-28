/**
 * Game Boy Sound Hardware Emulation
 * Based on DMG/CGB specifications
 */

import type { 
  GBSoundChannel, 
  GBChannel, 
  DutyCycle, 
  WavePattern,
  NoiseConfig,
  Envelope,
  FrequencySweep 
} from './types';

/**
 * Game Boy Sound System
 * Emulates the 4 channels of the original Game Boy
 */
export class GBSoundSystem {
  private audioContext: AudioContext;
  private channels: Map<GBChannel, GBChannelEmulator>;
  private masterVolume: GainNode;
  
  constructor(audioContext: AudioContext) {
    this.audioContext = audioContext;
    this.masterVolume = audioContext.createGain();
    this.masterVolume.connect(audioContext.destination);
    
    this.channels = new Map();
    this.initializeChannels();
  }
  
  private initializeChannels(): void {
    this.channels.set('pulse1', new PulseChannel(this.audioContext, this.masterVolume, true));
    this.channels.set('pulse2', new PulseChannel(this.audioContext, this.masterVolume, false));
    this.channels.set('wave', new WaveChannel(this.audioContext, this.masterVolume));
    this.channels.set('noise', new NoiseChannel(this.audioContext, this.masterVolume));
  }
  
  /**
   * Play note on channel
   */
  playNote(config: GBSoundChannel): void {
    const channel = this.channels.get(config.channel);
    if (channel) {
      channel.play(config);
    }
  }
  
  /**
   * Stop channel
   */
  stopChannel(channel: GBChannel): void {
    const ch = this.channels.get(channel);
    if (ch) {
      ch.stop();
    }
  }
  
  /**
   * Set master volume
   */
  setMasterVolume(volume: number): void {
    this.masterVolume.gain.setValueAtTime(volume, this.audioContext.currentTime);
  }
  
  /**
   * Stop all channels
   */
  stopAll(): void {
    this.channels.forEach(channel => channel.stop());
  }
}

/**
 * Base channel emulator
 */
abstract class GBChannelEmulator {
  protected audioContext: AudioContext;
  protected output: GainNode;
  protected oscillator?: OscillatorNode;
  protected gainNode?: GainNode;
  
  constructor(audioContext: AudioContext, output: GainNode) {
    this.audioContext = audioContext;
    this.output = output;
  }
  
  abstract play(config: GBSoundChannel): void;
  
  stop(): void {
    if (this.oscillator) {
      this.oscillator.stop();
      this.oscillator.disconnect();
      this.oscillator = undefined;
    }
    if (this.gainNode) {
      this.gainNode.disconnect();
      this.gainNode = undefined;
    }
  }
  
  protected applyEnvelope(envelope: Envelope, duration: number): void {
    if (!this.gainNode) return;
    
    const now = this.audioContext.currentTime;
    const initialVolume = envelope.initialVolume / 15;
    const sweepTime = (envelope.sweepPace / 64) * duration;
    
    this.gainNode.gain.setValueAtTime(initialVolume, now);
    
    if (envelope.sweepPace > 0) {
      const targetVolume = envelope.direction === 'increase' ? 1 : 0;
      this.gainNode.gain.linearRampToValueAtTime(targetVolume, now + sweepTime);
    }
  }
}

/**
 * Pulse Wave Channel (Channel 1 & 2)
 */
class PulseChannel extends GBChannelEmulator {
  private hasSweep: boolean;
  
  constructor(audioContext: AudioContext, output: GainNode, hasSweep: boolean) {
    super(audioContext, output);
    this.hasSweep = hasSweep;
  }
  
  play(config: GBSoundChannel): void {
    this.stop();
    
    // Create oscillator
    this.oscillator = this.audioContext.createOscillator();
    this.oscillator.type = 'square';
    this.oscillator.frequency.setValueAtTime(config.frequency, this.audioContext.currentTime);
    
    // Apply duty cycle by using custom waveform
    if (config.dutyCycle !== undefined) {
      this.applyDutyCycle(config.dutyCycle);
    }
    
    // Create gain node
    this.gainNode = this.audioContext.createGain();
    this.gainNode.gain.setValueAtTime(config.volume / 15, this.audioContext.currentTime);
    
    // Connect nodes
    this.oscillator.connect(this.gainNode);
    this.gainNode.connect(this.output);
    
    // Apply envelope
    if (config.envelope) {
      const duration = config.length / 256; // Convert to seconds
      this.applyEnvelope(config.envelope, duration);
    }
    
    // Apply frequency sweep (Channel 1 only)
    if (this.hasSweep && config.sweep && config.sweep.time > 0) {
      this.applyFrequencySweep(config.sweep, config.frequency);
    }
    
    // Start and schedule stop
    const now = this.audioContext.currentTime;
    this.oscillator.start(now);
    
    if (config.length > 0) {
      const duration = config.length / 256; // Convert to seconds
      this.oscillator.stop(now + duration);
    }
  }
  
  private applyDutyCycle(dutyCycle: DutyCycle): void {
    // Game Boy duty cycles: 12.5%, 25%, 50%, 75%
    const dutyCycles = [0.125, 0.25, 0.5, 0.75];
    const duty = dutyCycles[dutyCycle];
    
    // Create custom waveform
    const real = new Float32Array(2);
    const imag = new Float32Array(2);
    real[0] = 0;
    real[1] = duty * 2 - 1;
    imag[0] = 0;
    imag[1] = 0;
    
    const wave = this.audioContext.createPeriodicWave(real, imag);
    if (this.oscillator) {
      this.oscillator.setPeriodicWave(wave);
    }
  }
  
  private applyFrequencySweep(sweep: FrequencySweep, startFreq: number): void {
    if (!this.oscillator) return;
    
    const now = this.audioContext.currentTime;
    const sweepTime = sweep.time / 128; // Convert to seconds
    
    if (sweepTime > 0) {
      const freqChange = startFreq / Math.pow(2, sweep.shift);
      const endFreq = sweep.direction === 'increase' 
        ? startFreq + freqChange 
        : startFreq - freqChange;
      
      this.oscillator.frequency.linearRampToValueAtTime(endFreq, now + sweepTime);
    }
  }
}

/**
 * Wave Channel (Channel 3)
 */
class WaveChannel extends GBChannelEmulator {
  play(config: GBSoundChannel): void {
    this.stop();
    
    // Create oscillator with custom waveform
    this.oscillator = this.audioContext.createOscillator();
    
    if (config.wavePattern) {
      const wave = this.createWaveTable(config.wavePattern);
      this.oscillator.setPeriodicWave(wave);
    }
    
    this.oscillator.frequency.setValueAtTime(config.frequency, this.audioContext.currentTime);
    
    // Create gain node
    this.gainNode = this.audioContext.createGain();
    this.gainNode.gain.setValueAtTime(config.volume / 15, this.audioContext.currentTime);
    
    // Connect nodes
    this.oscillator.connect(this.gainNode);
    this.gainNode.connect(this.output);
    
    // Apply envelope
    if (config.envelope) {
      const duration = config.length / 256;
      this.applyEnvelope(config.envelope, duration);
    }
    
    // Start and schedule stop
    const now = this.audioContext.currentTime;
    this.oscillator.start(now);
    
    if (config.length > 0) {
      const duration = config.length / 256;
      this.oscillator.stop(now + duration);
    }
  }
  
  private createWaveTable(pattern: WavePattern): PeriodicWave {
    // Convert 32 4-bit samples to waveform
    const real = new Float32Array(pattern.length);
    const imag = new Float32Array(pattern.length);
    
    for (let i = 0; i < pattern.length; i++) {
      real[i] = (pattern[i] / 15) * 2 - 1; // Normalize to -1 to 1
      imag[i] = 0;
    }
    
    return this.audioContext.createPeriodicWave(real, imag);
  }
}

/**
 * Noise Channel (Channel 4)
 */
class NoiseChannel extends GBChannelEmulator {
  private bufferSource?: AudioBufferSourceNode;
  
  play(config: GBSoundChannel): void {
    this.stop();
    
    if (!config.noiseConfig) return;
    
    // Create noise buffer
    const buffer = this.createNoiseBuffer(config.noiseConfig, config.length / 256);
    
    // Create buffer source
    this.bufferSource = this.audioContext.createBufferSource();
    this.bufferSource.buffer = buffer;
    
    // Create gain node
    this.gainNode = this.audioContext.createGain();
    this.gainNode.gain.setValueAtTime(config.volume / 15, this.audioContext.currentTime);
    
    // Connect nodes
    this.bufferSource.connect(this.gainNode);
    this.gainNode.connect(this.output);
    
    // Apply envelope
    if (config.envelope) {
      const duration = config.length / 256;
      this.applyEnvelope(config.envelope, duration);
    }
    
    // Start
    this.bufferSource.start(this.audioContext.currentTime);
  }
  
  override stop(): void {
    super.stop();
    if (this.bufferSource) {
      this.bufferSource.stop();
      this.bufferSource.disconnect();
      this.bufferSource = undefined;
    }
  }
  
  private createNoiseBuffer(config: NoiseConfig, duration: number): AudioBuffer {
    const sampleRate = this.audioContext.sampleRate;
    const length = sampleRate * duration;
    const buffer = this.audioContext.createBuffer(1, length, sampleRate);
    const data = buffer.getChannelData(0);
    
    // Generate noise using LFSR (Linear Feedback Shift Register)
    let lfsr = 0x7FFF; // 15-bit LFSR
    const bits = config.counterStep ? 7 : 15;
    
    for (let i = 0; i < length; i++) {
      // Generate noise sample
      const bit = (lfsr & 1) ? 1 : -1;
      data[i] = bit;
      
      // Update LFSR
      const feedback = ((lfsr >> 1) ^ lfsr) & 1;
      lfsr = (lfsr >> 1) | (feedback << (bits - 1));
    }
    
    return buffer;
  }
}

/**
 * Utility functions for Game Boy sound
 */
export class GBSoundUtils {
  /**
   * Convert MIDI note to Game Boy frequency
   */
  static midiToGBFrequency(midiNote: number): number {
    // Game Boy frequency = 131072 / (2048 - x)
    // where x is the frequency register value
    const frequency = 440 * Math.pow(2, (midiNote - 69) / 12);
    return frequency;
  }
  
  /**
   * Convert frequency to Game Boy register value
   */
  static frequencyToGBRegister(frequency: number): number {
    return 2048 - Math.floor(131072 / frequency);
  }
  
  /**
   * Create default pulse wave pattern
   */
  static createPulsePattern(dutyCycle: DutyCycle): WavePattern {
    const pattern: number[] = new Array(32).fill(0);
    const dutyLength = Math.floor(32 * [0.125, 0.25, 0.5, 0.75][dutyCycle]);
    
    for (let i = 0; i < dutyLength; i++) {
      pattern[i] = 15;
    }
    
    return pattern;
  }
  
  /**
   * Create sawtooth wave pattern
   */
  static createSawtoothPattern(): WavePattern {
    const pattern: number[] = [];
    for (let i = 0; i < 32; i++) {
      pattern.push(Math.floor((i / 32) * 15));
    }
    return pattern;
  }
  
  /**
   * Create triangle wave pattern
   */
  static createTrianglePattern(): WavePattern {
    const pattern: number[] = [];
    for (let i = 0; i < 32; i++) {
      const value = i < 16 
        ? Math.floor((i / 16) * 15)
        : Math.floor(((32 - i) / 16) * 15);
      pattern.push(value);
    }
    return pattern;
  }
  
  /**
   * Create sine wave pattern
   */
  static createSinePattern(): WavePattern {
    const pattern: number[] = [];
    for (let i = 0; i < 32; i++) {
      const value = Math.floor((Math.sin((i / 32) * Math.PI * 2) + 1) * 7.5);
      pattern.push(value);
    }
    return pattern;
  }
}
