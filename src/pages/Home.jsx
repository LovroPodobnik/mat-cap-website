import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import Hero from '../components/Hero';
import { pageTransition } from '../styles/GlobalStyles';

const HomeContainer = styled(motion.div)`
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-sizing: border-box;
  padding: 0 1rem;
`;

const Home = () => {
  React.useEffect(() => {
    const setVH = () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVH();
    window.addEventListener('resize', setVH);

    return () => window.removeEventListener('resize', setVH);
  }, []);

  return (
    <HomeContainer {...pageTransition}>
      <Hero removeBackground={true} />
    </HomeContainer>
  );
};

export default Home;
