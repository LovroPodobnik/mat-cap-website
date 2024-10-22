import { Vector2 } from 'three';

export const RetroShader = {
  uniforms: {
    tDiffuse: { value: null },
    resolution: { value: new Vector2() },
    pixelSize: { value: 4 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform vec2 resolution;
    uniform float pixelSize;
    varying vec2 vUv;

    void main() {
      vec2 dxy = pixelSize / resolution;
      vec2 coord = dxy * floor(vUv / dxy);
      vec4 color = texture2D(tDiffuse, coord);
      
      // Add a simple color quantization effect
      color = floor(color * 5.0) / 5.0;
      
      gl_FragColor = color;
    }
  `
};
