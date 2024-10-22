import styled from 'styled-components';
import { fadeIn, slideIn } from './AnimationStyles';

export const HeroContainer = styled.div`
  color: var(--color-text);
  padding: 4rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 120px);
  ${fadeIn}
`;

export const HeroContent = styled.div`
  width: 100%;
  max-width: 600px;
  text-align: center;
  ${slideIn}
  background-color: rgba(0, 0, 0, 0.7);
  padding: 2rem;
  border-radius: 8px;
  backdrop-filter: blur(10px);
`;

export const HeroTitle = styled.h1`
  font-size: var(--font-size-4xl);
  color: var(--color-primary);
  margin-bottom: 1rem;
  letter-spacing: 0.02em;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

export const HeroSubtitle = styled.h2`
  font-size: var(--font-size-xl);
  margin-bottom: 1.5rem;
  color: var(--color-secondary);
  letter-spacing: 0.02em;
  font-weight: 500;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

export const HeroText = styled.p`
  font-size: var(--font-size-md);
  margin: 0 auto 2rem;
  line-height: 1.6;
  letter-spacing: 0.01em;
  max-width: 100%;
  color: var(--color-text);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;