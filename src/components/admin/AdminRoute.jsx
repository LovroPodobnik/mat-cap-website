import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const AdminRoute = ({ children }) => {
  const { currentUser } = useAuth();

  // Update this to your admin email
  const isAdmin = currentUser?.email === 'podobnik.lovro@gmail.com';

  if (!currentUser || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminRoute; 