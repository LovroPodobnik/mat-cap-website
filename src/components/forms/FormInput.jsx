import React from 'react'
import styled from 'styled-components'

const InputWrapper = styled.div`
  margin-bottom: 1.5rem;
`

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: var(--color-text);
  font-size: var(--font-size-sm);
`

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: var(--color-text);
  font-size: var(--font-size-sm);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--color-primary);
    background: rgba(255, 255, 255, 0.07);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`

const FormInput = ({ label, onFocus, ...props }) => {
  const handleFocus = (e) => {
    if (onFocus && props.expanded) {
      onFocus(e);
    }
  };

  return (
    <InputWrapper>
      <Label>{label}</Label>
      <Input 
        onFocus={handleFocus}
        autoFocus={false}
        {...props} 
      />
    </InputWrapper>
  )
}

export default FormInput
