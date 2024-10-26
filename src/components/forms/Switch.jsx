import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const SwitchContainer = styled.div`
  margin-bottom: 1.5rem;
`

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: var(--color-text);
  font-size: var(--font-size-sm);
`

const SwitchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const SwitchTrack = styled.div`
  width: 51px;
  height: 31px;
  background: ${props => props.$isActive ? 'var(--color-primary)' : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 34px;
  padding: 3px;
  cursor: pointer;
  position: relative;
  transition: background-color 0.3s ease;
`

const SwitchKnob = styled(motion.div)`
  width: 25px;
  height: 25px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`

const SwitchLabel = styled.span`
  color: var(--color-text);
  font-size: var(--font-size-sm);
`

const Switch = ({ label, isOn, onToggle, name }) => {
  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30
  }

  return (
    <SwitchContainer>
      <Label>{label}</Label>
      <SwitchWrapper>
        <SwitchTrack
          $isActive={isOn}
          onClick={() => onToggle({ target: { name, value: !isOn } })}
        >
          <SwitchKnob
            animate={{
              x: isOn ? 20 : 0
            }}
            transition={spring}
          />
        </SwitchTrack>
        <SwitchLabel>{isOn ? 'Da' : 'Ne'}</SwitchLabel>
      </SwitchWrapper>
    </SwitchContainer>
  )
}

export default Switch
