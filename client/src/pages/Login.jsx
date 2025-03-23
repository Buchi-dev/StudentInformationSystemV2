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
  Typography, 
  message, 
  Layout 
} from 'antd';
import { loginStyles } from '../styles/login';
import Logo from '../assets/Logo.png';

const API_BASE_URL = 'http://localhost:3000/api';

const { Title, Text, Paragraph } = Typography;
const { Content } = Layout;

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();

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
      <Content>
        <div style={loginStyles.container}>     
          <div style={loginStyles.leftSection}>
            <div style={loginStyles.decorativeShape} />
            <div style={loginStyles.logoContainer}>
              <img src={Logo} alt="System Logo" style={loginStyles.logo} />
            </div>
            <Title style={loginStyles.welcomeTitle}>
              Student Information System
            </Title>
            <Paragraph style={loginStyles.welcomeText}>
              Welcome to our comprehensive student management platform. Access and manage student information efficiently and securely.
            </Paragraph>
          </div>
          <div style={loginStyles.rightSection}>
            <div style={loginStyles.formContainer}>
              <Title level={2} style={loginStyles.formTitle}>
                Welcome Back
              </Title>
              <Text type="secondary" style={loginStyles.formSubtitle}>
                Please sign in to your account
              </Text>
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
                    style={loginStyles.input}
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
                    style={loginStyles.input}
                  />
                </Form.Item>

                <Form.Item style={{ marginBottom: '24px' }}>
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
                <Text type="secondary" style={loginStyles.copyright}>
                  © {new Date().getFullYear()} Student Information System. All rights reserved.
                </Text>
              </div>
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default Login;