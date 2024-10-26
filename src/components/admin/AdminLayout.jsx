import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogOut, List, User, Home } from 'react-feather';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';

const LayoutContainer = styled.div`
  min-height: 100vh;
  background: #121212;
  color: white;
  display: flex;
  width: 100%;
  max-width: none !important; /* Override any inherited max-width */
`;

const Sidebar = styled.div`
  width: 250px;
  background: rgba(0, 0, 0, 0.3);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  backdrop-filter: blur(10px);
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: 250px;
  padding: 2rem 3rem;
  min-height: 100vh;
  background: #121212;
  overflow-y: auto;
  width: calc(100% - 250px);

  /* Override any inherited styles */
  #root, .container {
    max-width: none !important;
    width: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
    text-align: left !important;
    align-items: flex-start !important;
  }

  /* Debug outlines */
  * {
    outline: 1px solid rgba(255, 0, 0, 0.1);
  }
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--color-primary);
  font-family: 'Instrument Serif', serif;
`;

const NavItem = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: ${props => props.$active ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
  border: none;
  color: var(--color-text);
  width: 100%;
  text-align: left;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 0.5rem;
  transition: all 0.3s ease;
  font-size: var(--font-size-sm);

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  svg {
    opacity: ${props => props.$active ? '1' : '0.7'};
  }
`;

const LogoutButton = styled(NavItem)`
  margin-top: auto;
  color: #ff4444;
  border: 1px solid rgba(255, 68, 68, 0.2);

  &:hover {
    background: rgba(255, 68, 68, 0.1);
  }
`;

const ReturnToSite = styled(NavItem)`
  color: var(--color-primary);
  margin-bottom: 2rem;
  border: 1px solid rgba(var(--color-primary-rgb), 0.2);

  &:hover {
    background: rgba(var(--color-primary-rgb), 0.1);
  }
`;

const UserInfo = styled.div`
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  margin-bottom: 2rem;
  font-size: var(--font-size-sm);

  .email {
    color: rgba(255, 255, 255, 0.6);
    font-size: var(--font-size-xs);
    margin-top: 0.25rem;
  }
`;

const AdminLayout = ({ children }) => {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  return (
    <LayoutContainer>
      <Sidebar>
        <Logo>Mat Cap Admin</Logo>

        <UserInfo>
          <div>Admin</div>
          <div className="email">{currentUser?.email}</div>
        </UserInfo>
        
        <ReturnToSite
          onClick={() => navigate('/')}
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          <Home size={18} />
          Return to Site
        </ReturnToSite>

        <NavItem
          onClick={() => navigate('/admin/orders')}
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.95 }}
          $active={isActive('/admin/orders')}
        >
          <List size={18} />
          Orders
        </NavItem>
        
        <NavItem
          onClick={() => navigate('/admin/profile')}
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.95 }}
          $active={isActive('/admin/profile')}
        >
          <User size={18} />
          Profile
        </NavItem>

        <LogoutButton
          onClick={handleLogout}
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          <LogOut size={18} />
          Logout
        </LogoutButton>
      </Sidebar>

      <MainContent>
        {children}
      </MainContent>
    </LayoutContainer>
  );
};

export default AdminLayout;
