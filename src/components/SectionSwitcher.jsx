import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const SwitcherContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  margin: 0 auto 3rem;
  padding: 0.25rem;
  width: fit-content;
`;

const SwitchOption = styled(motion.button)`
  position: relative;
  padding: 0.75rem 2rem;
  background: transparent;
  border: none;
  color: ${props => props.$isActive ? 'var(--color-primary)' : 'rgba(255, 255, 255, 0.6)'};
  cursor: pointer;
  font-family: var(--font-family-heading);
  font-size: var(--font-size-lg);
  transition: all 0.3s ease;
  min-width: 120px;
  z-index: 2;

  &:hover {
    color: ${props => !props.$isActive && 'rgba(255, 255, 255, 0.9)'};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: ${props => props.$isActive ? '30px' : '0px'};
    height: 2px;
    background: var(--color-primary);
    transform: translateX(-50%);
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: ${props => props.$isActive ? '30px' : '15px'};
  }
`;

const Divider = styled.div`
  width: 1px;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(255, 255, 255, 0.2) 20%,
    rgba(255, 255, 255, 0.2) 80%,
    transparent
  );
  margin: 0.5rem 0;
`;

const SectionSwitcher = ({ activeSection, onSectionChange }) => {
  return (
    <SwitcherContainer>
      <SwitchOption
        $isActive={activeSection === 'matcap'}
        onClick={() => onSectionChange('matcap')}
        whileHover={{ y: -2 }}
        whileTap={{ y: 0 }}
      >
        Mat Cap
      </SwitchOption>
      <Divider />
      <SwitchOption
        $isActive={activeSection === 'studio'}
        onClick={() => onSectionChange('studio')}
        whileHover={{ y: -2 }}
        whileTap={{ y: 0 }}
      >
        Studio
      </SwitchOption>
    </SwitcherContainer>
  );
};

export default SectionSwitcher; 