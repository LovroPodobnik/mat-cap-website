import { css } from 'styled-components'
import { media } from './mixins'

export const layout = css`
  :root {
    /* Base mobile values */
    --max-width: 100%;
    --content-padding: var(--spacing-sm);
    --header-height: 60px;
    
    /* Progressive enhancement */
    ${media.tablet} {
      --max-width: 460px;
      --content-padding: var(--spacing-md);
      --header-height: 80px;
    }
    
    /* Add viewport height variables */
    --vh: 1vh;
    --dvh: 1dvh;
    
    /* Add safe area insets */
    --safe-area-inset-top: env(safe-area-inset-top, 0px);
    --safe-area-inset-bottom: env(safe-area-inset-bottom, 0px);
  }

  /* Common layout utilities */
  .container {
    width: 100%;
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 0 var(--layout-side-spacing);
  }

  .content-container {
    width: 100%;
    max-width: var(--content-max-width);
    margin: 0 auto;
    padding: 0 var(--layout-side-spacing);
  }
`
