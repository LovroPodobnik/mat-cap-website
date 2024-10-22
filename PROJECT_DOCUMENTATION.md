# Project Documentation: React Framer Boilerplate

## Table of Contents
1. [Tech Stack](#tech-stack)
2. [Project Structure](#project-structure)
3. [Styling Guidelines](#styling-guidelines)
4. [Code Style](#code-style)
5. [Creating New Pages](#creating-new-pages)
6. [Component Guidelines](#component-guidelines)
7. [State Management](#state-management)
8. [Animation Guidelines](#animation-guidelines)
9. [Performance Considerations](#performance-considerations)

## Tech Stack

Our project uses the following technologies:

- **React**: A JavaScript library for building user interfaces
- **Vite**: Next generation frontend tooling for fast development and building
- **React Router**: For handling routing in our single-page application
- **Styled Components**: For component-scoped CSS with the full power of JavaScript
- **Framer Motion**: For adding smooth animations and transitions
- **React Feather**: For consistent and customizable icons

## Project Structure

The project follows this structure:

```
/src
  /components
  /pages
  /styles
  /hooks (if needed)
  /utils (if needed)
  App.jsx
  main.jsx
/public
package.json
vite.config.js
```

- `src/components`: Reusable React components
- `src/pages`: Components that represent entire pages/routes
- `src/styles`: Global styles and styled-component helpers
- `src/hooks`: Custom React hooks (if needed)
- `src/utils`: Utility functions and helpers (if needed)

## Styling Guidelines

1. Use Styled Components for component-specific styles.
2. Global styles are defined in `src/styles/GlobalStyles.js`.
3. Use CSS variables for colors, fonts, and other repeated values.
4. Follow a mobile-first approach for responsive design.
5. Use the `layout.js`, `typography.js`, and `colors.js` files in the `styles` folder for consistent theming.

## Code Style

1. Use functional components with hooks instead of class components.
2. Use arrow functions for component definitions and callbacks.
3. Use destructuring for props and state.
4. Use meaningful and descriptive names for variables, functions, and components.
5. Keep components small and focused on a single responsibility.
6. Use JSDoc comments for complex functions or components.

## Creating New Pages

1. Create a new file in the `src/pages` directory.
2. Use the following template for new pages:

```jsx
import React from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import StaggerContainer from '../components/StaggerContainer'
import { pageTransition } from '../styles/GlobalStyles'
import { H1, Paragraph } from '../components/Typography'

const PageContainer = styled.div`
  padding: 2rem 1rem;
  max-width: var(--max-width);
  margin: 0 auto;
  width: 100%;
`

const NewPage = () => {
  return (
    <motion.div {...pageTransition}>
      <PageContainer>
        <StaggerContainer>
          <H1>New Page Title</H1>
          <Paragraph>Page content goes here.</Paragraph>
        </StaggerContainer>
      </PageContainer>
    </motion.div>
  )
}

export default NewPage
```

3. Add the new route in `src/App.jsx`.

## Component Guidelines

1. Use the `StaggerContainer` component for staggered animations of child elements.
2. Utilize the `Typography` components (`H1`, `H2`, `Paragraph`, etc.) for consistent text styling.
3. Use the `Spacing` component for consistent vertical spacing between elements.
4. Implement the `Container` component for consistent max-width and padding.
5. Use the `Button` component for all clickable actions.

## State Management

1. Use React's built-in `useState` and `useContext` hooks for local and shared state management.
2. For more complex state management needs, consider using Redux or Zustand.

## Animation Guidelines

1. Use Framer Motion for animations and transitions.
2. Implement the `pageTransition` object from `GlobalStyles.js` for consistent page transitions.
3. Use the `motion` component from Framer Motion to add animations to elements.
4. Keep animations subtle and purposeful to enhance user experience without being distracting.

## Performance Considerations

1. Use React.memo() for components that render often but rarely change.
2. Implement lazy loading for images and components using React.lazy() and Suspense.
3. Use the useCallback() hook for memoizing callback functions.
4. Optimize re-renders by using the useMemo() hook for expensive computations.
5. Implement code-splitting for larger applications to reduce initial load time.

Remember to keep this documentation updated as the project evolves. Happy coding!