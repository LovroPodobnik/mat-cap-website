import { keyframes, css } from 'styled-components';

const fadeInKeyframes = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideInKeyframes = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const springKeyframes = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

export const animations = css`
  .fadeIn {
    animation: ${fadeInKeyframes} 0.5s ease-out;
  }

  .slideIn {
    animation: ${slideInKeyframes} 0.5s ease-out;
  }

  .springAnimation {
    transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
  }

  .hoverScale {
    transition: transform 0.3s ease;
    &:hover {
      transform: scale(1.05);
    }
  }

  .staggerChildren {
    & > * {
      opacity: 0;
      animation: ${fadeInKeyframes} 0.5s ease-out forwards;
    }
    ${Array(10).fill().map((_, i) => css`
      & > *:nth-child(${i + 1}) {
        animation-delay: ${i * 0.1}s;
      }
    `)}
  }
`;

// Export individual animations for component use
export const fadeIn = css`
  animation: ${fadeInKeyframes} 0.5s ease-out;
`;

export const slideIn = css`
  animation: ${slideInKeyframes} 0.5s ease-out;
`;

export const spring = css`
  animation: ${springKeyframes} 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
`;

// Animation mixins
export const animationMixins = {
  fadeIn: css`animation: ${fadeInKeyframes}`,
  slideIn: css`animation: ${slideInKeyframes}`,
  spring: css`animation: ${springKeyframes}`,
  transition: css`transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)`,
  hoverScale: css`
    transition: transform 0.3s ease;
    &:hover {
      transform: scale(1.05);
    }
  `
}; 