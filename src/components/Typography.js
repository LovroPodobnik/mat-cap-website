import styled from 'styled-components';

export const H1 = styled.h1`
  font-family: var(--font-family-heading);
  font-size: var(--font-size-2xl);
  font-weight: 500;
  margin: 0;
  text-align: ${props => props.$align || 'left'};
  letter-spacing: var(--letter-spacing-tight);
  line-height: var(--line-height-tight);
`;

export const H2 = styled.h2`
  font-family: var(--font-family-heading);
  font-size: var(--font-size-xl);
  font-weight: 500;
  margin: 0;
  text-align: ${props => props.$align || 'left'};
  letter-spacing: var(--letter-spacing-tight);
  line-height: var(--line-height-tight);
`;

export const H3 = styled.h3`
  font-family: var(--font-family-heading);
  font-size: var(--font-size-lg);
  font-weight: 500;
  margin: 0;
  text-align: ${props => props.$align || 'left'};
  letter-spacing: var(--letter-spacing-base);
  line-height: var(--line-height-tight);
`;

export const Paragraph = styled.p`
  font-family: var(--font-family-body);
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
  margin: 0;
  text-align: ${props => props.$align || 'left'};
  letter-spacing: var(--letter-spacing-base);
`;

export const SmallText = styled.span`
  font-family: var(--font-family-body);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-base);
  text-align: ${props => props.$align || 'left'};
  letter-spacing: var(--letter-spacing-base);
`; 