import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout, ConfigProvider, theme } from 'antd';
import { layoutStyles, themeConfig } from './styles/layout';

import Dashboard from './pages/Dashboard';
import AddStudent from './pages/AddStudent';
import Sidebar from './pages/Sidebar';
import AddUser from './pages/AddUser';
import Login from './pages/Login';

const { Content } = Layout;

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? children : <Navigate to="/login" />;
};

const App = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  
  return (
    <ConfigProvider theme={themeConfig}>
      <Router>
        <Routes>
          <Route 
            path="/login" 
            element={user ? <Navigate to="/" replace /> : <Login />} 
          />
          
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