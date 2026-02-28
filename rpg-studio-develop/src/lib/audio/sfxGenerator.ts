/**
 * Sound Effect Generator
 * Procedural sound effect generation for games
 */

import type { SoundEffect, SFXType, GBChannel } from './types';
import { GBSoundSystem, GBSoundUtils } from './gbSound';

/**
 * Sound Effect Generator
 */
export class SFXGenerator {
  private gbSound: GBSoundSystem;
  private audioContext: AudioContext;
  
  constructor(audioContext: AudioContext) {
    this.audioContext = audioContext;
    this.gbSound = new GBSoundSystem(audioContext);
  }
  
  /**
   * Generate and play sound effect
   */
  play(sfx: SoundEffect): void {
    const now = this.audioContext.currentTime;
    const duration = sfx.duration / 1000; // Convert to seconds
    
    // Create oscillator based on waveform
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    // Set waveform
    this.setWaveform(oscillator, sfx);
    
    // Apply frequency envelope
    this.applyFrequencyEnvelope(oscillator, sfx, now, duration);
    
    // Apply volume envelope
    this.applyVolumeEnvelope(gainNode, sfx, now, duration);
    
    // Connect and play
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.start(now);
    oscillator.stop(now + duration);
  }
  
  private setWaveform(oscillator: OscillatorNode, sfx: SoundEffect): void {
    switch (sfx.waveform) {
      case 'pulse':
        oscillator.type = 'square';
        break;
      case 'wave':
        oscillator.type = 'sine';
        break;
      case 'noise':
        // Noise requires buffer source, handled separately
        oscillator.type = 'sawtooth';
        break;
    }
  }
  
  private applyFrequencyEnvelope(
    oscillator: OscillatorNode,
    sfx: SoundEffect,
    startTime: number,
    duration: number
  ): void {
    oscillator.frequency.setValueAtTime(sfx.startFrequency, startTime);
    
    switch (sfx.frequencyCurve) {
      case 'linear':
        oscillator.frequency.linearRampToValueAtTime(
          sfx.endFrequency,
          startTime + duration
        );
        break;
      case 'exponential':
        oscillator.frequency.exponentialRampToValueAtTime(
          Math.max(0.01, sfx.endFrequency),
          startTime + duration
        );
        break;
      case 'logarithmic':
        // Approximate logarithmic curve
        const steps = 10;
        for (let i = 1; i <= steps; i++) {
          const t = i / steps;
          const logT = Math.log(1 + t * 9) / Math.log(10);
          const freq = sfx.startFrequency + 
            (sfx.endFrequency - sfx.startFrequency) * logT;
          oscillator.frequency.linearRampToValueAtTime(
            freq,
            startTime + (duration * t)
          );
        }
        break;
    }
  }
  
  private applyVolumeEnvelope(
    gainNode: GainNode,
    sfx: SoundEffect,
    startTime: number,
    duration: number
  ): void {
    gainNode.gain.setValueAtTime(sfx.startVolume, startTime);
    
    switch (sfx.volumeCurve) {
      case 'linear':
        gainNode.gain.linearRampToValueAtTime(
          sfx.endVolume,
          startTime + duration
        );
        break;
      case 'exponential':
        gainNode.gain.exponentialRampToValueAtTime(
          Math.max(0.01, sfx.endVolume),
          startTime + duration
        );
        break;
      case 'logarithmic':
        const steps = 10;
        for (let i = 1; i <= steps; i++) {
          const t = i / steps;
          const logT = Math.log(1 + t * 9) / Math.log(10);
          const vol = sfx.startVolume + 
            (sfx.endVolume - sfx.startVolume) * logT;
          gainNode.gain.linearRampToValueAtTime(
            vol,
            startTime + (duration * t)
          );
        }
        break;
    }
  }
  
  /**
   * Create preset sound effects
   */
  static createPreset(type: SFXType): SoundEffect {
    const presets: Record<SFXType, Partial<SoundEffect>> = {
      jump: {
        waveform: 'pulse',
        startFrequency: 200,
        endFrequency: 400,
        frequencyCurve: 'exponential',
        startVolume: 0.5,
        endVolume: 0,
        volumeCurve: 'exponential',
        duration: 150,
        channel: 'pulse1'
      },
      land: {
        waveform: 'noise',
        startFrequency: 100,
        endFrequency: 50,
        frequencyCurve: 'exponential',
        startVolume: 0.6,
        endVolume: 0,
        volumeCurve: 'exponential',
        duration: 100,
        channel: 'noise'
      },
      hit: {
        waveform: 'noise',
        startFrequency: 800,
        endFrequency: 200,
        frequencyCurve: 'exponential',
        startVolume: 0.7,
        endVolume: 0,
        volumeCurve: 'exponential',
        duration: 80,
        channel: 'noise'
      },
      damage: {
        waveform: 'pulse',
        startFrequency: 400,
        endFrequency: 100,
        frequencyCurve: 'exponential',
        startVolume: 0.6,
        endVolume: 0,
        volumeCurve: 'linear',
        duration: 200,
        channel: 'pulse2'
      },
      heal: {
        waveform: 'wave',
        startFrequency: 400,
        endFrequency: 800,
        frequencyCurve: 'linear',
        startVolume: 0.4,
        endVolume: 0,
        volumeCurve: 'exponential',
        duration: 300,
        channel: 'wave'
      },
      pickup: {
        waveform: 'pulse',
        startFrequency: 600,
        endFrequency: 1200,
        frequencyCurve: 'linear',
        startVolume: 0.5,
        endVolume: 0,
        volumeCurve: 'exponential',
        duration: 100,
        channel: 'pulse1'
      },
      coin: {
        waveform: 'pulse',
        startFrequency: 800,
        endFrequency: 1600,
        frequencyCurve: 'linear',
        startVolume: 0.4,
        endVolume: 0,
        volumeCurve: 'exponential',
        duration: 80,
        channel: 'pulse1'
      },
      powerup: {
        waveform: 'wave',
        startFrequency: 200,
        endFrequency: 1200,
        frequencyCurve: 'exponential',
        startVolume: 0.5,
        endVolume: 0,
        volumeCurve: 'exponential',
        duration: 500,
        channel: 'wave'
      },
      explosion: {
        waveform: 'noise',
        startFrequency: 1000,
        endFrequency: 50,
        frequencyCurve: 'exponential',
        startVolume: 0.8,
        endVolume: 0,
        volumeCurve: 'exponential',
        duration: 400,
        channel: 'noise'
      },
      shoot: {
        waveform: 'noise',
        startFrequency: 600,
        endFrequency: 200,
        frequencyCurve: 'exponential',
        startVolume: 0.5,
        endVolume: 0,
        volumeCurve: 'exponential',
        duration: 100,
        channel: 'noise'
      },
      laser: {
        waveform: 'pulse',
        startFrequency: 1200,
        endFrequency: 400,
        frequencyCurve: 'linear',
        startVolume: 0.6,
        endVolume: 0,
        volumeCurve: 'exponential',
        duration: 150,
        channel: 'pulse2'
      },
      menu: {
        waveform: 'pulse',
        startFrequency: 800,
        endFrequency: 800,
        frequencyCurve: 'linear',
        startVolume: 0.3,
        endVolume: 0,
        volumeCurve: 'exponential',
        duration: 50,
        channel: 'pulse1'
      },
      select: {
        waveform: 'pulse',
        startFrequency: 600,
        endFrequency: 900,
        frequencyCurve: 'linear',
        startVolume: 0.3,
        endVolume: 0,
        volumeCurve: 'exponential',
        duration: 60,
        channel: 'pulse1'
      },
      cancel: {
        waveform: 'pulse',
        startFrequency: 400,
        endFrequency: 200,
        frequencyCurve: 'linear',
        startVolume: 0.3,
        endVolume: 0,
        volumeCurve: 'exponential',
        duration: 80,
        channel: 'pulse2'
      },
      door: {
        waveform: 'noise',
        startFrequency: 200,
        endFrequency: 100,
        frequencyCurve: 'linear',
        startVolume: 0.4,
        endVolume: 0,
        volumeCurve: 'linear',
        duration: 300,
        channel: 'noise'
      },
      chest: {
        waveform: 'wave',
        startFrequency: 300,
        endFrequency: 600,
        frequencyCurve: 'exponential',
        startVolume: 0.5,
        endVolume: 0,
        volumeCurve: 'exponential',
        duration: 400,
        channel: 'wave'
      },
      switch: {
        waveform: 'pulse',
        startFrequency: 500,
        endFrequency: 700,
        frequencyCurve: 'linear',
        startVolume: 0.4,
        endVolume: 0,
        volumeCurve: 'exponential',
        duration: 100,
        channel: 'pulse1'
      },
      teleport: {
        waveform: 'wave',
        startFrequency: 400,
        endFrequency: 1600,
        frequencyCurve: 'exponential',
        startVolume: 0.5,
        endVolume: 0,
        volumeCurve: 'exponential',
        duration: 600,
        channel: 'wave'
      }
    };
    
    const preset = presets[type];
    return {
      id: `sfx_${type}`,
      name: type.replace('_', ' ').toUpperCase(),
      type,
      ...preset
    } as SoundEffect;
  }
  
  /**
   * Generate random sound effect
   */
  static generateRandom(type: SFXType): SoundEffect {
    const waveforms: Array<'pulse' | 'wave' | 'noise'> = ['pulse', 'wave', 'noise'];
    const curves: Array<'linear' | 'exponential' | 'logarithmic'> = ['linear', 'exponential', 'logarithmic'];
    
    return {
      id: `sfx_random_${Date.now()}`,
      name: `Random ${type}`,
      type,
      channel: 'pulse1',
      duration: Math.random() * 500 + 50,
      waveform: waveforms[Math.floor(Math.random() * waveforms.length)],
      startFrequency: Math.random() * 1000 + 100,
      endFrequency: Math.random() * 1000 + 100,
      frequencyCurve: curves[Math.floor(Math.random() * curves.length)],
      startVolume: Math.random() * 0.5 + 0.3,
      endVolume: 0,
      volumeCurve: curves[Math.floor(Math.random() * curves.length)]
    };
  }
}

/**
 * Sound Effect Library
 * Pre-built sound effects for common game events
 */
export class SFXLibrary {
  private effects: Map<string, SoundEffect>;
  private generator: SFXGenerator;
  
  constructor(audioContext: AudioContext) {
    this.generator = new SFXGenerator(audioContext);
    this.effects = new Map();
    this.loadPresets();
  }
  
  private loadPresets(): void {
    const types: SFXType[] = [
      'jump', 'land', 'hit', 'damage', 'heal',
      'pickup', 'coin', 'powerup', 'explosion',
      'shoot', 'laser', 'menu', 'select', 'cancel',
      'door', 'chest', 'switch', 'teleport'
    ];
    
    types.forEach(type => {
      const sfx = SFXGenerator.createPreset(type);
      this.effects.set(sfx.id, sfx);
    });
  }
  
  /**
   * Play sound effect by ID
   */
  play(id: string): void {
    const sfx = this.effects.get(id);
    if (sfx) {
      this.generator.play(sfx);
    }
  }
  
  /**
   * Play sound effect by type
   */
  playType(type: SFXType): void {
    const sfx = Array.from(this.effects.values()).find(s => s.type === type);
    if (sfx) {
      this.generator.play(sfx);
    }
  }
  
  /**
   * Add custom sound effect
   */
  add(sfx: SoundEffect): void {
    this.effects.set(sfx.id, sfx);
  }
  
  /**
   * Get all sound effects
   */
  getAll(): SoundEffect[] {
    return Array.from(this.effects.values());
  }
  
  /**
   * Get sound effect by ID
   */
  get(id: string): SoundEffect | undefined {
    return this.effects.get(id);
  }
}
