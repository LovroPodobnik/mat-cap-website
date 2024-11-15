import styled from 'styled-components';
import { fadeIn, slideIn } from './AnimationStyles';
import { glassMorphism, textShadow, media } from './mixins';

export const HeroContainer = styled.div`
  color: var(--color-text-primary);
  padding: var(--spacing-xl) 0;
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
  ${glassMorphism}
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
`;

export const HeroTitle = styled.h1`
  font-family: var(--font-family-heading);
  font-size: var(--font-size-4xl);
  color: var(--color-primary);
  margin-bottom: var(--spacing-sm);
  letter-spacing: 0.02em;
  font-weight: var(--font-weight-regular);
  ${textShadow.md}

  ${media.tablet} {
    font-size: var(--font-size-3xl);
  }
`;

export const HeroSubtitle = styled.h2`
  font-family: var(--font-family-heading);
  font-size: var(--font-size-xl);
  margin-bottom: 1.5rem;
  color: var(--color-secondary);
  letter-spacing: 0.02em;
  font-weight: 400;
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
