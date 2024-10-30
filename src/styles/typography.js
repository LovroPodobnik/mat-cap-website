import { css } from 'styled-components'

export const typography = css`
  :root {
    /* Base Size - 16px */
    --font-size-base: 1rem;

    /* Type Scale Using Modern Ratio (1.250 - Major Third) */
    --font-size-xs: calc(var(--font-size-base) * 0.64);      /* 10.24px */
    --font-size-sm: calc(var(--font-size-base) * 0.8);       /* 12.80px */
    --font-size-md: var(--font-size-base);                   /* 16.00px */
    --font-size-lg: calc(var(--font-size-base) * 1.25);      /* 20.00px */
    --font-size-xl: calc(var(--font-size-base) * 1.563);     /* 25.00px */
    --font-size-2xl: calc(var(--font-size-base) * 1.953);    /* 31.25px */
    --font-size-3xl: calc(var(--font-size-base) * 2.441);    /* 39.06px */
    --font-size-4xl: calc(var(--font-size-base) * 3.052);    /* 48.83px */
    
    /* Line Heights Mapped to Font Sizes */
    --line-height-xs: 1.1;    /* Headings */
    --line-height-sm: 1.2;    /* Subheadings */
    --line-height-md: 1.5;    /* Body text */
    --line-height-lg: 1.7;    /* Large body text */
    
    /* Letter Spacing */
    --letter-spacing-tight: -0.05em;
    --letter-spacing-normal: 0;
    --letter-spacing-wide: 0.05em;
    
    /* Font Weights */
    --font-weight-normal: 400;
    --font-weight-medium: 500;
    --font-weight-bold: 700;

    /* Responsive Type Scales */
    @media (min-width: 768px) {
      --font-size-base: 1.125rem; /* 18px base for larger screens */
    }

    @media (min-width: 1024px) {
      --font-size-base: 1.25rem;  /* 20px base for desktop */
    }
  }

  body {
    font-family: var(--font-family-body);
    font-size: var(--font-size-md);
    line-height: var(--line-height-base);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    font-feature-settings: "kern" 1, "liga" 1, "calt" 1;
  }

  @media (min-width: 768px) {
    body {
      font-size: calc(var(--font-size-md) * 1.05);
    }
  }
`
