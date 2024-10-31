import React from 'react';
import styled, { css } from 'styled-components';
import { media } from '../styles/mixins';
import { textShadow } from '../styles/mixins';

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
  color: var(--color-text-primary);
  font-family: var(--font-family-heading);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-tight);
  ${textShadow.md}
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
  margin-bottom: var(--spacing-md);
  text-align: ${props => props.$align || 'start'};
  letter-spacing: var(--letter-spacing-tight);
  
  // Add more spacing when it's the first child
  &:first-child {
    margin-top: var(--spacing-lg);
  }
  
  ${media.tablet} {
    font-size: var(--font-size-4xl);
    letter-spacing: -0.025em;
    
    &:first-child {
      margin-top: var(--spacing-xl);
    }
  }

  // Special styling for centered text
  ${props => props.$align === 'center' && css`
    margin-left: auto;
    margin-right: auto;
    max-width: 80%;
  `}

  // Special styling for hero sections
  ${props => props.$hero && css`
    font-size: var(--font-size-4xl);
    color: var(--color-primary);
    margin: 0;
    margin-bottom: var(--spacing-sm);
    letter-spacing: -0.03em;
    text-align: center;

    ${media.tablet} {
      font-size: calc(var(--font-size-4xl) * 1.2);
    }
  `}
`;

export const H2 = styled.h2`
  ${headingStyles}
  font-size: var(--font-size-2xl);
  margin-bottom: 0.5em;
  letter-spacing: var(--letter-spacing-tight);
  
  ${media.tablet} {
    font-size: var(--font-size-3xl);
  }
`;

export const H3 = styled.h3`
  ${headingStyles}
  font-size: var(--font-size-xl);
  margin-bottom: 0.5em;
  
  ${media.tablet} {
    font-size: var(--font-size-2xl);
  }
`;

export const H4 = styled.h4`
  ${headingStyles}
  font-size: var(--font-size-lg);
  margin-bottom: 0.5em;
  
  ${media.tablet} {
    font-size: var(--font-size-xl);
  }
`;

export const Paragraph = styled.p`
  ${paragraphStyles}
  font-size: var(--font-size-sm);
  line-height: var(--line-height-base);
  margin-bottom: ${props => props.$noMargin ? '0' : '1em'};
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  max-width: 65ch;
  
  ${props => props.$large && css`
    font-size: var(--font-size-sm);
    font-weight: 500;
  `}
  
  ${props => props.$small && css`
    font-size: var(--font-size-xs);
    line-height: var(--line-height-relaxed);
  `}
`;

export const SmallText = styled.span`
  ${paragraphStyles}
  font-size: var(--font-size-xs);
`;

export const LargeText = styled.span`
  ${paragraphStyles}
  font-size: var(--font-size-sm);
  font-weight: 500;
`;
