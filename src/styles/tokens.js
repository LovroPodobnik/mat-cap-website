import { css } from 'styled-components';

export const tokens = css`
  :root {
    /* Colors */
    --color-background: #000000;
    --color-text: rgba(255, 255, 255, 0.87);
    --color-primary: #ffd700;
    --color-secondary: #c0c0c0;
    --color-accent: #FF4500;
    
    /* Text Colors */
    --color-text-primary: var(--color-text);
    --color-text-secondary: rgba(255, 255, 255, 0.75);
    --color-text-tertiary: rgba(255, 255, 255, 0.6);
    
    /* Shadows */
    --shadow-sm: 1px 1px 2px rgba(0, 0, 0, 0.3);
    --shadow-md: 2px 2px 4px rgba(0, 0, 0, 0.5);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    
    /* Spacing */
    --spacing-xs: 0.5rem;
    --spacing-sm: 1rem;
    --spacing-md: 1.5rem;
    --spacing-lg: 2rem;
    --spacing-xl: 4rem;
    --spacing-2xl: 6rem;
    --spacing-3xl: 8rem;
    --spacing-4xl: 10rem;
    
    /* Border Radius - Reduced values */
    --radius-sm: 3px;     // Reduced from 5px
    --radius-md: 6px;     // Reduced from 8px
    --radius-lg: 8px;     // Reduced from 12px
    --radius-full: 24px;  // Reduced from 9999px - for pill shapes
    
    /* Layout Spacing */
    --header-height: 80px;
    --header-height-mobile: 60px;
    --content-spacing-top: 120px;
    --content-spacing-top-mobile: 100px;
    --section-spacing: 4rem;
    --section-spacing-mobile: 3rem;
    
    /* Container widths */
    --max-width: 460px;
    --admin-max-width: 1200px;
    --content-max-width: 800px;
    
    /* Carousel specific colors */
    --carousel-dot-size: 8px;
    --carousel-dot-size-active: 10px;
    --carousel-dot-color: rgba(255, 255, 255, 0.2);
    --carousel-dot-border: rgba(255, 255, 255, 0.1);
    --carousel-dot-color-active: var(--color-primary);
    
    @media (min-width: 768px) {
      --carousel-dot-size: 10px;
      --carousel-dot-size-active: 12px;
    }
  }
`; 