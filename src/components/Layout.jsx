import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import BottomNavigation from './BottomNavigation';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  background-color: transparent; // Ensure this is transparent
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-top: ${props => props.$isHomePage ? '0' : '80px'};
  background-color: transparent; // Ensure this is transparent
`;

const ContentContainer = styled.div`
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 1rem;
  background-color: transparent; // Ensure this is transparent
`;

const Layout = ({ children, isHomePage, hideHeader = false }) => {
  return (
    <LayoutContainer>
      <Header isHidden={hideHeader} />
      <Main $isHomePage={isHomePage}>
        <ContentContainer>
          {children}
        </ContentContainer>
      </Main>
      <BottomNavigation />
    </LayoutContainer>
  );
};

export default Layout;
