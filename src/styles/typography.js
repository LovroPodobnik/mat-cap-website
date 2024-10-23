import { css } from 'styled-components'

export const typography = css`
  :root {
    // Font sizes
    --font-size-xs: 0.75rem;
    --font-size-sm: 0.875rem;
    --font-size-md: 1rem;
    --font-size-lg: 1.125rem;
    --font-size-xl: 1.25rem;
    --font-size-2xl: 1.5rem;
    --font-size-3xl: 1.875rem;
    --font-size-4xl: 2.25rem;
    
    // Line heights
    --line-height-tight: 1.2;
    --line-height-base: 1.5;
    --line-height-relaxed: 1.75;
    
    // Letter spacing
    --letter-spacing-tight: -0.02em;
    --letter-spacing-base: -0.01em;
    --letter-spacing-wide: 0.02em;
    
    // Font families
    --font-family-heading: "Instrument Serif", serif;
    --font-family-body: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    
    // Colors
    --color-heading: rgba(255, 255, 255, 0.95);
    --color-text-muted: rgba(255, 255, 255, 0.75);
    --color-text-subtle: rgba(255, 255, 255, 0.6);
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
