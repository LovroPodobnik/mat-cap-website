import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const StepBar = styled.div`
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-full);
  margin: var(--spacing-md) 0;
  overflow: hidden;
`;

const Progress = styled(motion.div)`
  height: 100%;
  background: var(--color-primary);
  border-radius: var(--radius-full);
`;

const StepIndicator = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <StepBar>
      <Progress
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.3 }}
      />
    </StepBar>
  );
};

export default StepIndicator; 