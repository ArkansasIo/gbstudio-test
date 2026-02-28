/**
 * Procedural Dungeon Generator
 * Uses BSP (Binary Space Partitioning) algorithm
 */

import { Dungeon, DungeonConfig, Room, RoomType } from './types';
import { SeededRandom } from './random';
import { generateEncounter } from './encounters';
import { generateTreasure } from './treasure';
import { getBiome } from './biomes';

interface BSPNode {
  x: number;
  y: number;
  width: number;
  height: number;
  left?: BSPNode;
  right?: BSPNode;
  room?: Room;
}

export class DungeonGenerator {
  private random: SeededRandom;
  private config: DungeonConfig;
  private rooms: Room[] = [];
  private grid: number[][];
  private roomCounter = 0;

  constructor(config: DungeonConfig) {
    this.config = config;
    this.random = new SeededRandom(config.seed);
    this.grid = Array(config.height).fill(0).map(() => Array(config.width).fill(0));
  }

  generate(): Dungeon {
    const root = this.createBSPTree();
    this.createRooms(root);
    this.connectRooms(root);
    this.addSpecialRooms();
    this.populateRooms();

    return {
      id: `dungeon_${this.config.seed}`,
      config: this.config,
      rooms: this.rooms,
      grid: this.grid,
      startRoomId: this.rooms[0].id,
      bossRoomId: this.rooms.find(r => r.type === 'boss')?.id
    };
  }

  private createBSPTree(): BSPNode {
    const root: BSPNode = {
      x: 0,
      y: 0,
      width: this.config.width,
      height: this.config.height
    };

    this.splitNode(root, 0);
    return root;
  }

  private splitNode(node: BSPNode, depth: number): void {
    const maxDepth = Math.log2(this.config.maxRooms);
    if (depth >= maxDepth) return;

    const minSize = 8;
    if (node.width < minSize * 2 && node.height < minSize * 2) return;

    const splitHorizontal = this.random.next() > 0.5;

    if (splitHorizontal && node.height >= minSize * 2) {
      const splitY = Math.floor(node.height / 2) + this.random.nextInt(-2, 2);
      node.left = {
        x: node.x,
        y: node.y,
        width: node.width,
        height: splitY
      };
      node.right = {
        x: node.x,
        y: node.y + splitY,
        width: node.width,
        height: node.height - splitY
      };
    } else if (!splitHorizontal && node.width >= minSize * 2) {
      const splitX = Math.floor(node.width / 2) + this.random.nextInt(-2, 2);
      node.left = {
        x: node.x,
        y: node.y,
        width: splitX,
        height: node.height
      };
      node.right = {
        x: node.x + splitX,
        y: node.y,
        width: node.width - splitX,
        height: node.height
      };
    }

    if (node.left && node.right) {
      this.splitNode(node.left, depth + 1);
      this.splitNode(node.right, depth + 1);
    }
  }

  private createRooms(node: BSPNode): void {
    if (node.left || node.right) {
      if (node.left) this.createRooms(node.left);
      if (node.right) this.createRooms(node.right);
      return;
    }

    const padding = 2;
    const roomWidth = this.random.nextInt(5, node.width - padding * 2);
    const roomHeight = this.random.nextInt(5, node.height - padding * 2);
    const roomX = node.x + this.random.nextInt(padding, node.width - roomWidth - padding);
    const roomY = node.y + this.random.nextInt(padding, node.height - roomHeight - padding);

    const room: Room = {
      id: `room_${this.roomCounter++}`,
      type: 'chamber',
      x: roomX,
      y: roomY,
      width: roomWidth,
      height: roomHeight,
      connections: [],
      features: [],
      description: ''
    };

    node.room = room;
    this.rooms.push(room);
    this.fillGrid(room);
  }

  private fillGrid(room: Room): void {
    for (let y = room.y; y < room.y + room.height; y++) {
      for (let x = room.x; x < room.x + room.width; x++) {
        if (y >= 0 && y < this.config.height && x >= 0 && x < this.config.width) {
          this.grid[y][x] = parseInt(room.id.split('_')[1]) + 1;
        }
      }
    }
  }

  private connectRooms(node: BSPNode): void {
    if (node.left && node.right) {
      this.connectRooms(node.left);
      this.connectRooms(node.right);

      const leftRoom = this.getLeafRoom(node.left);
      const rightRoom = this.getLeafRoom(node.right);

      if (leftRoom && rightRoom) {
        this.createCorridor(leftRoom, rightRoom);
      }
    }
  }

  private getLeafRoom(node: BSPNode): Room | null {
    if (node.room) return node.room;
    if (node.left) {
      const room = this.getLeafRoom(node.left);
      if (room) return room;
    }
    if (node.right) {
      return this.getLeafRoom(node.right);
    }
    return null;
  }

  private createCorridor(room1: Room, room2: Room): void {
    const x1 = Math.floor(room1.x + room1.width / 2);
    const y1 = Math.floor(room1.y + room1.height / 2);
    const x2 = Math.floor(room2.x + room2.width / 2);
    const y2 = Math.floor(room2.y + room2.height / 2);

    room1.connections.push(room2.id);
    room2.connections.push(room1.id);

    // L-shaped corridor
    if (this.random.next() > 0.5) {
      this.drawHorizontalCorridor(x1, x2, y1);
      this.drawVerticalCorridor(y1, y2, x2);
    } else {
      this.drawVerticalCorridor(y1, y2, x1);
      this.drawHorizontalCorridor(x1, x2, y2);
    }
  }

  private drawHorizontalCorridor(x1: number, x2: number, y: number): void {
    const start = Math.min(x1, x2);
    const end = Math.max(x1, x2);
    for (let x = start; x <= end; x++) {
      if (y >= 0 && y < this.config.height && x >= 0 && x < this.config.width) {
        if (this.grid[y][x] === 0) this.grid[y][x] = -1; // Corridor marker
      }
    }
  }

  private drawVerticalCorridor(y1: number, y2: number, x: number): void {
    const start = Math.min(y1, y2);
    const end = Math.max(y1, y2);
    for (let y = start; y <= end; y++) {
      if (y >= 0 && y < this.config.height && x >= 0 && x < this.config.width) {
        if (this.grid[y][x] === 0) this.grid[y][x] = -1;
      }
    }
  }

  private addSpecialRooms(): void {
    if (this.rooms.length === 0) return;

    // Entrance
    this.rooms[0].type = 'entrance';

    // Boss room (furthest from entrance)
    const bossRoom = this.rooms[this.rooms.length - 1];
    bossRoom.type = 'boss';

    // Treasure rooms
    const treasureCount = Math.floor(this.rooms.length * this.config.treasureDensity);
    for (let i = 0; i < treasureCount; i++) {
      const idx = this.random.nextInt(1, this.rooms.length - 1);
      if (this.rooms[idx].type === 'chamber') {
        this.rooms[idx].type = 'treasure';
      }
    }

    // Trap rooms
    const trapCount = Math.floor(this.rooms.length * this.config.trapDensity);
    for (let i = 0; i < trapCount; i++) {
      const idx = this.random.nextInt(1, this.rooms.length - 1);
      if (this.rooms[idx].type === 'chamber') {
        this.rooms[idx].type = 'trap';
      }
    }

    // Rest area
    if (this.rooms.length > 5) {
      const restIdx = Math.floor(this.rooms.length / 2);
      if (this.rooms[restIdx].type === 'chamber') {
        this.rooms[restIdx].type = 'rest';
      }
    }
  }

  private populateRooms(): void {
    const biome = getBiome(this.config.biome);

    this.rooms.forEach(room => {
      // Add terrain features
      const featureCount = this.random.nextInt(0, 3);
      for (let i = 0; i < featureCount; i++) {
        const feature = biome.features[this.random.nextInt(0, biome.features.length)];
        if (!room.features.includes(feature)) {
          room.features.push(feature);
        }
      }

      // Add encounters
      if (room.type !== 'entrance' && room.type !== 'rest') {
        const encounterChance = room.type === 'boss' ? 1.0 : 0.6;
        if (this.random.next() < encounterChance) {
          room.encounter = generateEncounter(
            this.config.difficulty,
            this.config.biome,
            room.type === 'boss',
            this.random
          );
        }
      }

      // Add treasure
      if (room.type === 'treasure' || room.type === 'boss') {
        room.treasure = generateTreasure(
          this.config.difficulty,
          room.type === 'boss' ? 'legendary' : 'rare',
          this.random
        );
      }

      // Generate description
      room.description = this.generateRoomDescription(room, biome.name);
    });
  }

  private generateRoomDescription(room: Room, biomeName: string): string {
    const descriptions: Record<RoomType, string[]> = {
      entrance: ['The entrance to the dungeon', 'A dark threshold beckons'],
      corridor: ['A narrow passageway', 'A connecting hallway'],
      chamber: ['A large chamber', 'An open room', 'A spacious hall'],
      treasure: ['A vault filled with riches', 'A treasure chamber glitters'],
      boss: ['An ominous throne room', 'The lair of a powerful foe'],
      trap: ['Something feels wrong here', 'Danger lurks in this room'],
      puzzle: ['Ancient mechanisms line the walls', 'A riddle awaits'],
      rest: ['A safe haven', 'A peaceful sanctuary'],
      merchant: ['A traveling merchant has set up shop', 'Goods for sale'],
      shrine: ['A holy altar stands here', 'Divine energy fills the air']
    };

    const base = descriptions[room.type][this.random.nextInt(0, descriptions[room.type].length)];
    const features = room.features.length > 0 ? ` with ${room.features.join(', ')}` : '';
    return `${base} in the ${biomeName}${features}.`;
  }
}
