import React, { useState } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronLeft, ChevronRight, X } from 'react-feather'
import { H2, Paragraph } from './Typography'

const AccordionContainer = styled(motion.div)`
  margin: 1.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

const AccordionItem = styled(motion.div)`
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: rgba(255, 255, 255, 0.07);
    border-color: rgba(255, 255, 255, 0.2);
  }
`

const QuestionButton = styled(motion.button)`
  width: 100%;
  padding: 1rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: none;
  border: none;
  color: var(--color-heading);
  font-size: var(--font-size-md);
  font-family: var(--font-family-heading);
  text-align: left;
  cursor: pointer;
  gap: 1rem;
`

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.97);
  z-index: 1000;
  display: flex;
  overflow: hidden;

  @media (min-width: 768px) {
    padding-left: 30%; // Space for side panel
  }
`

const ModalContent = styled(motion.div)`
  width: 100%;
  height: 100%;
  padding: 4rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  overflow-y: auto;
  
  @media (min-width: 768px) {
    padding: 4rem 4rem 2rem;
    max-width: 1000px;
    margin: 0 auto;

    /* Custom scrollbar for modal content */
    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 3px;
      
      &:hover {
        background: rgba(255, 255, 255, 0.2);
      }
    }

    /* Firefox scrollbar */
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
  }

  h2 {
    text-align: left;
    font-size: 2rem;
    line-height: 1.3;
    margin-bottom: 2rem;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.6;
    opacity: 0.9;
  }
`

const ModalNavigation = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(37, 37, 37, 0.9);
  backdrop-filter: blur(8px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  @media (min-width: 768px) {
    display: none; // Hide on desktop
  }

  .question-counter {
    @media (max-width: 768px) {
      display: none;
    }
  }

  .mobile-nav-hint {
    display: none;
    @media (max-width: 768px) {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: rgba(255, 255, 255, 0.5);
      font-size: 0.8rem;
    }
  }
`

const NavButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--color-text);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`

const CloseButton = styled(NavButton)`
  position: fixed;
  top: 1rem;
  right: 1rem;
`

const QuestionNumber = styled.span`
  color: var(--color-primary);
  font-size: var(--font-size-sm);
  margin-bottom: 1rem;
  align-self: flex-start; // Align to left
`

const KeyboardInstruction = styled.div`
  position: fixed;
  bottom: 80px;
  left: 4rem; // Align with content
  transform: none; // Remove center transform
  display: flex;
  gap: 1rem;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.8rem;

  @media (max-width: 768px) {
    display: none;
  }
`

const KeyHint = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const KeyBox = styled.span`
  padding: 0.25rem 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.1);
`

const SwipeInstruction = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.8rem;
    margin-top: 1rem;
  }
`

// Add new styled components for desktop index
const DesktopLayout = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: ${props => props.$isModalOpen ? 'block' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 30%;
    background: rgba(20, 20, 20, 0.98);
    z-index: 1001;
    padding: 4rem 2rem 2rem;
    overflow-y: auto;
    border-right: 1px solid rgba(255, 255, 255, 0.1);

    /* Custom scrollbar for the side panel */
    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 3px;
      
      &:hover {
        background: rgba(255, 255, 255, 0.2);
      }
    }

    /* Firefox scrollbar */
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
  }
`;

const IndexList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const IndexItem = styled.button`
  padding: 1rem;
  background: ${props => props.$isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
  border: 1px solid ${props => props.$isActive ? 'var(--color-primary)' : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 8px;
  color: ${props => props.$isActive ? 'var(--color-primary)' : 'var(--color-text)'};
  font-size: 1rem;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: flex-start;
  gap: 1rem;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: var(--color-primary);
  }

  .number {
    font-size: 0.875rem;
    color: var(--color-primary);
    opacity: ${props => props.$isActive ? '1' : '0.7'};
    min-width: 24px;
  }

  .question {
    font-size: 0.95rem;
    line-height: 1.4;
    opacity: ${props => props.$isActive ? '1' : '0.7'};
  }
`;

// Add desktop questions container
const DesktopQuestions = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: ${props => props.$isModalOpen ? 'none' : 'block'};
  }
`;

// Mobile specific accordion styles
const MobileAccordion = styled(motion.div)`
  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileAnswer = styled(motion.div)`
  overflow: hidden;
  padding: 0 1.25rem 1rem;
  
  > p {
    opacity: 0.9;
  }
`;

const FAQAccordion = ({ items, setHideHeader }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [mobileOpenIndex, setMobileOpenIndex] = useState(null);
  const isDesktop = window.innerWidth >= 768;

  // Add keyboard navigation
  React.useEffect(() => {
    const handleKeyPress = (e) => {
      if (selectedIndex !== null) {
        switch (e.key) {
          case 'ArrowRight':
          case 'ArrowDown':
            e.preventDefault();
            handleNext();
            break;
          case 'ArrowLeft':
          case 'ArrowUp':
            e.preventDefault();
            handlePrev();
            break;
          case 'Escape':
            e.preventDefault();
            handleCloseModal();
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedIndex]);

  const handleOpenModal = (index) => {
    setSelectedIndex(index);
    setHideHeader(true);
  }

  const handleCloseModal = () => {
    setSelectedIndex(null);
    setHideHeader(false);
    // Ensure any open states are reset
    setMobileOpenIndex(null);
    // Remove any body classes
    document.body.classList.remove('hide-bottom-nav');
  };

  const handleNext = () => {
    setSelectedIndex(prev => 
      prev < items.length - 1 ? prev + 1 : prev
    )
  }

  const handlePrev = () => {
    setSelectedIndex(prev => 
      prev > 0 ? prev - 1 : prev
    )
  }

  // Add effect to hide bottom navigation when modal is open
  React.useEffect(() => {
    if (selectedIndex !== null) {
      document.body.classList.add('hide-bottom-nav');
    } else {
      document.body.classList.remove('hide-bottom-nav');
    }
    return () => {
      document.body.classList.remove('hide-bottom-nav');
    };
  }, [selectedIndex]);

  const handleItemClick = (index) => {
    if (isDesktop) {
      handleOpenModal(index);
    } else {
      setMobileOpenIndex(mobileOpenIndex === index ? null : index);
    }
  };

  // Add cleanup effect
  React.useEffect(() => {
    return () => {
      // Cleanup when component unmounts
      document.body.classList.remove('hide-bottom-nav');
      setHideHeader(false);
    };
  }, [setHideHeader]);

  // Add effect to handle body scroll
  React.useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedIndex]);

  return (
    <>
      {/* Mobile Accordion View */}
      <MobileAccordion>
        <AccordionContainer>
          {items.map((item, index) => (
            <AccordionItem key={index}>
              <QuestionButton
                onClick={() => handleItemClick(index)}
                $isOpen={mobileOpenIndex === index}
              >
                {item.question}
                <ChevronDown size={20} />
              </QuestionButton>
              <AnimatePresence initial={false}>
                {mobileOpenIndex === index && (
                  <MobileAnswer
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Paragraph>{item.answer}</Paragraph>
                  </MobileAnswer>
                )}
              </AnimatePresence>
            </AccordionItem>
          ))}
        </AccordionContainer>
      </MobileAccordion>

      {/* Desktop Questions View (when modal is closed) */}
      <DesktopQuestions $isModalOpen={selectedIndex !== null}>
        <AccordionContainer>
          {items.map((item, index) => (
            <AccordionItem
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ scale: 1.005 }}
              whileTap={{ scale: 0.995 }}
            >
              <QuestionButton
                onClick={() => handleItemClick(index)}
                whileTap={{ scale: 0.98 }}
              >
                {item.question}
                <ChevronDown size={20} />
              </QuestionButton>
            </AccordionItem>
          ))}
        </AccordionContainer>
      </DesktopQuestions>

      {/* Modal and Index for Desktop */}
      <AnimatePresence mode="wait">
        {selectedIndex !== null && isDesktop && (
          <>
            {/* Side Index */}
            <DesktopLayout 
              $isModalOpen={selectedIndex !== null}
              initial={{ x: -400 }}
              animate={{ x: 0 }}
              exit={{ x: -400, transition: { duration: 0.2 } }} // Faster exit
              transition={{ type: "spring", damping: 25 }}
            >
              <IndexList>
                {items.map((item, index) => (
                  <IndexItem
                    key={index}
                    $isActive={selectedIndex === index}
                    onClick={() => handleItemClick(index)}
                  >
                    <span className="number">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="question">
                      {item.question}
                    </span>
                  </IndexItem>
                ))}
              </IndexList>
            </DesktopLayout>

            {/* Modal Content */}
            <Modal
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }} // Faster exit
              transition={{ duration: 0.3 }}
            >
              <CloseButton
                onClick={handleCloseModal}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={24} />
              </CloseButton>

              <ModalContent>
                <QuestionNumber>
                  Question {selectedIndex + 1} of {items.length}
                </QuestionNumber>
                <H2 style={{ marginBottom: '2rem', maxWidth: '600px' }}>
                  {items[selectedIndex].question}
                </H2>
                <Paragraph style={{ maxWidth: '600px' }}>
                  {items[selectedIndex].answer}
                </Paragraph>

                <SwipeInstruction>
                  Swipe left or right to navigate
                </SwipeInstruction>
              </ModalContent>

              {/* Keyboard instructions - hidden on mobile */}
              <KeyboardInstruction>
                <KeyHint><KeyBox>←</KeyBox> Previous</KeyHint>
                <KeyHint><KeyBox>→</KeyBox> Next</KeyHint>
                <KeyHint><KeyBox>ESC</KeyBox> Close</KeyHint>
              </KeyboardInstruction>

              <ModalNavigation>
                <NavButton
                  onClick={handlePrev}
                  disabled={selectedIndex === 0}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft size={24} />
                </NavButton>
                
                {/* Question counter - hidden on mobile */}
                <span className="question-counter">
                  {selectedIndex + 1} / {items.length}
                </span>
                
                {/* Mobile navigation hint */}
                <span className="mobile-nav-hint">
                  Tap arrows to navigate
                </span>

                <NavButton
                  onClick={handleNext}
                  disabled={selectedIndex === items.length - 1}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight size={24} />
                </NavButton>
              </ModalNavigation>
            </Modal>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default FAQAccordion
