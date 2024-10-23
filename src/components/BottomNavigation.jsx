import React, { useState, useEffect } from 'react';
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
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 50;
  // Add the class name for targeting
  &.bottom-nav {
    transition: opacity 0.3s ease;
  }
`;

const NavContainer = styled.div`
  max-width: min(100%, calc(${navItems.length + 1} * 120px)); // Adjust based on number of items
  margin: 0 auto;
  padding: 0 1rem 1rem;
`;

const NavContent = styled(motion.div)`
  background-color: rgba(37, 37, 37, 0.9);
  border: 1px solid #303030;
  border-radius: 9999px;
  padding: 0.5rem;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(8px);
  width: 100%;
  height: 70px;

  @media (min-width: 768px) {
    height: 56px;
  }
`;

const NavItemContainer = styled.div`
  display: flex;
  align-items: stretch;
  flex: 1;
  margin: 0 0.25rem;
`;

const NavItemLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  border-radius: 9999px;
  transition: all 0.2s ease-in-out;
  color: ${props => props.$isActive ? 'var(--color-text)' : '#BEBEBE'};
  background-color: ${props => props.$isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};

  &:hover {
    color: var(--color-text);
    background-color: rgba(255, 255, 255, 0.05);
  }

  ${props => props.$isSpecial && `
    background-color: #3B3B3B;
    color: #C4C4C4;

    &:hover {
      background-color: #4A4A4A;
    }
  `}

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
    padding: 0.5rem 1rem;
  }
`;

const NavItemIcon = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  margin-bottom: 0.25rem;

  @media (min-width: 768px) {
    width: 1.25rem;
    height: 1.25rem;
    margin-bottom: 0;
    margin-right: 0.5rem;
  }
`;

const NavItemLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
  white-space: nowrap;

  @media (max-width: 767px) {
    display: none;
  }
`;

const NavItem = ({ item, isActive, isSpecial, isLast }) => (
  <NavItemContainer>
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <NavItemLink to={item.href} $isActive={isActive} $isSpecial={isSpecial} className="springAnimation hoverScale">
        <NavItemIcon as={item.icon} />
        <NavItemLabel>{item.label}</NavItemLabel>
      </NavItemLink>
    </motion.div>
  </NavItemContainer>
);

const BottomNavigation = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

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
            <NavContent layout>
              {navItems.map((item, index) => (
                <NavItem
                  key={item.href}
                  item={item}
                  isActive={location.pathname === item.href}
                  isLast={index === navItems.length - 1}
                />
              ))}
              <NavItem
                item={{ href: '/book', label: 'Book Now', icon: Heart }}
                isSpecial
                isLast
              />
            </NavContent>
          </NavContainer>
        </BottomNav>
      )}
    </AnimatePresence>
  );
};

export default BottomNavigation;
