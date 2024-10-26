import React from 'react';
import styled, { css } from 'styled-components';

const baseStyles = css`
  box-sizing: border-box;
  font-feature-settings: "kern" 1, "liga" 1, "calt" 1;
  font-style: normal;
  letter-spacing: -0.02em;
  margin: 0;
  padding: 0;
  text-decoration: none;
  text-transform: none;
  overflow-wrap: break-word;
  word-break: break-word;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  text-align: ${props => props.align || 'start'};
`;

const headingStyles = css`
  ${baseStyles}
  color: var(--color-heading, rgba(255, 255, 255, 0.95));
  font-family: "Instrument Serif", serif;
  font-weight: 400;
  line-height: 1.2;
  letter-spacing: -0.03em;
`;

const paragraphStyles = css`
  ${baseStyles}
  color: var(--color-text-muted, rgba(255, 255, 255, 0.75));
  font-family: var(--font-family-body);
  font-weight: 400;
  line-height: 1.6;
  letter-spacing: -0.01em;
`;

export const H1 = styled.h1`
  font-size: var(--font-size-2xl);
  margin-bottom: 1rem;
  text-align: ${props => props.$align || 'left'};
  font-family: 'Instrument Serif', serif;
`;

export const H2 = styled.h2`
  ${headingStyles}
  font-size: var(--font-size-3xl);
  margin-bottom: 0.5em;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);
`;

export const H3 = styled.h3`
  ${headingStyles}
  font-size: var(--font-size-2xl);
  margin-bottom: 0.5em;
`;

export const H4 = styled.h4`
  ${headingStyles}
  font-size: var(--font-size-xl);
  margin-bottom: 0.5em;
`;

export const Paragraph = styled.p`
  ${paragraphStyles}
  font-size: var(--font-size-md);
  margin-bottom: 1em;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  
  @media (min-width: 768px) {
    font-size: calc(var(--font-size-md) * 1.05);
  }
`;

export const SmallText = styled.span`
  ${paragraphStyles}
  font-size: var(--font-size-sm);
`;

export const LargeText = styled.span`
  ${paragraphStyles}
  font-size: var(--font-size-lg);
`;
