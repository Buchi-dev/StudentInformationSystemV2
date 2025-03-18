import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';

// Import our page components
import Dashboard from './pages/Dashboard';
import AddStudent from './pages/AddStudent';
import Sidebar from './pages/Sidebar';
import TaskTracker from './pages/TaskTracker';
import AddUser from './pages/AddUser';

const { Content } = Layout;

const App = () => {
  
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sidebar/>
        <Layout style={{ 
          marginLeft:  200,  // Adjust margin based on sidebar state
          transition: 'margin-left 0.2s'      // Smooth transition animation
        }}>
          <Content style={{ 
            margin: '24px 16px', 
            padding: 24, 
            minHeight: 280, 
            background: '#fff',
            overflow: 'auto'
          }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/addstudent" element={<AddStudent />} />
              <Route path="/tasktracker" element={<TaskTracker />} />
              <Route path="/adduser" element={<AddUser />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;