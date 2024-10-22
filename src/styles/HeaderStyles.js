import styled from 'styled-components'

export const HeaderContainer = styled.header`
  background-color: var(--color-background);
  padding: 1rem 2rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`

export const Nav = styled.nav`
  display: flex;
  justify-content: flex-end;
  gap: 2rem;
`

export const NavLink = styled.a`
  color: var(--color-text);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  &:hover {
    color: var(--color-primary);
  }
`