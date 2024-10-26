import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import FormInput from './FormInput'

const StepContainer = styled(motion.div)`
  // Add any specific styling needed
`

const PersonalInfoStep = ({ formData, setFormData, onFocus }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [name]: value
      }
    }));
  };

  return (
    <StepContainer
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <FormInput
        label="Ime in priimek"
        name="fullName"
        value={formData.personalInfo.fullName}
        onChange={handleChange}
        onFocus={onFocus}
        placeholder="Vnesite ime in priimek"
        required
      />
      
      <FormInput
        label="Datum rojstva"
        name="birthDate"
        type="date"
        value={formData.personalInfo.birthDate}
        onChange={handleChange}
        onFocus={onFocus}
        required
      />
      
      <FormInput
        label="E-naslov"
        name="email"
        type="email"
        value={formData.personalInfo.email}
        onChange={handleChange}
        onFocus={onFocus}
        placeholder="vase.ime@email.com"
        required
      />
      
      <FormInput
        label="Telefonska številka"
        name="phone"
        type="tel"
        value={formData.personalInfo.phone}
        onChange={handleChange}
        onFocus={onFocus}
        placeholder="+386 XX XXX XXX"
        required
      />
    </StepContainer>
  )
}

export default PersonalInfoStep
