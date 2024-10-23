import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useDrag } from '@use-gesture/react';
import { X } from 'react-feather';

const Canvas = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.95);
  cursor: grab;
  z-index: 9999; // Increased to be above everything
  touch-action: none;
  pointer-events: auto !important;
  
  &:active {
    cursor: grabbing;
  }
`;

const CloseButton = styled(motion.button)`
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 10000; // One level above Canvas
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  pointer-events: auto;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: rotate(90deg);
  }
`;

const DraggableImage = styled(motion.div)`
  position: absolute;
  user-select: none;
  transform-origin: center;
  cursor: grab;
  touch-action: none;
  pointer-events: auto !important;
  z-index: 9999; // Same as Canvas
  
  &:active {
    cursor: grabbing;
    z-index: 10000; // Same as CloseButton when dragging
  }
  
  img {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
    pointer-events: none;
    will-change: transform;
    transition: all 0.3s ease;
  }

  &:hover img {
    border-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
  }
`;

const generateRandomPosition = () => {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const radius = Math.min(window.innerWidth, window.innerHeight) * 0.3;
  const angle = Math.random() * Math.PI * 2;
  
  return {
    x: centerX + Math.cos(angle) * radius - 100,
    y: centerY + Math.sin(angle) * radius - 100,
    rotate: Math.random() * 30 - 15,
    scale: 0.8 + Math.random() * 0.4
  };
};

const ExperimentalGallery = ({ images, onClose, setHideHeader }) => {
  const [positions, setPositions] = useState({});
  const [draggedIndex, setDraggedIndex] = useState(null);

  useEffect(() => {
    // Hide header when component mounts
    setHideHeader(true);
    
    const initialPositions = {};
    images.forEach((_, index) => {
      initialPositions[index] = generateRandomPosition();
    });
    setPositions(initialPositions);

    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setHideHeader(false); // Show header when closing with ESC
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    
    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleEsc);
      setHideHeader(false); // Show header when component unmounts
    };
  }, [images, onClose, setHideHeader]);

  const bindDrag = (index) => {
    const bind = useDrag(
      ({ active, movement: [mx, my], velocity: [vx, vy], first, last }) => {
        if (first) setDraggedIndex(index);
        
        if (last) {
          setDraggedIndex(null);
          if (Math.abs(vx) > 0.1 || Math.abs(vy) > 0.1) {
            const throwMultiplier = 0.5;
            setPositions(prev => {
              const newX = prev[index].x + (vx * throwMultiplier);
              const newY = prev[index].y + (vy * throwMultiplier);
              
              const padding = 50;
              const boundedX = Math.max(-padding, Math.min(window.innerWidth - 200 + padding, newX));
              const boundedY = Math.max(-padding, Math.min(window.innerHeight - 200 + padding, newY));
              
              return {
                ...prev,
                [index]: {
                  ...prev[index],
                  x: boundedX,
                  y: boundedY,
                  rotate: prev[index].rotate + (vx * 0.05)
                }
              };
            });
            return;
          }
        }

        setPositions(prev => {
          const newX = prev[index].x + mx * 0.15;
          const newY = prev[index].y + my * 0.15;
          
          const padding = 50;
          const boundedX = Math.max(-padding, Math.min(window.innerWidth - 200 + padding, newX));
          const boundedY = Math.max(-padding, Math.min(window.innerHeight - 200 + padding, newY));
          
          return {
            ...prev,
            [index]: {
              ...prev[index],
              x: boundedX,
              y: boundedY,
              rotate: active ? mx * 0.01 : prev[index].rotate,
              scale: active ? 1.01 : 1
            }
          };
        });
      },
      {
        from: () => [positions[index]?.x || 0, positions[index]?.y || 0],
        bounds: {
          left: -50,
          right: window.innerWidth - 150,
          top: -50,
          bottom: window.innerHeight - 150
        },
        rubberband: 0.15,
        filterTaps: true,
        pointer: { touch: true },
        preventDefault: true,
        delay: 0,
        threshold: 0,
        swipe: {
          distance: 0,
          velocity: 0
        }
      }
    );

    return bind();
  };

  return (
    <AnimatePresence>
      <Canvas
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <CloseButton 
          onClick={() => {
            setHideHeader(false); // Show header when closing
            onClose();
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X size={24} />
        </CloseButton>
        
        {images.map((image, index) => {
          console.log('Rendering image:', index, 'Position:', positions[index]);
          return (
            <DraggableImage
              key={index}
              style={{
                x: positions[index]?.x || 0,
                y: positions[index]?.y || 0,
                rotate: positions[index]?.rotate || 0,
                scale: positions[index]?.scale || 1,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 1, 
                scale: positions[index]?.scale || 1,
                transition: { 
                  duration: 0.5,
                  delay: index * 0.1
                }
              }}
              {...bindDrag(index)}
            >
              <motion.img
                src={image.src}
                alt={image.alt}
                draggable="false"
                layoutId={`experimental-${index}`}
              />
            </DraggableImage>
          );
        })}
      </Canvas>
    </AnimatePresence>
  );
};

export default ExperimentalGallery;
