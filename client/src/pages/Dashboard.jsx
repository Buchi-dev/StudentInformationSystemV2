import React from 'react';
import { Card, Row, Col, Avatar } from 'antd';
import { 
  UserOutlined, 
  IdcardOutlined, 
  MailOutlined,
  TeamOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import '../styles/Dashboard.css';

const Dashboard = () => {
  // Get user data from localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  const fullName = `${user.firstName} ${user.middleName} ${user.lastName}`;

  return (
    <div className="dashboard-container">
      {/* Welcome Section */}
      <div className="welcome-section">
        <Row gutter={[24, 24]} align="middle">
          <Col xs={24} sm={24} md={16}>
            <div className="welcome-text">
              <h1>Welcome back, {user.firstName}!</h1>
              <p>Here's what's happening with your account today.</p>
            </div>
          </Col>
          <Col xs={24} sm={24} md={8}>
            <div className="time-section">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </Col>
        </Row>
      </div>

      {/* Main Content */}
      <Row gutter={[24, 24]}>
        {/* User Profile Card */}
        <Col xs={24} md={8}>
          <Card className="profile-card">
            <div className="profile-header">
              <Avatar 
                size={100} 
                icon={<UserOutlined />}
                className="profile-avatar"
              />
              <h2>{fullName}</h2>
              <p className="user-role">Administrator</p>
            </div>
            <div className="profile-info">
              <div className="info-item">
                <IdcardOutlined /> <span>ID: {user.userId}</span>
              </div>
              <div className="info-item">
                <UserOutlined /> <span>Username: {user.username}</span>
              </div>
              <div className="info-item">
                <MailOutlined /> <span>Email: {user.email || 'Not provided'}</span>
              </div>
            </div>
          </Card>
        </Col>

        {/* Quick Actions Section */}
        <Col xs={24} md={16}>
          <Card className="quick-actions-card" title="Quick Actions">
            <Row gutter={[24, 24]}>
              <Col xs={12} sm={8}>
                <button className="action-button" onClick={() => window.location.href='/addstudent'}>
                  <UserOutlined />
                  <span>Add Student</span>
                </button>
              </Col>
              <Col xs={12} sm={8}>
                <button className="action-button" onClick={() => window.location.href='/tasktracker'}>
                  <FileTextOutlined />
                  <span>Task Tracker</span>
                </button>
              </Col>
              <Col xs={12} sm={8}>
                <button className="action-button" onClick={() => window.location.href='/adduser'}>
                  <TeamOutlined />
                  <span>Add User</span>
                </button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;