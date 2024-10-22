import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const StyledStaggerContainer = styled(motion.div)`
  /* No need for additional styles here */
`

const StaggerContainer = ({ children, delay = 0.1, ...props }) => {
  return (
    <StyledStaggerContainer
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: delay,
          },
        },
      }}
      className="staggerChildren"
      {...props}
    >
      {React.Children.map(children, (child) => (
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                type: 'spring',
                stiffness: 300,
                damping: 24,
              },
            },
          }}
        >
          {child}
        </motion.div>
      ))}
    </StyledStaggerContainer>
  )
}

export default StaggerContainer