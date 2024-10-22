import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const StoryContainer = styled.div`
  margin-bottom: 2rem;
`

const Paragraph = styled.p`
  font-size: var(--font-size-md);
  line-height: var(--line-height-relaxed);
  letter-spacing: var(--letter-spacing-base);
  margin-bottom: 1.5rem;
  max-width: var(--max-width);
  color: var(--color-text-muted);
`

const Story = ({ content }) => {
  return (
    <StoryContainer>
      {content.map((item, index) => (
        <motion.div
          key={item.key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
        >
          <Paragraph>{item.text}</Paragraph>
        </motion.div>
      ))}
    </StoryContainer>
  )
}

export default Story