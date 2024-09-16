import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import UserManagement from './UserManagement';
import SellerManagement from './SellerManagement';
import HomepageManagement from './HomepageManagement';

const AdminDashboard = () => {
  return (
    <div style={styles.container}>
      <AdminSidebar />
      <main style={styles.main}>
        <Routes>
          <Route path="/" element={<Navigate to="/admin/homepage" replace />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="sellers" element={<SellerManagement />} />
          <Route path="homepage" element={<HomepageManagement />} />
        </Routes>
      </main>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    fontFamily: 'Arial, sans-serif',
  },
  main: {
    flexGrow: 1,
    padding: '20px',
    marginLeft: '220px',
  },
};

export default AdminDashboard;