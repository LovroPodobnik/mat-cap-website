import { css } from 'styled-components';

export const breakpoints = {
  phone: '375px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1200px'
};

export const media = {
  phone: `@media (min-width: ${breakpoints.phone})`,
  tablet: `@media (min-width: ${breakpoints.tablet})`,
  desktop: `@media (min-width: ${breakpoints.desktop})`,
  wide: `@media (min-width: ${breakpoints.wide})`
};

export const glassMorphism = css`
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

export const textShadow = {
  sm: css`text-shadow: var(--shadow-sm);`,
  md: css`text-shadow: var(--shadow-md);`,
};

export const transition = css`
  transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
`; 