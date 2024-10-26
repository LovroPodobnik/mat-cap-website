import React, { useState } from 'react'
import styled from 'styled-components'
import { ChevronDown } from 'react-feather'
import { motion, AnimatePresence } from 'framer-motion'

const SelectWrapper = styled.div`
  margin-bottom: 1.5rem;
  position: relative;
`

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: var(--color-text);
  font-size: var(--font-size-sm);
`

const SelectButton = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: var(--color-text);
  font-size: var(--font-size-sm);
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.07);
    border-color: rgba(255, 255, 255, 0.2);
  }

  svg {
    transition: transform 0.3s ease;
    transform: ${props => props.$isOpen ? 'rotate(180deg)' : 'rotate(0)'};
  }
`

const OptionsContainer = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 0.5rem;
  background: rgba(30, 30, 30, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  overflow: hidden;
  z-index: 10;
  backdrop-filter: blur(10px);
`

const Option = styled(motion.button)`
  width: 100%;
  padding: 0.75rem 1rem;
  background: transparent;
  border: none;
  color: var(--color-text);
  font-size: var(--font-size-sm);
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  &:not(:last-child) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }
`

const FormSelect = ({ label, options, value, onChange, name, onFocus }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (option, e) => {
    e.preventDefault()
    e.stopPropagation()
    onChange({ target: { name, value: option.value } })
    setIsOpen(false)
  }

  const handleButtonClick = (e) => {
    e.preventDefault()
    setIsOpen(!isOpen)
  }

  const selectedOption = options.find(option => option.value === value)

  return (
    <SelectWrapper>
      <Label>{label}</Label>
      <SelectButton 
        type="button"
        onClick={handleButtonClick}
        onFocus={onFocus}
        $isOpen={isOpen}
      >
        {selectedOption ? selectedOption.label : 'Izberi možnost'}
        <ChevronDown size={16} />
      </SelectButton>

      <AnimatePresence>
        {isOpen && (
          <OptionsContainer
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {options.map((option) => (
              <Option
                key={option.value}
                type="button"
                onClick={(e) => handleSelect(option, e)}
                onFocus={onFocus}
                whileHover={{ x: 5 }}
              >
                {option.label}
              </Option>
            ))}
          </OptionsContainer>
        )}
      </AnimatePresence>
    </SelectWrapper>
  )
}

export default FormSelect
