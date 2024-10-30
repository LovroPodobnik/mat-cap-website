import { css } from 'styled-components'

export const typography = css`
  :root {
    /* Base Size - 14px for paragraphs */
    --font-size-base: 0.875rem;  /* 14px */

    /* Type Scale Using Custom Ratio */
    --font-size-xs: calc(var(--font-size-base) * 0.857);    /* 12px */
    --font-size-sm: var(--font-size-base);                  /* 14px */
    --font-size-md: calc(var(--font-size-base) * 1.143);    /* 16px */
    --font-size-lg: calc(var(--font-size-base) * 1.286);    /* 18px */
    --font-size-xl: calc(var(--font-size-base) * 1.429);    /* 20px */
    --font-size-2xl: calc(var(--font-size-base) * 1.714);   /* 24px */
    --font-size-3xl: calc(var(--font-size-base) * 2.143);   /* 30px */
    --font-size-4xl: calc(var(--font-size-base) * 2.571);   /* 36px */
    
    /* Line Heights - Adjusted for 14px base */
    --line-height-tight: 1.2;      /* Headings */
    --line-height-base: 1.6;       /* Better readability for smaller text */
    --line-height-relaxed: 1.75;   /* Relaxed reading */
    
    /* Letter Spacing - Adjusted for 14px */
    --letter-spacing-tight: -0.015em;
    --letter-spacing-base: -0.01em;
    --letter-spacing-wide: 0.015em;
    
    /* Font Families - Unchanged */
    --font-family-heading: "Instrument Serif", serif;
    --font-family-body: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    
    /* Colors - Unchanged */
    --color-heading: rgba(255, 255, 255, 0.95);
    --color-text-muted: rgba(255, 255, 255, 0.75);
    --color-text-subtle: rgba(255, 255, 255, 0.6);

    /* Mobile-First Responsive Type Scales */
    @media (min-width: 375px) {
      --font-size-base: 0.9375rem;  /* 15px for larger phones */
    }

    @media (min-width: 768px) {
      --font-size-base: 1rem;       /* 16px for tablets */
    }
  }

  body {
    font-family: var(--font-family-body);
    font-size: var(--font-size-sm); /* Use sm size for base paragraph text */
    line-height: var(--line-height-base);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    font-feature-settings: "kern" 1, "liga" 1, "calt" 1;
  }
`
