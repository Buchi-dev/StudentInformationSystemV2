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
  UsergroupAddOutlined,
  UserOutlined,
  BookOutlined,
  DashboardOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const QuickActionCard = ({ icon, title, description, onClick, gradient }) => (
  <Card
    hoverable
    onClick={onClick}
    style={{
      borderRadius: '12px',
      height: '100%',
      background: gradient,
      border: 'none',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease'
    }}
    bodyStyle={{
      padding: '24px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}
  >
    <div style={{ color: '#fff' }}>
      {React.cloneElement(icon, { style: { fontSize: '32px', marginBottom: '16px' } })}
      <Title level={4} style={{ color: '#fff', margin: '0 0 8px 0' }}>
        {title}
      </Title>
      <Text style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
        {description}
      </Text>
    </div>
  </Card>
);

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const quickActions = [
    {
      icon: <UsergroupAddOutlined />,
      title: 'Add Student',
      description: 'Register a new student in the system',
      gradient: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)',
      onClick: () => navigate('/addstudent')
    },
    {
      icon: <TeamOutlined />,
      title: 'Add User',
      description: 'Create a new user account',
      gradient: 'linear-gradient(135deg, #52c41a 0%, #389e0d 100%)',
      onClick: () => navigate('/adduser')
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      {/* Welcome Section */}
      <Card
        bordered={false}
        style={{
          marginBottom: '24px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Row gutter={[24, 24]} align="middle">
          <Col xs={24} md={16}>
            <Space direction="vertical" size={4}>
              <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: '16px' }}>
                Welcome back,
              </Text>
              <Title level={2} style={{ color: '#fff', margin: 0 }}>
                {user.firstName}!
              </Title>
              <Text style={{ color: 'rgba(255,255,255,0.85)' }}>
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </Text>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Quick Actions */}
      <Card 
        bordered={false} 
        style={{ 
          borderRadius: '12px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
        }}
        title={
          <Space>
            <DashboardOutlined />
            <Text strong>Quick Actions</Text>
          </Space>
        }
      >
        <Row gutter={[24, 24]}>
          {quickActions.map((action, index) => (
            <Col xs={24} sm={12} md={6} key={index}>
              <QuickActionCard {...action} />
            </Col>
          ))}
        </Row>
      </Card>
    </div>
  );
};

export default Dashboard;