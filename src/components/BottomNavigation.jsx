import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Image, Mail, HelpCircle, Heart, BookOpen } from 'react-feather';

const navItems = [
  { href: '/', label: 'Home', icon: Star },
  { href: '/gallery', label: 'Gallery', icon: Image },
  { href: '/faq', label: 'FAQ', icon: BookOpen },
  { href: '/contact', label: 'Contact', icon: Mail },
  { href: '/about', label: 'About', icon: HelpCircle },
];

const BottomNav = styled(motion.nav)`
  position: fixed;
  bottom: env(safe-area-inset-bottom, 0);
  left: 0;
  right: 0;
  z-index: 50;
  padding: 0 var(--spacing-sm) calc(var(--spacing-sm) + env(safe-area-inset-bottom, 0));
  
  &.bottom-nav {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

const NavContainer = styled.div`
  max-width: min(100%, calc(${navItems.length + 1} * 120px));
  margin: 0 auto;
`;

const NavContent = styled(motion.div)`
  background-color: rgba(37, 37, 37, 0.95);
  border: 1px solid #303030;
  border-radius: var(--radius-lg);
  padding: var(--spacing-xs);
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  width: 100%;
  gap: var(--spacing-xs);
`;

const NavItemContainer = styled.div`
  display: flex;
  align-items: stretch;
  flex: 1;
  position: relative;
  min-width: 48px;

  &:not(:last-child)::after {
    content: '';
    position: absolute;
    right: calc(var(--spacing-xs) * -1);
    top: 15%;
    height: 70%;
    width: 1px;
    background: linear-gradient(
      to bottom,
      transparent,
      rgba(255, 255, 255, 0.15) 30%,
      rgba(255, 255, 255, 0.15) 70%,
      transparent
    );
  }
`;

const NavItemLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-xs);
  border-radius: var(--radius-md);
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  color: #BEBEBE;
  background-color: ${props => props.$isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
  gap: 6px;

  &:hover {
    color: var(--color-primary);
    background-color: rgba(255, 255, 255, 0.05);
  }

  ${props => props.$isSpecial && `
    background-color: var(--color-primary);
    color: #000000;
    font-weight: 500;

    &:hover {
      background-color: var(--color-secondary);
      color: #000000;
    }
  `}

  @media (min-width: 768px) {
    flex-direction: row;
    padding: var(--spacing-xs) var(--spacing-sm);
    gap: 8px;
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const NavItemIcon = styled.div`
  width: 22px;
  height: 22px;
  color: ${props => props.$isActive ? 'var(--color-primary)' : 'inherit'};
  flex-shrink: 0;
  
  ${props => props.$isSpecial && `
    color: #000000;
  `}

  @media (min-width: 768px) {
    width: 20px;
    height: 20px;
  }
`;

const NavItemLabel = styled.span`
  font-size: 11px;
  font-weight: 500;
  white-space: nowrap;
  color: ${props => props.$isActive ? 'var(--color-text)' : 'inherit'};
  letter-spacing: -0.2px;
  
  ${props => props.$isSpecial && `
    color: #000000;
  `}

  @media (max-width: 767px) {
    display: none;
  }
  
  @media (min-width: 768px) {
    font-size: 12px;
  }
`;

const NavItem = ({ item, isActive, isSpecial }) => (
  <NavItemContainer>
    <NavItemLink 
      to={item.href + (item.href === '/book' ? '#form' : '')} 
      $isActive={isActive} 
      $isSpecial={isSpecial}
    >
      <NavItemIcon as={item.icon} $isActive={isActive} $isSpecial={isSpecial} />
      <NavItemLabel $isActive={isActive} $isSpecial={isSpecial}>
        {item.label}
      </NavItemLabel>
    </NavItemLink>
  </NavItemContainer>
);

const BottomNavigation = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const scrollTimeout = useRef(null);

  const handleScroll = useCallback(() => {
    if (scrollTimeout.current) {
      window.cancelAnimationFrame(scrollTimeout.current);
    }

    scrollTimeout.current = window.requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    });
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        window.cancelAnimationFrame(scrollTimeout.current);
      }
    };
  }, [handleScroll]);

  return (
    <AnimatePresence>
      {isVisible && (
        <BottomNav
          className="bottom-nav"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <NavContainer>
            <NavContent>
              {navItems.map((item) => (
                <NavItem
                  key={item.href}
                  item={item}
                  isActive={location.pathname === item.href}
                />
              ))}
              <NavItem
                item={{ href: '/book', label: 'Book Now', icon: Heart }}
                isSpecial
              />
            </NavContent>
          </NavContainer>
        </BottomNav>
      )}
    </AnimatePresence>
  );
};

export default BottomNavigation;
