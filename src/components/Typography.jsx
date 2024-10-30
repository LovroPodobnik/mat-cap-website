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
  text-align: ${props => props.$align || 'start'};
`;

const headingStyles = css`
  ${baseStyles}
  color: var(--color-heading);
  font-family: var(--font-family-heading);
  font-weight: var(--font-weight-normal);
  line-height: var(--line-height-xs);
  letter-spacing: var(--letter-spacing-tight);
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
  ${headingStyles}
  font-size: var(--font-size-4xl);
  margin-bottom: 1em;
  
  @media (max-width: 768px) {
    font-size: var(--font-size-3xl);
  }
`;

export const H2 = styled.h2`
  ${headingStyles}
  font-size: var(--font-size-3xl);
  margin-bottom: 0.8em;
  
  @media (max-width: 768px) {
    font-size: var(--font-size-2xl);
  }
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
  line-height: var(--line-height-md);
  margin-bottom: ${props => props.$noMargin ? '0' : '1.5em'};
  
  ${props => props.$large && css`
    font-size: var(--font-size-lg);
    line-height: var(--line-height-lg);
  `}
  
  ${props => props.$small && css`
    font-size: var(--font-size-sm);
    line-height: var(--line-height-md);
  `}
`;

export const SmallText = styled.span`
  ${paragraphStyles}
  font-size: var(--font-size-sm);
`;

export const LargeText = styled.span`
  ${paragraphStyles}
  font-size: var(--font-size-lg);
`;
