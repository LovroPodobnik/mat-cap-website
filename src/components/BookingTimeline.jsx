import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Check, Send, Calendar, Edit3 } from 'react-feather';

const TimelineContainer = styled.div`
  padding: var(--spacing-lg) 0;
  max-width: 500px;
  margin: 0 auto;
`;

const TimelineItem = styled(motion.div)`
  display: flex;
  gap: var(--spacing-md);
  padding: var(--spacing-md) 0;
  
  &:not(:last-child) {
    border-left: 1px dashed rgba(255, 255, 255, 0.1);
    margin-left: 15px;
    padding-left: 30px;
  }
`;

const IconWrapper = styled.div`
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  flex-shrink: 0;
`;

const Content = styled.div`
  flex: 1;
`;

const Title = styled.h3`
  font-size: var(--font-size-md);
  margin-bottom: var(--spacing-xs);
  color: var(--color-primary);
`;

const Description = styled.p`
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  line-height: 1.6;
`;

const timelineItems = [
  {
    icon: Edit3,
    title: 'Izpolnite obrazec',
    description: 'Delite z nami svoje želje in ideje za tetovažo.'
  },
  {
    icon: Send,
    title: 'Pošljite povpraševanje',
    description: 'Vaše povpraševanje bomo pregledali in vam odgovorili v najkrajšem možnem času.'
  },
  {
    icon: Calendar,
    title: 'Dogovor za termin',
    description: 'Skupaj bomo našli ustrezen termin za vašo tetovažo.'
  },
  {
    icon: Check,
    title: 'Potrditev rezervacije',
    description: 'Po potrditvi termina prejmete vse potrebne informacije za pripravo na tetoviranje.'
  }
];

const BookingTimeline = () => {
  return (
    <TimelineContainer>
      {timelineItems.map((item, index) => (
        <TimelineItem
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <IconWrapper>
            <item.icon size={18} />
          </IconWrapper>
          <Content>
            <Title>{item.title}</Title>
            <Description>{item.description}</Description>
          </Content>
        </TimelineItem>
      ))}
    </TimelineContainer>
  );
};

export default BookingTimeline; 