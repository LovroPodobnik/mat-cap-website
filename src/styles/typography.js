import { css } from 'styled-components'

export const typography = css`
  :root {
    /* Base Size - 14px for paragraphs */
    --font-size-base: 0.875rem;  /* 14px */

    /* Type Scale Using a 1.25 ratio for better hierarchy */
    --font-size-xs: calc(var(--font-size-base) * 0.857);    /* 12px */
    --font-size-sm: var(--font-size-base);                  /* 14px */
    --font-size-md: calc(var(--font-size-base) * 1.25);     /* 17.5px */
    --font-size-lg: calc(var(--font-size-base) * 1.563);    /* 21.875px */
    --font-size-xl: calc(var(--font-size-base) * 1.953);    /* 27.344px */
    --font-size-2xl: calc(var(--font-size-base) * 2.441);   /* 34.18px */
    --font-size-3xl: calc(var(--font-size-base) * 3.052);   /* 42.725px */
    --font-size-4xl: calc(var(--font-size-base) * 3.815);   /* 53.406px */
    
    /* Line Heights - Adjusted for new scale */
    --line-height-tight: 1.1;      /* Headings */
    --line-height-base: 1.6;       /* Better readability for smaller text */
    --line-height-relaxed: 1.75;   /* Relaxed reading */
    
    /* Letter Spacing - Adjusted for new scale */
    --letter-spacing-tight: -0.02em;
    --letter-spacing-base: -0.01em;
    --letter-spacing-wide: 0.02em;
    
    /* Font Families - Unchanged */
    --font-family-heading: "Instrument Serif", serif;
    --font-family-body: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    
    /* Font Weights */
    --font-weight-regular: 400;
    --font-weight-medium: 500;
    --font-weight-bold: 700;
    
    /* Colors - Unchanged */
    --color-heading: rgba(255, 255, 255, 0.95);
    --color-text-muted: rgba(255, 255, 255, 0.75);
    --color-text-subtle: rgba(255, 255, 255, 0.6);

    /* Keep base size consistent across breakpoints */
    @media (min-width: 375px) {
      --font-size-base: 0.875rem;
    }

    @media (min-width: 768px) {
      --font-size-base: 0.875rem;
    }
  }

  body {
    font-family: var(--font-family-body);
    font-size: var(--font-size-sm);
    line-height: var(--line-height-base);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    font-feature-settings: "kern" 1, "liga" 1, "calt" 1;
  }
`
