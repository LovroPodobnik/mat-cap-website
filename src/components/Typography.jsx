import React from 'react';
import styled, { css } from 'styled-components';

const baseStyles = css`
  box-sizing: border-box;
  font-feature-settings: "kern" 1, "liga" 1, "calt" 1;
  font-style: normal;
  letter-spacing: var(--letter-spacing-tight);
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
  font-weight: 400;
  line-height: var(--line-height-tight);
`;

const paragraphStyles = css`
  ${baseStyles}
  color: var(--color-text-muted);
  font-family: var(--font-family-body);
  font-weight: 400;
  line-height: var(--line-height-base);
  letter-spacing: var(--letter-spacing-base);
`;

export const H1 = styled.h1`
  ${headingStyles}
  font-size: var(--font-size-3xl);
  margin-bottom: 0.5em;
  
  @media (max-width: 768px) {
    font-size: var(--font-size-2xl);
  }
`;

export const H2 = styled.h2`
  ${headingStyles}
  font-size: var(--font-size-2xl);
  margin-bottom: 0.5em;
  
  @media (max-width: 768px) {
    font-size: var(--font-size-xl);
  }
`;

export const H3 = styled.h3`
  ${headingStyles}
  font-size: var(--font-size-xl);
  margin-bottom: 0.5em;
`;

export const H4 = styled.h4`
  ${headingStyles}
  font-size: var(--font-size-lg);
  margin-bottom: 0.5em;
`;

export const Paragraph = styled.p`
  ${paragraphStyles}
  font-size: var(--font-size-sm);
  line-height: var(--line-height-base);
  margin-bottom: ${props => props.$noMargin ? '0' : '1em'};
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  
  ${props => props.$large && css`
    font-size: var(--font-size-md);
    line-height: var(--line-height-base);
  `}
  
  ${props => props.$small && css`
    font-size: var(--font-size-xs);
    line-height: var(--line-height-relaxed);
  `}

  @media (max-width: 374px) {
    font-size: calc(var(--font-size-sm) * 0.95);
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
