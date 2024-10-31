import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const OverlayCanvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: overlay;
`;

const RetroEffect = ({ isEnabled = true }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!isEnabled || document.body.classList.contains('disable-retro-effect')) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const applyRetroEffect = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create a scanline effect
      for (let y = 0; y < canvas.height; y += 4) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fillRect(0, y, canvas.width, 2);
      }

      // Add some noise
      for (let i = 0; i < 5000; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const color = Math.random() > 0.5 ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)';
        ctx.fillStyle = color;
        ctx.fillRect(x, y, 1, 1);
      }

      // Add a vignette effect
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width / 2
      );
      gradient.addColorStop(0, 'rgba(0,0,0,0)');
      gradient.addColorStop(1, 'rgba(0,0,0,0.3)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const render = () => {
      applyRetroEffect();
      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isEnabled]);

  if (!isEnabled) return null;

  return <OverlayCanvas ref={canvasRef} />;
};

export default RetroEffect;
