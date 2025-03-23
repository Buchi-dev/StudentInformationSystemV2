import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout, ConfigProvider, theme } from 'antd';

// Page Components
import Dashboard from './pages/Dashboard';
import AddStudent from './pages/AddStudent';
import Sidebar from './pages/Sidebar';
import AddUser from './pages/AddUser';
import Login from './pages/Login';

const { Content } = Layout;

// Theme Configuration
const themeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: '#1890ff',
    borderRadius: 6,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
  }
};

// Layout Styles
const layoutStyles = {
  content: {
    margin: '24px',
    padding: '24px',
    minHeight: 280,
    background: '#fff',
    borderRadius: '8px',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)',
    overflow: 'auto'
  },
  mainLayout: {
    marginLeft: 200,
    transition: 'all 0.2s ease',
    background: '#f5f5f5'
  }
};

/**
 * Protected Route Component
 * Redirects to login if user is not authenticated
 */
const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? children : <Navigate to="/login" />;
};

/**
 * Main App Component
 * Handles routing and layout structure
 */
const App = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  
  return (
    <ConfigProvider theme={themeConfig}>
      <Router>
        <Routes>
          {/* Public Route - Login */}
          <Route 
            path="/login" 
            element={user ? <Navigate to="/" replace /> : <Login />} 
          />
          
          {/* Protected Routes */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Layout style={{ minHeight: '100vh' }}>
                  <Sidebar />
                  <Layout style={layoutStyles.mainLayout}>
                    <Content style={layoutStyles.content}>
                      <Routes>
                        <Route index element={<Dashboard />} />
                        <Route path="/addstudent" element={<AddStudent />} />
                        <Route path="/adduser" element={<AddUser />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                      </Routes>
                    </Content>
                  </Layout>
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </ConfigProvider>
  );
};

export default App;