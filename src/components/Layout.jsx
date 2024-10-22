import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import BottomNavigation from './BottomNavigation';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: transparent;
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-top: ${props => props.isHomePage ? '0' : '80px'};
  background-color: transparent;
`;

const Layout = ({ children, isHomePage }) => {
  return (
    <LayoutContainer>
      <Header />
      <Main isHomePage={isHomePage}>{children}</Main>
      <BottomNavigation />
    </LayoutContainer>
  );
};

export default Layout;
