import React from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Typography, 
  Space 
} from 'antd';
import { 
  TeamOutlined,
  UsergroupAddOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { dashboardStyles } from '../styles/pages';

const { Title, Text } = Typography;

/**
 * QuickActionCard Component
 * Displays a single action card with icon and description
 */
const QuickActionCard = ({ icon, title, description, onClick, gradient }) => (
  <Card
    hoverable
    onClick={onClick}
    style={{
      ...dashboardStyles.quickActionCard,
      background: gradient
    }}
    bodyStyle={dashboardStyles.quickActionCardBody}
  >
    <div style={{ color: '#fff' }}>
      {React.cloneElement(icon, { style: dashboardStyles.quickActionIcon })}
      <Title level={4} style={dashboardStyles.quickActionTitle}>
        {title}
      </Title>
      <Text style={dashboardStyles.quickActionText}>
        {description}
      </Text>
    </div>
  </Card>
);

/**
 * Quick actions configuration
 * Define available quick actions with their properties
 */
const QUICK_ACTIONS = [
  {
    icon: <UsergroupAddOutlined />,
    title: 'Add Student',
    description: 'Register a new student in the system',
    gradient: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)',
    path: '/addstudent'
  },
  {
    icon: <TeamOutlined />,
    title: 'Add User',
    description: 'Create a new user account',
    gradient: 'linear-gradient(135deg, #52c41a 0%, #389e0d 100%)',
    path: '/adduser'
  }
];

/**
 * Dashboard Component
 * Main dashboard view showing welcome message and quick actions
 */
const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const formatDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div style={dashboardStyles.container}>
      {/* Welcome Card */}
      <Card bordered={false} style={dashboardStyles.welcomeCard}>
        <Row gutter={[24, 24]} align="middle">
          <Col xs={24} md={16}>
            <Space direction="vertical" size={4}>
              <Text style={dashboardStyles.welcomeText}>
                Welcome back,
              </Text>
              <Title level={2} style={dashboardStyles.welcomeTitle}>
                {user.firstName}!
              </Title>
              <Text style={dashboardStyles.welcomeDate}>
                {formatDate()}
              </Text>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Quick Actions */}
      <Card 
        bordered={false} 
        style={dashboardStyles.actionsCard}
        title={
          <Space>
            <Text strong>Quick Actions</Text>
          </Space>
        }
      >
        <Row gutter={[24, 24]}>
          {QUICK_ACTIONS.map((action, index) => (
            <Col xs={24} sm={12} md={6} key={index}>
              <QuickActionCard 
                {...action} 
                onClick={() => navigate(action.path)}
              />
            </Col>
          ))}
        </Row>
      </Card>
    </div>
  );
};

export default Dashboard;