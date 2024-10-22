import styled from 'styled-components'
import { springAnimation, hoverScale } from './AnimationStyles'

export const Button = styled.button`
  background-color: var(--color-primary);
  color: var(--color-background);
  border: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  ${springAnimation}
  ${hoverScale}

  &:hover {
    background-color: var(--color-secondary);
    color: var(--color-background);
  }
`