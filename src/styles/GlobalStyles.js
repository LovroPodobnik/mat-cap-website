import { createGlobalStyle } from 'styled-components';
import { typography } from './typography';
import { tokens } from './tokens';
import { layout } from './layout';
import { reset } from './reset';
import { animations } from './animations';

const GlobalStyles = createGlobalStyle`
  ${reset}
  ${tokens}
  ${typography}
  ${layout}
  ${animations}

  html, body {
    min-height: 100%;
    height: auto;
    background-color: var(--color-background);
  }

  body {
    display: flex;
    flex-direction: column;
    color: var(--color-text-primary);
  }

  #root {
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: transparent; // Ensure this is transparent
  }

  /* Layout rules */
  .container {
    width: 100%;
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 0 1rem;
    background-color: transparent; // Ensure this is transparent
  }

  /* Ensure content is centered on larger screens - but not for admin */
  @media (min-width: calc(var(--max-width) + 2rem)) {
    body:not(.admin-layout) #root {
      align-items: center;
    }

    body:not(.admin-layout) .container {
      padding: 0;
    }
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

  // Add styles to hide bottom navigation
  body.hide-bottom-nav {
    .bottom-nav {
      display: none !important;
    }
  }

  /* Admin layout overrides */
  body.admin-layout {
    #root {
      max-width: none !important;
      padding: 0 !important;
      text-align: left !important;
      align-items: stretch !important; /* Change from flex-start to stretch */
      width: 100% !important;
    }

    .container {
      max-width: none !important;
      padding: 0 !important;
      width: 100% !important;
    }

    main {
      width: 100% !important;
      max-width: none !important;
    }
  }

  /* Remove the centering styles for admin pages */
  body.admin-layout #root {
    align-items: stretch;
    max-width: none;
    padding: 0;
    width: 100%;
  }

  body.admin-layout .container {
    max-width: none;
    padding: 0;
    width: 100%;
  }

  /* Carousel dot customization */
  .custom-dots {
    display: flex !important;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    margin: 0;
    padding: 0;
    list-style: none;
    
    li {
      display: flex;
      align-items: center;
      justify-content: center;
      
      button {
        width: var(--carousel-dot-size);
        height: var(--carousel-dot-size);
        padding: 0;
        border: none;
        border-radius: 50%;
        background: var(--carousel-dot-color);
        border: 1px solid var(--carousel-dot-border);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        cursor: pointer;
        
        &:before {
          display: none;
        }
      }
      
      &.slick-active button {
        width: var(--carousel-dot-size-active);
        height: var(--carousel-dot-size-active);
        background: var(--carousel-dot-color-active);
        border-color: var(--carousel-dot-color-active);
      }
    }
  }
`

export default GlobalStyles

export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 }
}
