import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import StaggerContainer from '../components/StaggerContainer'
import { pageTransition } from '../styles/GlobalStyles'
import { H1, H2, Paragraph } from '../components/Typography'
import { ChevronRight, ChevronLeft, X, Check, Instagram, Facebook, Mail } from 'react-feather'
import PersonalInfoStep from '../components/forms/PersonalInfoStep'
import TattooDetailsStep from '../components/forms/TattooDetailsStep'
import TattooIdeaStep from '../components/forms/TattooIdeaStep'
import { saveOrder } from '../api/orders'
import { sendBookingEmail } from '../api/sendEmail'
import Button from '../components/Button'
import BookingTimeline from '../components/BookingTimeline'
import Modal from '../components/Modal'

const PageContainer = styled.div`
  padding: 2rem 1rem;
  width: 100%;
  margin: 0 auto;
  min-height: calc(100vh - 120px);
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
`;

const FormContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  padding: var(--spacing-md);
  margin-top: var(--spacing-lg);
  backdrop-filter: blur(10px);
  position: relative;
  transform-origin: center center;
  z-index: ${props => props.$isExpanded ? '1001' : '1'};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  width: 100%;
  max-width: 600px;
  margin: var(--spacing-lg) auto 0;
`;

const FormPreview = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  text-align: center;
  
  ${props => props.$isExpanded && `
    display: none;
  `}
`;

const PreviewText = styled.p`
  color: var(--color-text-secondary);
  font-size: var(--font-size-base);
  line-height: 1.6;
  margin-bottom: var(--spacing-sm);
`;

const CloseButton = styled(motion.button)`
  position: fixed;
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
  z-index: 1001;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: rotate(90deg);
  }

  @media (min-width: 768px) {
    top: 2rem;
    right: 2rem;
  }
`;

const StepIndicator = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  width: 100%;
`;

const StepDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.$isActive ? 'var(--color-primary)' : 'rgba(255, 255, 255, 0.2)'};
  transition: all 0.3s ease;
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  gap: 1rem;
`;

const NavigationButton = styled(motion.button)`
  background: ${props => props.$primary ? 'var(--color-primary)' : 'transparent'};
  border: 1px solid ${props => props.$primary ? 'var(--color-primary)' : 'rgba(255, 255, 255, 0.2)'};
  color: var(--color-text);
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: var(--font-size-sm);
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.$primary ? 'var(--color-primary)' : 'rgba(255, 255, 255, 0.1)'};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ExpandedContent = styled.div`
  padding: ${props => props.$isExpanded ? '0' : '0'};
  max-width: 600px;
  width: 100%;
  margin: ${props => props.$isExpanded ? '2rem auto 0' : '0'};
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  opacity: 1 !important; // Force opacity to be 1

  form {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`;

const SuccessOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgb(0, 0, 0);
  z-index: 1002;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const SuccessContent = styled(motion.div)`
  max-width: 500px;
  width: 100%;
  text-align: center;
  padding: 2rem;
`;

const SuccessIcon = styled(motion.div)`
  width: 80px;
  height: 80px;
  background: var(--color-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
  color: black;
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
`;

const SocialLink = styled(motion.a)`
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: var(--color-text);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: var(--color-primary);
    color: var(--color-primary);
    transform: translateY(-5px);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const SuccessMessage = styled(motion.div)`
  p {
    margin-bottom: 1.5rem;
    line-height: 1.6;
    font-size: var(--font-size-base);
  }

  .signature {
    font-style: italic;
    color: var(--color-primary);
    margin-top: 2rem;
  }
`;

const CloseSuccessButton = styled(motion.button)`
  background: var(--color-primary);
  border: none;
  color: black;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  margin-top: 2rem;
  cursor: pointer;
  font-size: var(--font-size-sm);
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(var(--color-primary-rgb), 0.3);
  }
`;

// Add socialLinks array before the Book component
const socialLinks = [
  {
    icon: Instagram,
    url: 'https://instagram.com/matcaptattoo',
    label: 'Follow us on Instagram'
  },
  {
    icon: Facebook,
    url: 'https://facebook.com/matcaptattoo',
    label: 'Like us on Facebook'
  },
  {
    icon: Mail,
    url: 'mailto:info@matcap.si',
    label: 'Email us'
  }
];

// Add this styled component
const ErrorMessage = styled.div`
  color: #ff4444;
  margin-bottom: 1rem;
  font-size: var(--font-size-sm);
  text-align: center;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: 1000;
`;

const BookingIntro = styled.div`
  text-align: center;
  margin-bottom: var(--spacing-lg);
  
  h1 {
    margin-bottom: var(--spacing-md);
  }
`;

const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
  width: 100%;
  max-width: 300px; // Limit button width
`;

const Book = () => {
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [isExpanded, setIsExpanded] = useState(location.hash === '#form');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: '',
      birthDate: '',
      email: '',
      phone: ''
    },
    tattooDetails: {
      size: '',
      location: '',
      style: '',
      isFirstTattoo: '',
      locationImage: null
    },
    tattooIdea: {
      description: '',
      referenceImages: []
    }
  });

  // Update URL when form state changes
  useEffect(() => {
    if (isExpanded) {
      window.history.replaceState(null, '', '#form');
    } else {
      window.history.replaceState(null, '', location.pathname);
    }
  }, [isExpanded, location.pathname]);

  // Handle direct navigation to #form
  useEffect(() => {
    if (location.hash === '#form') {
      setIsExpanded(true);
    }
  }, [location.hash]);

  // Handle escape key to close expanded form
  useEffect(() => {
    const handleEscape = (e) => {
      if (isExpanded && e.key === 'Escape') {
        // Optional: You can also remove this if you want to prevent closing with Escape
        setIsExpanded(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isExpanded]);

  const totalSteps = 3;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      // Save order to database
      const orderResult = await saveOrder(formData);
      if (!orderResult.success) {
        throw new Error(orderResult.error);
      }

      // Send confirmation emails
      const emailResult = await sendBookingEmail(formData);
      if (!emailResult.success) {
        console.error('Email sending failed:', emailResult.error);
        // Continue with success flow even if email fails
      }

      setSubmitted(true);
      setCurrentStep(1);
      // Reset form data
      setFormData({
        personalInfo: {
          fullName: '',
          birthDate: '',
          email: '',
          phone: ''
        },
        tattooDetails: {
          size: '',
          location: '',
          style: '',
          isFirstTattoo: '',
          locationImage: null
        },
        tattooIdea: {
          description: '',
          referenceImages: []
        }
      });
    } catch (err) {
      console.error('Submission error:', err);
      setError(err.message || 'Failed to submit form');
    } finally {
      setSubmitting(false);
    }
  };

  const renderStep = () => {
    const props = {
      formData,
      setFormData,
      onFocus: () => setIsExpanded(true)
    };

    switch (currentStep) {
      case 1:
        return <PersonalInfoStep {...props} />;
      case 2:
        return <TattooDetailsStep {...props} />;
      case 3:
        return <TattooIdeaStep {...props} />;
      default:
        return null;
    }
  };

  // Handle UI elements visibility
  useEffect(() => {
    const header = document.querySelector('header');
    const bottomNav = document.querySelector('.bottom-nav');
    
    if (isExpanded) {
      // Hide header and bottom navigation
      if (header) header.style.display = 'none';
      if (bottomNav) bottomNav.style.display = 'none';
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Show header and bottom navigation
      if (header) header.style.display = 'flex';
      if (bottomNav) bottomNav.style.display = 'block';
      // Restore body scroll
      document.body.style.overflow = 'auto';
    }

    // Cleanup function
    return () => {
      if (header) header.style.display = 'flex';
      if (bottomNav) bottomNav.style.display = 'block';
      document.body.style.overflow = 'auto';
    };
  }, [isExpanded]);

  // Add ref for form container
  const formRef = React.useRef(null);
  const [formBounds, setFormBounds] = React.useState(null);

  // Calculate form position before expansion
  const calculateFormPosition = () => {
    if (formRef.current) {
      const bounds = formRef.current.getBoundingClientRect();
      setFormBounds(bounds);
    }
  };

  // Update bounds on resize
  useEffect(() => {
    calculateFormPosition();
    window.addEventListener('resize', calculateFormPosition);
    return () => window.removeEventListener('resize', calculateFormPosition);
  }, []);

  // Calculate transform values for the animation
  const getExpandedStyles = () => {
    if (!formBounds) return {};

    return {
      scale: 1,
      x: 0,
      y: 0
    };
  };

  const expandedStyles = getExpandedStyles();

  const expandAnimation = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.15,
        ease: [0.19, 1.0, 0.22, 1.0]
      }
    },
    expanded: {
      scale: 1,
      y: 0,
      transition: {
        duration: 0.15,
        ease: [0.19, 1.0, 0.22, 1.0]
      }
    }
  };

  // Add state for success message
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFormClick = () => {
    if (!isExpanded) {
      setIsExpanded(true);
    }
  };

  return (
    <motion.div {...pageTransition}>
      <PageContainer>
        <BookingIntro>
          <StaggerContainer>
            <H1 $align="center">Dogovorite se za termin</H1>
            <Button 
              onClick={() => setIsExpanded(true)}
              variant="primary"
              size="large"
              fullWidth
            >
              Začni z rezervacijo
            </Button>
          </StaggerContainer>
        </BookingIntro>

        <BookingTimeline />

        <Modal 
          isOpen={isExpanded} 
          onClose={() => setIsExpanded(false)}
        >
          <StepIndicator>
            {[...Array(totalSteps)].map((_, index) => (
              <StepDot 
                key={index} 
                $isActive={currentStep === index + 1}
              />
            ))}
          </StepIndicator>

          <form onSubmit={handleSubmit}>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {renderStep()}

            <NavigationButtons>
              <NavigationButton
                type="button"
                onClick={handlePrev}
                disabled={currentStep === 1 || submitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ChevronLeft size={16} />
                Nazaj
              </NavigationButton>
              
              <NavigationButton
                type={currentStep === totalSteps ? "submit" : "button"}
                onClick={currentStep === totalSteps ? undefined : handleNext}
                $primary
                disabled={submitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {submitting ? 'Pošiljam...' : currentStep === totalSteps ? 'Pošlji' : 'Naprej'}
                {currentStep !== totalSteps && <ChevronRight size={16} />}
              </NavigationButton>
            </NavigationButtons>
          </form>
        </Modal>

        <AnimatePresence>
          {submitted && (
            <SuccessOverlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <SuccessContent>
                <SuccessIcon
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    delay: 0.2
                  }}
                >
                  <Check size={40} />
                </SuccessIcon>

                <SuccessMessage
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <H2 align="center">Hej!</H2>
                  <Paragraph align="center">
                    Hvala, da si nas kontaktiral/a. V roku tedna dni se slišimo in dorečemo vse glede sodelovanja. Komaj čakamo, da skupaj ustvarimo nekaj res posebnega!
                  </Paragraph>
                  <Paragraph align="center" className="signature">
                    Lep pozdrav,<br />
                    Mat Cap Tattoo
                  </Paragraph>

                  <SocialLinks
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    {socialLinks.map((link, index) => (
                      <SocialLink
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.label}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <link.icon />
                      </SocialLink>
                    ))}
                  </SocialLinks>

                  <CloseSuccessButton
                    onClick={() => setShowSuccess(false)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Zapri
                  </CloseSuccessButton>
                </SuccessMessage>
              </SuccessContent>
            </SuccessOverlay>
          )}
        </AnimatePresence>
      </PageContainer>
    </motion.div>
  );
};

export default Book;
