#!/usr/bin/env ts-node

/**
 * Music Player CLI Tool
 * Convert and play text-based music notation
 */

import * as fs from 'fs';
import * as path from 'path';

// Mock AudioContext for Node.js environment
class MockAudioContext {
  currentTime = 0;
  destination = {};
  sampleRate = 44100;
  state = 'running';

  createGain() {
    return {
      gain: { setValueAtTime: () => {}, linearRampToValueAtTime: () => {} },
      connect: () => {}
    };
  }

  createOscillator() {
    return {
      type: 'square',
      frequency: { setValueAtTime: () => {}, linearRampToValueAtTime: () => {} },
      connect: () => {},
      start: () => {},
      stop: () => {},
      setPeriodicWave: () => {}
    };
  }

  createPeriodicWave() {
    return {};
  }

  createBuffer() {
    return {
      getChannelData: () => new Float32Array(1024)
    };
  }

  createBufferSource() {
    return {
      buffer: null,
      connect: () => {},
      start: () => {},
      stop: () => {}
    };
  }
}

interface MusicNote {
  pitch: number;
  duration: number;
  velocity: number;
  startTime: number;
}

interface MusicTrack {
  name: string;
  tempo: number;
  timeSignature: { numerator: number; denominator: number };
  channels: Array<{
    channelType: string;
    notes: MusicNote[];
    volume: number;
    pan: number;
    effects: any[];
  }>;
}

/**
 * Simple MML Parser
 */
function parseMML(mml: string): MusicTrack {
  const track: MusicTrack = {
    name: 'Untitled',
    tempo: 120,
    timeSignature: { numerator: 4, denominator: 4 },
    channels: []
  };

  let octave = 4;
  let defaultLength = 4;
  let volume = 15;

  const tokens = mml.toUpperCase().match(/[A-Z][#+-]?\d*\.?|[<>]/g) || [];
  const notes: MusicNote[] = [];
  let currentTime = 0;

  for (const token of tokens) {
    const command = token[0];
    const args = token.slice(1);

    switch (command) {
      case 'T':
        track.tempo = parseInt(args) || 120;
        break;
      case 'O':
        octave = parseInt(args) || 4;
        break;
      case 'L':
        defaultLength = parseInt(args) || 4;
        break;
      case 'V':
        volume = parseInt(args) || 15;
        break;
      case '<':
        octave = Math.max(0, octave - 1);
        break;
      case '>':
        octave = Math.min(8, octave + 1);
        break;
      case 'C':
      case 'D':
      case 'E':
      case 'F':
      case 'G':
      case 'A':
      case 'B':
        const noteMap: Record<string, number> = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
        let midi = (octave + 1) * 12 + noteMap[command];
        
        let restArgs = args;
        if (restArgs.startsWith('#') || restArgs.startsWith('+')) {
          midi++;
          restArgs = restArgs.slice(1);
        } else if (restArgs.startsWith('-')) {
          midi--;
          restArgs = restArgs.slice(1);
        }

        const length = parseInt(restArgs) || defaultLength;
        const duration = 60 / track.tempo * (4 / length);

        notes.push({
          pitch: midi,
          duration,
          velocity: volume,
          startTime: currentTime
        });
        currentTime += duration;
        break;
      case 'R':
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
 * Simple format parser
 */
function parseSimple(text: string, tempo: number = 120): MusicTrack {
  const track: MusicTrack = {
    name: 'Simple Track',
    tempo,
    timeSignature: { numerator: 4, denominator: 4 },
    channels: []
  };

  const notes: MusicNote[] = [];
  let currentTime = 0;

  const lines = text.split('\n');
  for (const line of lines) {
    if (line.trim().startsWith('TEMPO:')) {
      track.tempo = parseInt(line.split(':')[1]) || 120;
      continue;
    }

    const noteTokens = line.split(/\s+/);
    for (const token of noteTokens) {
      if (!token.includes(':') || token.startsWith('#')) continue;

      const [noteName, durationStr] = token.split(':');
      const duration = 60 / track.tempo * (4 / parseFloat(durationStr));
      
      const match = noteName.match(/([A-G][#b]?)(\d+)/);
      if (!match) continue;

      const [, note, octaveStr] = match;
      const noteMap: Record<string, number> = {
        'C': 0, 'C#': 1, 'Db': 1,
        'D': 2, 'D#': 3, 'Eb': 3,
        'E': 4,
        'F': 5, 'F#': 6, 'Gb': 6,
        'G': 7, 'G#': 8, 'Ab': 8,
        'A': 9, 'A#': 10, 'Bb': 10,
        'B': 11
      };

      const midi = (parseInt(octaveStr) + 1) * 12 + noteMap[note];
      notes.push({
        pitch: midi,
        duration,
        velocity: 12,
        startTime: currentTime
      });
      
      currentTime += duration;
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
 * Display track info
 */
function displayTrack(track: MusicTrack): void {
  console.log('\n=== Music Track ===');
  console.log(`Name: ${track.name}`);
  console.log(`Tempo: ${track.tempo} BPM`);
  console.log(`Time Signature: ${track.timeSignature.numerator}/${track.timeSignature.denominator}`);
  console.log(`Channels: ${track.channels.length}`);
  
  for (let i = 0; i < track.channels.length; i++) {
    const channel = track.channels[i];
    console.log(`\nChannel ${i + 1} (${channel.channelType}):`);
    console.log(`  Notes: ${channel.notes.length}`);
    console.log(`  Volume: ${(channel.volume * 100).toFixed(0)}%`);
    
    if (channel.notes.length > 0) {
      const duration = channel.notes[channel.notes.length - 1].startTime + 
                      channel.notes[channel.notes.length - 1].duration;
      console.log(`  Duration: ${duration.toFixed(2)}s`);
    }
  }

  console.log('\n=== Note Sequence ===');
  if (track.channels.length > 0) {
    const notes = track.channels[0].notes.slice(0, 20); // First 20 notes
    for (const note of notes) {
      const noteName = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'][note.pitch % 12];
      const octave = Math.floor(note.pitch / 12) - 1;
      const freq = 440 * Math.pow(2, (note.pitch - 69) / 12);
      console.log(`  ${noteName}${octave} (${freq.toFixed(1)}Hz) - ${(note.duration * 1000).toFixed(0)}ms`);
    }
    if (track.channels[0].notes.length > 20) {
      console.log(`  ... and ${track.channels[0].notes.length - 20} more notes`);
    }
  }
  console.log('');
}

/**
 * Export to MML
 */
function exportMML(track: MusicTrack): string {
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
 * Main CLI
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Music Player CLI Tool');
    console.log('');
    console.log('Usage:');
    console.log('  npm run play:music <file>           - Display music info');
    console.log('  npm run play:music <file> --export  - Export to MML');
    console.log('');
    console.log('Supported formats:');
    console.log('  .txt  - Simple format or MML');
    console.log('  .mml  - MML format');
    console.log('  .json - JSON format');
    console.log('');
    console.log('Examples:');
    console.log('  npm run play:music music/examples/simple-melody.txt');
    console.log('  npm run play:music music/examples/mml-song.txt --export');
    return;
  }

  const filename = args[0];
  const exportMode = args.includes('--export');

  if (!fs.existsSync(filename)) {
    console.error(`Error: File not found: ${filename}`);
    process.exit(1);
  }

  const content = fs.readFileSync(filename, 'utf-8');
  const ext = path.extname(filename).toLowerCase();

  let track: MusicTrack;

  try {
    if (ext === '.json') {
      track = JSON.parse(content);
    } else if (ext === '.mml' || content.includes('T120') || content.includes('O4')) {
      // Detect MML format
      const mmlLines = content.split('\n').filter(line => 
        !line.trim().startsWith('#') && line.trim().length > 0
      );
      track = parseMML(mmlLines.join(' '));
    } else {
      // Simple format
      track = parseSimple(content);
    }

    if (exportMode) {
      console.log('\n=== Exported MML ===');
      console.log(exportMML(track));
      console.log('');
    } else {
      displayTrack(track);
    }

  } catch (error) {
    console.error('Error parsing music file:', error);
    process.exit(1);
  }
}

main();
