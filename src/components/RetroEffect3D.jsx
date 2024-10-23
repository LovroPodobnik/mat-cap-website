import React, { useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { RetroEffect } from './RetroEffect'

function RetroEffect3D() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('webglcontextlost', handleContextLost);
      canvas.addEventListener('webglcontextrestored', handleContextRestored);
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener('webglcontextlost', handleContextLost);
        canvas.removeEventListener('webglcontextrestored', handleContextRestored);
      }
    };
  }, []);

  const handleContextLost = (event) => {
    event.preventDefault();
    console.log('WebGL context lost. You should probably reload the page.');
  };

  const handleContextRestored = () => {
    console.log('WebGL context restored.');
  };

  return (
    <div 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: 9999, // Set a high z-index
        pointerEvents: 'none', // Allow interaction with elements behind
      }}
      onContextMenu={(e) => e.preventDefault()}
    >
      <Canvas ref={canvasRef}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <RetroEffect />
      </Canvas>
    </div>
  )
}

export default RetroEffect3D
