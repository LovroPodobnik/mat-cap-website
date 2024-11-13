import React from 'react';
import styled, { css } from 'styled-components';
import Header from './Header';
import BottomNavigation from './BottomNavigation';
import { media } from '../styles/mixins';

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;

  // Only apply max-width constraint for non-admin pages
  ${props => !props.$isAdmin && css`
    max-width: var(--max-width);
    margin: 0 auto;
  `}
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-top: ${props => props.$isHomePage ? '0' : 'var(--header-height)'};
  background-color: transparent;

  ${media.tablet} {
    padding-top: ${props => props.$isHomePage ? '0' : 'calc(var(--header-height) + var(--spacing-lg))'};
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: var(--spacing-lg) var(--spacing-md);
  background-color: transparent;

  ${media.tablet} {
    padding: var(--spacing-xl) var(--spacing-lg);
  }
`;

const Layout = ({ children, isHomePage, hideHeader = false, isAdmin }) => {
  return (
    <LayoutContainer $isAdmin={isAdmin}>
      {!hideHeader && <Header isHomePage={isHomePage} />}
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
