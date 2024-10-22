import { css } from 'styled-components'

export const reset = css`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0 solid var(--color-border);
  }

  html, body {
    height: 100%;
  }

  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }

  input, button, textarea, select {
    font: inherit;
  }

  p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
  }

  #root {
    isolation: isolate;
  }
`