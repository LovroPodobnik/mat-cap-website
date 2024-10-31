import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Mail } from 'react-feather';

const Container = styled(motion.div)`
  position: fixed;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 40;
  class-name: 'social-links';

  @media (max-width: 768px) {
    display: none; // Hide on mobile
  }
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
    transform: translateX(-5px);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

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

const SocialMediaLinks = () => {
  const containerVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <Container
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {socialLinks.map((link, index) => (
        <SocialLink
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          variants={itemVariants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <link.icon />
        </SocialLink>
      ))}
    </Container>
  );
};

export default SocialMediaLinks;
