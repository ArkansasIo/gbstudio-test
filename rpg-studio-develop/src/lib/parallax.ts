// parallax.ts
// 2D Parallax Mapping Utilities for Game Boy/RPG/8-bit style games

import { Vec2 } from "./math2d8bit";

export interface ParallaxLayer {
  image: string; // asset key or path
  speed: number; // 0 = static, 1 = full speed (same as camera)
  offset: Vec2;  // current offset
}

export function createParallaxLayer(image: string, speed: number): ParallaxLayer {
  return { image, speed, offset: { x: 0, y: 0 } };
}

export function updateParallaxLayers(layers: ParallaxLayer[], camera: Vec2): ParallaxLayer[] {
  // Update each layer's offset based on camera position and speed
  return layers.map(layer => ({
    ...layer,
    offset: {
      x: Math.floor(camera.x * layer.speed),
      y: Math.floor(camera.y * layer.speed)
    }
  }));
}

// Example: get draw position for a layer's tile/sprite
export function getParallaxDrawPos(layer: ParallaxLayer, screen: Vec2): Vec2 {
  return {
    x: screen.x - layer.offset.x,
    y: screen.y - layer.offset.y
  };
}

// Example usage (pseudo-code):
// const layers = [
//   createParallaxLayer('sky.png', 0),
//   createParallaxLayer('mountains.png', 0.2),
//   createParallaxLayer('trees.png', 0.5),
//   createParallaxLayer('ground.png', 1)
// ];
// const camera = { x: player.x, y: player.y };
// const updatedLayers = updateParallaxLayers(layers, camera);
// For each layer, draw at getParallaxDrawPos(layer, {x:0, y:0})
