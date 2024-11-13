import styled from 'styled-components';
import { motion } from 'framer-motion';

const StyledButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: ${props => props.$size === 'small' ? '0.5rem 1rem' : '1rem 2rem'};
  background: ${props => props.$variant === 'outline' 
    ? 'transparent' 
    : 'var(--color-primary)'};
  border: 1px solid ${props => props.$variant === 'outline' 
    ? 'var(--color-primary)' 
    : 'transparent'};
  border-radius: 8px;
  color: ${props => props.$variant === 'outline' 
    ? 'var(--color-primary)' 
    : 'var(--color-background)'};
  font-size: var(--font-size-sm);
  font-weight: 500;
  cursor: pointer;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  width: ${props => props.fullWidth ? '100%' : 'auto'};

  &:hover {
    background: ${props => props.$variant === 'outline' 
      ? 'rgba(255, 215, 0, 0.1)' 
      : 'var(--color-secondary)'};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
`;

const Button = ({ 
  children, 
  $variant = 'primary', 
  size = 'medium',
  fullWidth = false,
  ...props 
}) => {
  return (
    <StyledButton
      $variant={$variant}
      $size={size}
      fullWidth={fullWidth}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;