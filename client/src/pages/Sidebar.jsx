import React from 'react';
import { Layout, Menu, Typography } from 'antd';
import { 
  HomeOutlined, 
  UserAddOutlined, 
  UserOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { sidebarStyles } from '../styles/sidebar';

const { Sider } = Layout;
const { Text } = Typography;

/**
 * Navigation menu items configuration
 */
const MENU_ITEMS = [
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

/**
 * Sidebar Component
 * Main navigation sidebar with collapsible functionality
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.collapsed - Whether the sidebar is collapsed
 * @param {Function} props.setCollapsed - Function to toggle sidebar collapse state
 */
const Sidebar = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * Handle user logout
   * Clears local storage and redirects to login page
   */
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  /**
   * Handle menu item click
   * @param {string} key - Route key to navigate to
   */
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
      style={sidebarStyles.sider}
      width={200}
    >
      {/* Logo/Brand */}
      <div style={sidebarStyles.logo}>
        <Text 
          strong 
          style={{
            ...sidebarStyles.logoText,
            fontSize: collapsed ? '18px' : '20px'
          }}
        >
          {collapsed ? 'SIS' : 'Student Info'}
        </Text>
      </div>

      {/* Main Navigation Menu */}
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        style={sidebarStyles.mainMenu}
        items={MENU_ITEMS}
        onClick={({ key }) => handleMenuClick(key)}
      />

      {/* Logout Menu */}
      <Menu
        mode="inline"
        style={sidebarStyles.logoutMenu}
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
