/**
 * Audio System - Main Exports
 * Complete music and sound system for RPG Workbench
 */

// Types
export type {
  GBChannel,
  DutyCycle,
  WavePattern,
  NoiseConfig,
  Envelope,
  FrequencySweep,
  GBSoundChannel,
  Note,
  NoteName,
  Octave,
  Pattern,
  Track,
  Song,
  SFXType,
  SoundEffect,
  AudioConfig,
  PlaybackState,
  Instrument,
  TrackerRow,
  TrackerPattern,
  TrackerModule,
  AudioFormat,
  AudioFile,
  SequencerEvent,
  SequencerConfig,
  ChannelStrip,
  AudioEffect,
  MixerState,
  WaveformData,
  SpectrumData
} from './types';

// Game Boy Sound
export { GBSoundSystem, GBSoundUtils } from './gbSound';

// Sound Effects
export { SFXGenerator, SFXLibrary } from './sfxGenerator';

// Music Parser and Player
export { MusicParser, MusicPlayer } from './musicParser';

// Quick start example
export function quickStartAudio() {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  
  const { GBSoundSystem } = require('./gbSound');
  const { SFXLibrary } = require('./sfxGenerator');
  
  const gbSound = new GBSoundSystem(audioContext);
  const sfxLib = new SFXLibrary(audioContext);
  
  return {
    audioContext,
    gbSound,
    sfxLib,
    
    // Quick play functions
    playNote: (frequency: number, channel: 'pulse1' | 'pulse2' | 'wave' | 'noise' = 'pulse1') => {
      gbSound.playNote({
        channel,
        enabled: true,
        frequency,
        length: 32,
        volume: 12,
        dutyCycle: 2
      });
    },
    
    playSFX: (type: string) => {
      sfxLib.playType(type as any);
    },
    
    stopAll: () => {
      gbSound.stopAll();
    }
  };
}
