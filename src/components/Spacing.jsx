import React from 'react';
import styled from 'styled-components';

const SpacerDiv = styled.div`
  height: ${props => props.size || '1rem'};
`;

const Spacing = ({ size }) => {
  return <SpacerDiv size={size} />;
};

export default Spacing;