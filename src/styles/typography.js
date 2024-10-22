import { css } from 'styled-components'

export const typography = css`
  :root {
    --font-size-xs: 0.75rem;
    --font-size-sm: 0.875rem;
    --font-size-md: 1rem;
    --font-size-lg: 1.125rem;
    --font-size-xl: 1.25rem;
    --font-size-2xl: 1.5rem;
    --font-size-3xl: 1.875rem;
    --font-size-4xl: 2.25rem;
    
    --line-height-tight: 1.2;
    --line-height-base: 1.5;
    --line-height-relaxed: 1.75;
    
    --letter-spacing-tight: -0.01em;
    --letter-spacing-base: 0.02em;
    --letter-spacing-wide: 0.05em;
  }

  html, body {
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    font-size: 16px;
    line-height: var(--line-height-base);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    line-height: var(--line-height-tight);
    margin-bottom: 1rem;
  }

  h1 {
    font-size: var(--font-size-4xl);
  }

  h2 {
    font-size: var(--font-size-3xl);
  }

  h3 {
    font-size: var(--font-size-2xl);
  }

  h4 {
    font-size: var(--font-size-xl);
  }

  h5 {
    font-size: var(--font-size-lg);
  }

  h6 {
    font-size: var(--font-size-md);
  }
`