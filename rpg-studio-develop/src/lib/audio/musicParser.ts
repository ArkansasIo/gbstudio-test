/**
 * Music Notation Parser
 * Converts text-based music notation to playable audio
 */

import type { 
  MusicTrack, 
  MusicNote, 
  GBSoundChannel, 
  DutyCycle, 
  Envelope,
  WavePattern 
} from './types';
import { GBSoundSystem, GBSoundUtils } from './gbSound';

/**
 * Music Parser
 * Supports multiple notation formats
 */
export class MusicParser {
  /**
   * Parse MML (Music Macro Language) format
   * Example: "T120 O4 L4 C D E F G A B O5 C"
   */
  static parseMML(mml: string): MusicTrack {
    const track: MusicTrack = {
      name: 'Untitled',
      tempo: 120,
      timeSignature: { numerator: 4, denominator: 4 },
      channels: []
    };

    let octave = 4;
    let defaultLength = 4; // Quarter note
    let volume = 15;
    let dutyCycle: DutyCycle = 2; // 50%

    const tokens = mml.toUpperCase().match(/[A-Z][#+-]?\d*\.?|[<>]/g) || [];
    const notes: MusicNote[] = [];
    let currentTime = 0;

    for (const token of tokens) {
      const command = token[0];
      const args = token.slice(1);

      switch (command) {
        case 'T': // Tempo
          track.tempo = parseInt(args) || 120;
          break;

        case 'O': // Octave
          octave = parseInt(args) || 4;
          break;

        case 'L': // Default length
          defaultLength = parseInt(args) || 4;
          break;

        case 'V': // Volume
          volume = parseInt(args) || 15;
          break;

        case '<': // Octave down
          octave = Math.max(0, octave - 1);
          break;

        case '>': // Octave up
          octave = Math.min(8, octave + 1);
          break;

        case 'C':
        case 'D':
        case 'E':
        case 'F':
        case 'G':
        case 'A':
        case 'B':
          const noteData = this.parseNote(command, args, octave, defaultLength);
          notes.push({
            pitch: noteData.midi,
            duration: noteData.duration,
            velocity: volume,
            startTime: currentTime
          });
          currentTime += noteData.duration;
          break;

        case 'R': // Rest
          const restLength = parseInt(args) || defaultLength;
          currentTime += 60 / track.tempo * (4 / restLength);
          break;
      }
    }

    track.channels.push({
      channelType: 'pulse1',
      notes,
      volume: volume / 15,
      pan: 0.5,
      effects: []
    });

    return track;
  }

  /**
   * Parse ABC notation
   * Example: "X:1\nT:Title\nM:4/4\nL:1/4\nK:C\nCDEF GABc"
   */
  static parseABC(abc: string): MusicTrack {
    const track: MusicTrack = {
      name: 'Untitled',
      tempo: 120,
      timeSignature: { numerator: 4, denominator: 4 },
      channels: []
    };

    const lines = abc.split('\n');
    const notes: MusicNote[] = [];
    let currentTime = 0;
    let defaultLength = 0.25; // Quarter note in seconds
    let octave = 4;

    for (const line of lines) {
      const trimmed = line.trim();
      
      if (trimmed.startsWith('T:')) {
        track.name = trimmed.slice(2).trim();
      } else if (trimmed.startsWith('M:')) {
        const [num, den] = trimmed.slice(2).split('/').map(Number);
        track.timeSignature = { numerator: num, denominator: den };
      } else if (trimmed.startsWith('Q:')) {
        track.tempo = parseInt(trimmed.slice(2)) || 120;
      } else if (trimmed.startsWith('L:')) {
        const [num, den] = trimmed.slice(2).split('/').map(Number);
        defaultLength = 60 / track.tempo * (4 / den);
      } else if (!trimmed.startsWith('X:') && !trimmed.startsWith('K:')) {
        // Parse notes
        const noteTokens = trimmed.match(/[A-Ga-gz][',]?[#b]?[\d/]?/g) || [];
        
        for (const token of noteTokens) {
          if (token === 'z') {
            currentTime += defaultLength;
            continue;
          }

          const note = token[0];
          const isLower = note === note.toLowerCase();
          const noteOctave = isLower ? octave + 1 : octave;
          
          const midi = this.noteToMidi(note.toUpperCase(), noteOctave);
          notes.push({
            pitch: midi,
            duration: defaultLength,
            velocity: 12,
            startTime: currentTime
          });
          currentTime += defaultLength;
        }
      }
    }

    track.channels.push({
      channelType: 'pulse1',
      notes,
      volume: 0.8,
      pan: 0.5,
      effects: []
    });

    return track;
  }

  /**
   * Parse simple note list format
   * Example: "C4:4 D4:4 E4:4 F4:4 G4:2"
   * Format: NOTE:DURATION (duration in quarter notes)
   */
  static parseSimple(text: string, tempo: number = 120): MusicTrack {
    const track: MusicTrack = {
      name: 'Simple Track',
      tempo,
      timeSignature: { numerator: 4, denominator: 4 },
      channels: []
    };

    const notes: MusicNote[] = [];
    let currentTime = 0;

    const noteTokens = text.split(/\s+/);
    
    for (const token of noteTokens) {
      if (!token.includes(':')) continue;

      const [noteName, durationStr] = token.split(':');
      const duration = 60 / tempo * (4 / parseFloat(durationStr));
      
      const midi = this.parseNoteName(noteName);
      if (midi >= 0) {
        notes.push({
          pitch: midi,
          duration,
          velocity: 12,
          startTime: currentTime
        });
      }
      
      currentTime += duration;
    }

    track.channels.push({
      channelType: 'pulse1',
      notes,
      volume: 0.8,
      pan: 0.5,
      effects: []
    });

    return track;
  }

  /**
   * Parse JSON format
   */
  static parseJSON(json: string): MusicTrack {
    return JSON.parse(json) as MusicTrack;
  }

  /**
   * Parse note name to MIDI number
   */
  private static parseNoteName(noteName: string): number {
    const match = noteName.match(/([A-G][#b]?)(\d+)/);
    if (!match) return -1;

    const [, note, octave] = match;
    return this.noteToMidi(note, parseInt(octave));
  }

  /**
   * Convert note to MIDI number
   */
  private static noteToMidi(note: string, octave: number): number {
    const noteMap: Record<string, number> = {
      'C': 0, 'C#': 1, 'Db': 1,
      'D': 2, 'D#': 3, 'Eb': 3,
      'E': 4,
      'F': 5, 'F#': 6, 'Gb': 6,
      'G': 7, 'G#': 8, 'Ab': 8,
      'A': 9, 'A#': 10, 'Bb': 10,
      'B': 11
    };

    const noteValue = noteMap[note.toUpperCase()];
    if (noteValue === undefined) return 60; // Default to C4

    return (octave + 1) * 12 + noteValue;
  }

  /**
   * Parse note from MML token
   */
  private static parseNote(note: string, args: string, octave: number, defaultLength: number): { midi: number; duration: number } {
    let midi = this.noteToMidi(note, octave);
    
    // Handle sharps and flats
    if (args.startsWith('#') || args.startsWith('+')) {
      midi++;
      args = args.slice(1);
    } else if (args.startsWith('-')) {
      midi--;
      args = args.slice(1);
    }

    // Parse length
    const length = parseInt(args) || defaultLength;
    const duration = 4 / length; // Convert to quarter notes

    return { midi, duration };
  }

  /**
   * Convert MIDI to frequency
   */
  static midiToFrequency(midi: number): number {
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  /**
   * Export track to MML
   */
  static exportMML(track: MusicTrack): string {
    let mml = `T${track.tempo} `;
    
    if (track.channels.length === 0) return mml;

    const channel = track.channels[0];
    let lastOctave = 4;

    for (const note of channel.notes) {
      const octave = Math.floor(note.pitch / 12) - 1;
      
      if (octave !== lastOctave) {
        mml += `O${octave} `;
        lastOctave = octave;
      }

      const noteName = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'][note.pitch % 12];
      const length = Math.round(4 / (note.duration * track.tempo / 60));
      
      mml += `${noteName}${length} `;
    }

    return mml.trim();
  }

  /**
   * Export track to simple format
   */
  static exportSimple(track: MusicTrack): string {
    if (track.channels.length === 0) return '';

    const channel = track.channels[0];
    const notes: string[] = [];

    for (const note of channel.notes) {
      const octave = Math.floor(note.pitch / 12) - 1;
      const noteName = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'][note.pitch % 12];
      const duration = (note.duration * track.tempo / 60) / 4;
      
      notes.push(`${noteName}${octave}:${duration.toFixed(2)}`);
    }

    return notes.join(' ');
  }
}

/**
 * Music Player
 * Plays parsed music tracks
 */
export class MusicPlayer {
  private audioContext: AudioContext;
  private gbSound: GBSoundSystem;
  private playing = false;
  private startTime = 0;

  constructor(audioContext: AudioContext) {
    this.audioContext = audioContext;
    this.gbSound = new GBSoundSystem(audioContext);
  }

  /**
   * Play music track
   */
  play(track: MusicTrack): void {
    if (this.playing) {
      this.stop();
    }

    this.playing = true;
    this.startTime = this.audioContext.currentTime;

    for (const channel of track.channels) {
      this.playChannel(channel, track.tempo);
    }
  }

  /**
   * Play channel
   */
  private playChannel(channel: any, tempo: number): void {
    for (const note of channel.notes) {
      const frequency = MusicParser.midiToFrequency(note.pitch);
      const startTime = this.startTime + note.startTime;
      const duration = note.duration * 1000; // Convert to ms

      setTimeout(() => {
        if (!this.playing) return;

        const config: GBSoundChannel = {
          channel: channel.channelType,
          enabled: true,
          frequency,
          volume: note.velocity,
          length: Math.floor(duration / 1000 * 256),
          dutyCycle: 2,
          envelope: {
            initialVolume: note.velocity,
            direction: 'decrease',
            sweepPace: 3
          }
        };

        this.gbSound.playNote(config);
      }, (startTime - this.audioContext.currentTime) * 1000);
    }
  }

  /**
   * Stop playback
   */
  stop(): void {
    this.playing = false;
    this.gbSound.stopAll();
  }

  /**
   * Is playing
   */
  isPlaying(): boolean {
    return this.playing;
  }
}
