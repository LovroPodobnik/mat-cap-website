import { css } from 'styled-components';
import { motion } from 'framer-motion';

// Animation mixins
export const buttonAnimations = css`
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

// Base button styles
export const buttonBase = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  font-size: var(--font-size-sm);
  font-weight: 500;
  cursor: pointer;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  border-radius: 8px;
  ${buttonAnimations}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
`;

// Button variants
export const buttonVariants = {
  primary: css`
    background: var(--color-primary);
    color: var(--color-background);
    border: 1px solid transparent;

    &:hover {
      background: var(--color-secondary);
    }
  `,
  outline: css`
    background: transparent;
    color: var(--color-primary);
    border: 1px solid var(--color-primary);

    &:hover {
      background: rgba(255, 215, 0, 0.1);
    }
  `
};

// Button sizes
export const buttonSizes = {
  small: css`
    padding: 0.5rem 1rem;
    font-size: calc(var(--font-size-sm) * 0.9);
  `,
  medium: css`
    padding: 0.75rem 1.5rem;
    font-size: var(--font-size-sm);
  `,
  large: css`
    padding: 1rem 2rem;
    font-size: calc(var(--font-size-sm) * 1.1);
  `
};