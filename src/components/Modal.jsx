import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'react-feather';

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--color-background);
  z-index: 1001;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    width: 90%;
    max-width: 600px;
    height: 90vh;
    max-height: 800px;
    border-radius: var(--radius-lg);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;

  ${ModalContainer} {
    pointer-events: auto;
  }
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--color-text);
  width: 40px;
  height: 40px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1002;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: rotate(90deg);
  }

  @media (min-width: 768px) {
    top: 1.5rem;
    right: 1.5rem;
  }
`;

const ModalContent = styled.div`
  padding: var(--spacing-lg) var(--spacing-md);
  flex: 1;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  
  @media (min-width: 768px) {
    padding: var(--spacing-xl) var(--spacing-lg);
    overflow-y: auto;
    height: 100%;
  }
`;

const Modal = ({ 
  isOpen, 
  onClose, 
  children,
  hideUI = true
}) => {
  useEffect(() => {
    if (hideUI && isOpen) {
      const header = document.querySelector('header');
      const bottomNav = document.querySelector('.bottom-nav');
      const socialLinks = document.querySelector('.social-links');
      
      if (header) header.style.display = 'none';
      if (bottomNav) bottomNav.style.display = 'none';
      if (socialLinks) socialLinks.style.display = 'none';
      
      document.body.style.overflow = 'hidden';
    }

    return () => {
      if (hideUI) {
        const header = document.querySelector('header');
        const bottomNav = document.querySelector('.bottom-nav');
        const socialLinks = document.querySelector('.social-links');
        
        if (header) header.style.display = 'flex';
        if (bottomNav) bottomNav.style.display = 'block';
        if (socialLinks) socialLinks.style.display = 'flex';
        
        document.body.style.overflow = 'auto';
      }
    };
  }, [isOpen, hideUI]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <ModalWrapper>
            <ModalContainer
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              <CloseButton
                onClick={onClose}
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <X size={20} />
              </CloseButton>
              <ModalContent>
                {children}
              </ModalContent>
            </ModalContainer>
          </ModalWrapper>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;