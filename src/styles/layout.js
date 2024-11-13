import { css } from 'styled-components'
import { media } from './mixins'

export const layout = css`
  :root {
    /* Header measurements */
    --header-height: 80px;
    --header-height-mobile: 60px;
    
    /* Content spacing */
    --content-spacing-top: calc(var(--header-height) + var(--spacing-xl));
    --content-spacing-top-mobile: calc(var(--header-height-mobile) + var(--spacing-lg));
    
    /* Page specific spacing */
    --page-padding-top: var(--spacing-xl);
    --page-padding-top-mobile: var(--spacing-lg);
    
    /* Container widths */
    --max-width: 460px;
    --content-max-width: 800px;
    
    @media (max-width: 768px) {
      --header-height: var(--header-height-mobile);
      --content-spacing-top: var(--content-spacing-top-mobile);
      --page-padding-top: var(--page-padding-top-mobile);
    }
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
