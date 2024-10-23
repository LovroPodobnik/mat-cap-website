import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'

const HeaderContainer = styled(motion.header)`
  width: 100%;
  padding: 2rem 1rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: ${props => props.$isHidden ? 'none' : 'auto'};
  opacity: ${props => props.$isHidden ? 0 : 1};
  transform: translateY(${props => props.$isHidden ? '-100%' : '0'});
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const HeaderContent = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 1rem;
`;

const Logo = styled.img`
  max-width: 300px;
  width: 100%;
  height: auto;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    max-width: 200px;
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  gap: 2rem;
`;

const NavLink = styled(Link)`
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
`;

const Header = ({ isHidden = false }) => {
  return (
    <AnimatePresence>
      {!isHidden && (
        <HeaderContainer
          $isHidden={isHidden}
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          <HeaderContent>
            <Link to="/">
              <Logo src="https://matcap.si/images/matcap-logo-header-01.svg" alt="Matcap Tattoo Logo" />
            </Link>
          </HeaderContent>
        </HeaderContainer>
      )}
    </AnimatePresence>
  )
}

export default Header
