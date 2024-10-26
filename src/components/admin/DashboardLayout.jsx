import React, { useEffect } from 'react';
import AdminLayout from './AdminLayout';

const DashboardLayout = ({ children }) => {
  useEffect(() => {
    // Add admin-layout class when component mounts
    document.body.classList.add('admin-layout');
    
    // Remove it when component unmounts
    return () => {
      document.body.classList.remove('admin-layout');
    };
  }, []);

  return <AdminLayout>{children}</AdminLayout>;
};

export default DashboardLayout;
