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

const { Title, Text } = Typography;
const { Content } = Layout;

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/api/login', values);
      if (response.data.success) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        message.success('Welcome back!');
        navigate('/');
      }
    } catch (err) {
      message.error('Invalid username or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Content style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '50px 20px'
      }}>
        <Card
          style={{
            width: '100%',
            maxWidth: '420px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            borderRadius: '12px'
          }}
          bordered={false}
        >
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <Title level={2} style={{ marginBottom: '8px', color: '#1890ff' }}>
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
                style={{
                  height: '45px',
                  borderRadius: '6px',
                  fontWeight: '500'
                }}
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>

          <div style={{ 
            textAlign: 'center', 
            marginTop: '24px',
            borderTop: '1px solid #f0f0f0',
            paddingTop: '24px'
          }}>
            <Title level={4} style={{ 
              color: '#1890ff',
              marginBottom: '8px',
              fontSize: '18px'
            }}>
              Student Information System
            </Title>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              © {new Date().getFullYear()} All rights reserved
            </Text>
          </div>
        </Card>
      </Content>
    </Layout>
  );
};

export default Login; 