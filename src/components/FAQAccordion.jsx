import React, { useState } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'react-feather'
import { Paragraph } from './Typography'

const AccordionContainer = styled(motion.div)`
  margin: 1.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

const AccordionItem = styled(motion.div)`
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: rgba(255, 255, 255, 0.07);
    border-color: rgba(255, 255, 255, 0.2);
  }
`

const QuestionButton = styled(motion.button)`
  width: 100%;
  padding: 1rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: none;
  border: none;
  color: var(--color-heading);
  font-size: var(--font-size-md);
  font-family: var(--font-family-heading);
  text-align: left;
  cursor: pointer;
  gap: 1rem;

  svg {
    min-width: 20px;
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    transform: ${props => props.$isOpen ? 'rotate(180deg)' : 'rotate(0)'};
  }
`

const Answer = styled(motion.div)`
  overflow: hidden;
  padding: 0 1.25rem;
  
  > p {
    padding-bottom: 1rem;
    opacity: 0.9;
  }
`

const FAQAccordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  }

  const answerVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: "auto",
      opacity: 1,
      transition: {
        height: {
          duration: 0.4,
          ease: [0.4, 0, 0.2, 1]
        },
        opacity: {
          duration: 0.25,
          delay: 0.15
        }
      }
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: {
        height: {
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1]
        },
        opacity: {
          duration: 0.25
        }
      }
    }
  }

  return (
    <AccordionContainer
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          variants={itemVariants}
          whileHover={{ scale: 1.005 }}
          whileTap={{ scale: 0.995 }}
        >
          <QuestionButton
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            $isOpen={openIndex === index}
            whileTap={{ scale: 0.98 }}
          >
            {item.question}
            <motion.div
              animate={{ rotate: openIndex === index ? 180 : 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              <ChevronDown size={20} />
            </motion.div>
          </QuestionButton>
          <AnimatePresence initial={false}>
            {openIndex === index && (
              <Answer
                key={`answer-${index}`}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={answerVariants}
              >
                <Paragraph>{item.answer}</Paragraph>
              </Answer>
            )}
          </AnimatePresence>
        </AccordionItem>
      ))}
    </AccordionContainer>
  )
}

export default FAQAccordion
