import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from 'antd';

// Import our page components
import Dashboard from './pages/Dashboard';
import AddStudent from './pages/AddStudent';
import Sidebar from './pages/Sidebar';
import TaskTracker from './pages/TaskTracker';
import AddUser from './pages/AddUser';
import Login from './pages/Login';

const { Content } = Layout;

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

const App = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  
  return (
    <Router>
      <Routes>
        {/* Login Route - Redirects to home if already logged in */}
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
                <Layout style={{
                  marginLeft: 200,
                  transition: 'margin-left 0.2s'
                }}>
                  <Content style={{
                    margin: '24px 16px',
                    padding: 24,
                    minHeight: 280,
                    background: '#fff',
                    overflow: 'auto'
                  }}>
                    <Routes>
                      {/* Dashboard as default route */}
                      <Route index element={<Dashboard />} />
                      <Route path="/addstudent" element={<AddStudent />} />
                      <Route path="/tasktracker" element={<TaskTracker />} />
                      <Route path="/adduser" element={<AddUser />} />
                      {/* Redirect any unknown routes to Dashboard */}
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
  );
};

export default App;