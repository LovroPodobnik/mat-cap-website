import { createGlobalStyle, css, keyframes } from 'styled-components'
import { typography } from './typography'
import { colors } from './colors'
import { layout } from './layout'
import { reset } from './reset'

const fadeInKeyframes = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const slideInKeyframes = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`

const animations = css`
  .fadeIn {
    animation: ${fadeInKeyframes} 0.5s ease-out;
  }

  .slideIn {
    animation: ${slideInKeyframes} 0.5s ease-out;
  }

  .springAnimation {
    transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
  }

  .hoverScale {
    transition: transform 0.3s ease;
    &:hover {
      transform: scale(1.05);
    }
  }

  .staggerChildren {
    & > * {
      opacity: 0;
      animation: ${fadeInKeyframes} 0.5s ease-out forwards;
    }
    ${Array(10).fill().map((_, i) => css`
      & > *:nth-child(${i + 1}) {
        animation-delay: ${i * 0.1}s;
      }
    `)}
  }
`

const GlobalStyles = createGlobalStyle`
  /* CSS Reset */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  ${reset}
  ${typography}
  ${colors}
  ${layout}
  ${animations}

  html, body, #root {
    min-height: 100%;
    height: auto;
    background-color: #000000;
  }

  body {
    display: flex;
    flex-direction: column;
    color: var(--color-text);
  }

  #root {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: var(--color-background);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--color-primary);
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--color-secondary);
  }
`

export default GlobalStyles

export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 }
}
