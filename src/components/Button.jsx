import React from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const baseButtonStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  letter-spacing: var(--letter-spacing-wide);
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  width: ${props => props.$fullWidth ? '100%' : 'auto'};

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const sizeStyles = {
  small: css`
    font-size: var(--font-size-sm);
    padding: 0.5rem 1rem;
  `,
  medium: css`
    font-size: var(--font-size-md);
    padding: 0.75rem 1.5rem;
  `,
  large: css`
    font-size: var(--font-size-lg);
    padding: 1rem 2rem;
  `,
};

const variantStyles = {
  primary: css`
    background-color: var(--color-primary);
    color: var(--color-background);
    &:hover:not(:disabled) {
      background-color: var(--color-secondary);
    }
  `,
  secondary: css`
    background-color: var(--color-secondary);
    color: var(--color-background);
    &:hover:not(:disabled) {
      background-color: var(--color-primary);
    }
  `,
  outline: css`
    background-color: transparent;
    color: var(--color-primary);
    border: 2px solid var(--color-primary);
    &:hover:not(:disabled) {
      background-color: var(--color-primary);
      color: #000; // Changed to black on hover
    }
  `,
};

const StyledButton = styled.button`
  ${baseButtonStyles}
  ${({ size }) => sizeStyles[size] || sizeStyles.medium}
  ${({ variant }) => variantStyles[variant] || variantStyles.primary}
  border: none;
  border-radius: 4px;
`;

const StyledLink = styled(Link)`
  ${baseButtonStyles}
  ${({ size }) => sizeStyles[size] || sizeStyles.medium}
  ${({ variant }) => variantStyles[variant] || variantStyles.primary}
  text-decoration: none;
  border-radius: 4px;
`;

const Button = ({
  children,
  onClick,
  disabled = false,
  size = 'medium',
  variant = 'primary',
  fullWidth = false,
  to,
  ...props
}) => {
  const Component = to ? StyledLink : StyledButton;
  
  return (
    <motion.div
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      style={{ width: fullWidth ? '100%' : 'auto' }}
    >
      <Component
        onClick={onClick}
        disabled={disabled}
        size={size}
        variant={variant}
        to={to}
        $fullWidth={fullWidth}
        className="springAnimation hoverScale"
        {...props}
      >
        {children}
      </Component>
    </motion.div>
  );
};

export default Button;