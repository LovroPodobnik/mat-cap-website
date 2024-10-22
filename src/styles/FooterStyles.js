import styled from 'styled-components'

export const FooterContainer = styled.footer`
  background-color: var(--color-background);
  color: var(--color-text);
  padding: 1rem 0;
  text-align: center;
`

export const FooterContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`

export const FooterText = styled.p`
  font-size: 0.8rem;
  margin: 0;
`

export const FooterLink = styled.a`
  color: var(--color-primary);
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: var(--color-secondary);
  }
`