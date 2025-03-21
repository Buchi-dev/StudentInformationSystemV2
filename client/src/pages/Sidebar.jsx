import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { 
  HomeOutlined, 
  UserAddOutlined, 
  OrderedListOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const { Sider } = Layout;

const Sidebar = ({ collapsed, setCollapsed, isMobile }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Handle logout
  const handleLogout = () => {
    // First clear all auth-related data
    localStorage.clear(); // Clear all localStorage data
    // Force a page reload and redirect to login
    window.location.href = '/login';
  };

  // Simple menu items array
  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: 'Home',
    },
    {
      key: '/addstudent',
      icon: <UserAddOutlined />,
      label: 'Add Student',
    },
    {
      key: '/tasktracker',
      icon: <OrderedListOutlined />,
      label: 'Task Tracker',
    },
    {
      key: '/adduser',
      icon: <UserOutlined />,
      label: 'User Management',
    },
  ];

  // Handle menu item click
  const handleMenuClick = (key) => {
    navigate(key);
    if (isMobile) {
      setCollapsed(true);
    }
  };

  return (
    <>
      {/* Mobile toggle button */}
      {isMobile && (
        <Button
          type="primary"
          onClick={() => setCollapsed(!collapsed)}
          style={{
            position: 'fixed',
            top: '16px',
            left: collapsed ? '16px' : '200px',
            zIndex: 1001,
          }}
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        />
      )}
      
      {/* Sidebar */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        collapsedWidth={isMobile ? 0 : 80}
        trigger={null}
        style={{
          background: '#001529',
          height: '100vh',
          position: 'fixed',
          left: 0,
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column'
        }}
        width={200}
      >
        {/* Logo/Title */}
        <div style={{ 
          height: '64px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
        }}>
          {!collapsed && <h1 style={{ color: 'white', margin: 0 }}>Student System</h1>}
          {collapsed && !isMobile && <h1 style={{ color: 'white', margin: 0 }}>SS</h1>}
        </div>
        
        {/* Menu */}
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => handleMenuClick(key)}
          style={{ flex: 1 }}
        />

        {/* Logout Button */}
        <Menu
          theme="dark"
          mode="inline"
          selectable={false}
          items={[
            {
              key: 'logout',
              icon: <LogoutOutlined />,
              label: 'Logout',
              onClick: handleLogout,
              style: { marginBottom: '8px' }
            }
          ]}
        />
      </Sider>
    </>
  );
};

export default Sidebar;
