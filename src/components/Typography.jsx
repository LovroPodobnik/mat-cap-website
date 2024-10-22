import React from 'react';
import styled, { css } from 'styled-components';

const baseStyles = css`
  box-sizing: border-box;
  font-feature-settings: normal;
  font-style: normal;
  letter-spacing: 0.14px;
  margin: 0;
  padding: 0;
  text-decoration: none;
  text-transform: none;
  overflow-wrap: break-word;
  word-break: break-word;
  -webkit-font-smoothing: antialiased;
  text-align: ${props => props.align || 'start'};
`;

const headingStyles = css`
  ${baseStyles}
  color: var(--color-heading);
  font-weight: 700;
  line-height: 1.2;
`;

const paragraphStyles = css`
  ${baseStyles}
  color: var(--color-text-muted);
  font-weight: 400;
  line-height: 1.5;
`;

export const H1 = styled.h1`
  ${headingStyles}
  font-size: var(--font-size-4xl);
  margin-bottom: 0.5em;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

export const H2 = styled.h2`
  ${headingStyles}
  font-size: var(--font-size-3xl);
  margin-bottom: 0.5em;
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
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

export const SmallText = styled.span`
  ${paragraphStyles}
  font-size: var(--font-size-sm);
`;

export const LargeText = styled.span`
  ${paragraphStyles}
  font-size: var(--font-size-lg);
`;
