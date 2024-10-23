import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useDrag } from '@use-gesture/react';

const Canvas = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #111;
  overflow: hidden;
  cursor: grab;
  
  &:active {
    cursor: grabbing;
  }
`;

const DraggableImage = styled(motion.div)`
  position: absolute;
  user-select: none;
  transform-origin: center;
  
  img {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
    pointer-events: none;
  }
`;

const generateRandomPosition = () => ({
  x: Math.random() * window.innerWidth - 100,
  y: Math.random() * window.innerHeight - 100,
  rotate: Math.random() * 30 - 15,
});

const Experimental = () => {
  const [images] = useState([
    { id: 1, src: 'https://picsum.photos/800/800?random=1' },
    { id: 2, src: 'https://picsum.photos/800/800?random=2' },
    { id: 3, src: 'https://picsum.photos/800/800?random=3' },
    { id: 4, src: 'https://picsum.photos/800/800?random=4' },
    { id: 5, src: 'https://picsum.photos/800/800?random=5' },
  ]);

  const [positions, setPositions] = useState(
    images.reduce((acc, img) => ({
      ...acc,
      [img.id]: generateRandomPosition()
    }), {})
  );

  const controls = useAnimation();
  const [isDragging, setIsDragging] = useState(false);

  const bindDrag = (id) => useDrag(({ active, movement: [x, y], velocity }) => {
    setIsDragging(active);
    
    setPositions(prev => ({
      ...prev,
      [id]: {
        x: prev[id].x + x,
        y: prev[id].y + y,
        rotate: active ? x * 0.1 : prev[id].rotate // Add rotation while dragging
      }
    }));

    // Add physics when releasing
    if (!active && velocity > 0.1) {
      controls.start({
        x: positions[id].x + velocity * x * 2,
        y: positions[id].y + velocity * y * 2,
        rotate: positions[id].rotate + velocity * x * 0.5,
        transition: {
          type: "spring",
          damping: 10,
          stiffness: 100,
          mass: 0.5
        }
      });
    }
  }, {
    from: () => [positions[id].x, positions[id].y],
    bounds: { left: -500, right: window.innerWidth, top: -500, bottom: window.innerHeight },
    rubberband: true
  });

  const imageVariants = {
    initial: (i) => ({
      opacity: 0,
      scale: 0.5,
      rotate: positions[i].rotate,
      transition: {
        duration: 0.5,
        delay: i * 0.1
      }
    }),
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    },
    hover: {
      scale: 1.05,
      rotate: 0,
      zIndex: 10,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    drag: {
      scale: 1.1,
      zIndex: 20,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <Canvas>
      <AnimatePresence>
        {images.map((image) => (
          <DraggableImage
            key={image.id}
            custom={image.id}
            variants={imageVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileDrag="drag"
            drag
            dragElastic={0.1}
            dragMomentum={true}
            dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
            {...bindDrag(image.id)}
            style={{
              x: positions[image.id].x,
              y: positions[image.id].y,
              rotate: positions[image.id].rotate,
              zIndex: isDragging ? 50 : 1
            }}
          >
            <motion.img
              src={image.src}
              alt={`Draggable ${image.id}`}
              draggable="false"
              layoutId={`image-${image.id}`}
            />
          </DraggableImage>
        ))}
      </AnimatePresence>
    </Canvas>
  );
};

export default Experimental;
