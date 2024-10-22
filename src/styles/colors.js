import { css } from 'styled-components'

export const colors = css`
  :root {
    --color-background: #000000;
    --color-text: rgba(255, 255, 255, 0.87);
    --color-text-muted: rgba(255, 255, 255, 0.6);
    --color-heading: #FFFFFF;
    --color-primary: #ffd700;
    --color-secondary: #c0c0c0;
    --color-border: rgb(229, 231, 235);
    --color-accent: #FF4500;
    --color-success: #4CAF50;
    --color-warning: #FFA500;
    --color-error: #FF0000;
  }

  body {
    color: var(--color-text);
    background-color: var(--color-background);
  }

  h1, h2, h3, h4, h5, h6 {
    color: var(--color-heading);
  }
`