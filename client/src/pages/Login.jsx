import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  UserOutlined, 
  LockOutlined, 
  LoginOutlined 
} from '@ant-design/icons';
import { 
  Form, 
  Input, 
  Button, 
  Card, 
  Typography, 
  message, 
  Layout 
} from 'antd';
import { loginStyles } from '../styles/login';

// Constants
const API_BASE_URL = 'http://localhost:3000/api';

const { Title, Text } = Typography;
const { Content } = Layout;

/**
 * Login Component
 * Handles user authentication and login functionality
 */
const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  /**
   * Handle form submission
   * @param {Object} values - Form values containing username and password
   */
  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, values);
      if (response.data.success) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        message.success('Welcome back!');
        navigate('/');
      }
    } catch (err) {
      console.error('Login error:', err);
      message.error('Invalid username or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout style={loginStyles.layout}>
      <Content style={loginStyles.content}>
        <Card style={loginStyles.card} bordered={false}>
          <div style={loginStyles.header}>
            <Title level={2} style={loginStyles.title}>
              Welcome Back
            </Title>
            <Text type="secondary">
              Please sign in to your account
            </Text>
          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            requiredMark={false}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please enter your username' }]}
            >
              <Input
                prefix={<UserOutlined style={{ color: '#1890ff' }} />}
                placeholder="Username"
                size="large"
                style={{ borderRadius: '6px' }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please enter your password' }]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: '#1890ff' }} />}
                placeholder="Password"
                size="large"
                style={{ borderRadius: '6px' }}
              />
            </Form.Item>

            <Form.Item style={{ marginBottom: '12px' }}>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                icon={<LoginOutlined />}
                size="large"
                block
                style={loginStyles.button}
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>

          <div style={loginStyles.footer}>
            <Title level={4} style={loginStyles.footerTitle}>
              Student Information System
            </Title>
            <Text type="secondary" style={loginStyles.copyright}>
              © {new Date().getFullYear()} All rights reserved
            </Text>
          </div>
        </Card>
      </Content>
    </Layout>
  );
};

export default Login; 