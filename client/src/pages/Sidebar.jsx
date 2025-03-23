import React from 'react';
import { Layout, Menu, Typography } from 'antd';
import { 
  HomeOutlined, 
  UserAddOutlined, 
  UserOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const { Sider } = Layout;
const { Text } = Typography;

const Sidebar = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Handle logout
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  // Menu items array with improved organization
  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: 'Dashboard',
    },
    {
      key: '/addstudent',
      icon: <UserAddOutlined />,
      label: 'Add Student',
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
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      collapsedWidth={80}
      trigger={null}
      style={{
        background: '#fff',
        height: '100vh',
        position: 'fixed',
        left: 0,
        zIndex: 1000,
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        display: 'flex',
        flexDirection: 'column'
      }}
      width={200}
    >
      <div style={{ 
        height: '64px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        borderBottom: '1px solid #f0f0f0',
        padding: '16px'
      }}>
        <Text strong style={{ 
          color: '#1890ff',
          fontSize: collapsed ? '18px' : '20px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {collapsed ? 'SIS' : 'Student Info'}
        </Text>
      </div>

      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        style={{ 
          flex: 1,
          borderRight: 0
        }}
        items={menuItems}
        onClick={({ key }) => handleMenuClick(key)}
      />

      <Menu
        mode="inline"
        style={{
          borderRight: 0,
          borderTop: '1px solid #f0f0f0'
        }}
        items={[
          {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: 'Logout',
            danger: true,
            onClick: handleLogout
          }
        ]}
      />
    </Sider>
  );
};

export default Sidebar;
