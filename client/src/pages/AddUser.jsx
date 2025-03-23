import { useState, useEffect, useRef } from 'react';
import { Form, Input, Button, Table, Space, Modal, message, Typography, Card, Select } from 'antd';
import { DeleteOutlined, EditOutlined, UserAddOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import axios from 'axios';
const { Title } = Typography;

const API_BASE_URL = 'http://localhost:3000/api';

const AddUser = () => {
  const [form] = Form.useForm();
  const formRef = useRef(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setDataLoading(true);
      console.log('Fetching users from API...');
      const response = await axios.get(`${API_BASE_URL}/fetchusers`);
      console.log('Fetched users:', response.data);
      setUsers(response.data);
    } catch (err) {
      console.error('Failed to load users:', err);
      message.error('Could not load users from file system');
    } finally {
      setDataLoading(false);
    }
  };

  // Add a new user to the database
  const addUser = async (values) => {
    try {
      setIsLoading(true);
      console.log('Adding new user:', values);
      await axios.post(`${API_BASE_URL}/adduser`, values);
      message.success('User added successfully and saved to file system');
      fetchUsers();
      setIsModalVisible(false);
      form.resetFields();
    } catch (err) {
      console.error('Error adding user:', err);
      message.error('Failed to add user to file system');
    } finally {
      setIsLoading(false);
    }
  };

  // Update an existing user's information
  const updateUser = async (values) => {
    try {
      setIsLoading(true);
      console.log('Updating user:', values);
      await axios.put(`${API_BASE_URL}/edituser/${selectedUser.userId}`, values);
      message.success('User updated successfully and saved to file system');
      fetchUsers();
      setIsModalVisible(false);
    } catch (err) {
      console.error('Error updating user:', err);
      message.error('Failed to update user in file system');
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a user from the database
  const deleteUser = async (id) => {
    try {
      setIsLoading(true);
      console.log('Deleting user with ID:', id);
      await axios.delete(`${API_BASE_URL}/deleteuser/${id}`);
      message.success('User deleted successfully from file system');
      fetchUsers();
    } catch (err) {
      console.error('Error deleting user:', err);
      message.error('Failed to delete user from file system');
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToError = () => {
    const form = formRef.current;
    if (form) {
      const errorField = form.getFieldsError().find(({ errors }) => errors.length);
      if (errorField) {
        console.log('Scrolling to error field:', errorField.name);
        form.scrollToField(errorField.name);
      }
    }
  };

  // Focus on the ID input field
  const focusIdField = () => {
    const idField = form.getFieldInstance('userId');
    if (idField) {
      console.log('Focusing on ID field');
      idField.focus();
    }
  };

  // Handle form submission (both add and update)
  const handleSubmit = async (values) => {
    try {
      console.log('Form submitted with values:', values);
      if (isEditing) {
        await updateUser(values);
      } else {
        await addUser(values);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      scrollToError();
    }
  };

  // Show modal for adding a new user
  const showAddModal = () => {
    console.log('Opening add user modal');
    setIsEditing(false);
    form.resetFields();
    setIsModalVisible(true);
    // Small delay to ensure modal is rendered before focusing
    setTimeout(focusIdField, 100);
  };

  // Show modal for editing an existing user
  const showEditModal = (user) => {
    console.log('Opening edit modal for user:', user);
    setIsEditing(true);
    setSelectedUser(user);
    form.setFieldsValue(user);
    setIsModalVisible(true);
  };

  const columns = [
    { title: 'User ID', dataIndex: 'userId', key: 'userId' },
    { title: 'First Name', dataIndex: 'firstName', key: 'firstName' },
    { title: 'Last Name', dataIndex: 'lastName', key: 'lastName' },
    { title: 'Middle Name', dataIndex: 'middleName', key: 'middleName' },
    { title: 'Username', dataIndex: 'username', key: 'username' },
    { 
      title: 'Actions', 
      key: 'actions', 
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => showEditModal(record)}
            size="small"
          >
            Edit
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => deleteUser(record.userId)}
            size="small"
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Card style={{ marginBottom: '20px' }}>
        <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <Title level={3}>User Management System</Title>
          </div>
          <Button 
            type="primary" 
            icon={<UserAddOutlined />} 
            onClick={showAddModal}
          >
            Add User
          </Button>
        </Space>
      </Card>

      <Card bodyStyle={{ padding: 0 }}>
        <Table
          columns={columns}
          dataSource={users}
          rowKey="userId"
          pagination={{ pageSize: 10 }}
          loading={dataLoading}
          scroll={{ y: 'calc(100vh - 300px)' }}
        />
      </Card>

      <Modal
        title={isEditing ? "Edit User" : "Add New User"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          ref={formRef}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item 
            label="User ID" 
            name="userId"
            rules={[{ required: true, message: 'Please enter user ID' }]}
          >
            <Input placeholder="Enter user ID" />
          </Form.Item>

          <Form.Item 
            label="First Name" 
            name="firstName"
            rules={[{ required: true, message: 'Please enter first name' }]}
          >
            <Input placeholder="Enter first name" />
          </Form.Item>

          <Form.Item 
            label="Last Name" 
            name="lastName"
            rules={[{ required: true, message: 'Please enter last name' }]}
          >
            <Input placeholder="Enter last name" />
          </Form.Item>

          <Form.Item 
            label="Middle Name" 
            name="middleName"
          >
            <Input placeholder="Enter middle name" />
          </Form.Item>

          <Form.Item 
            label="Username" 
            name="username"
            rules={[{ required: true, message: 'Please enter username' }]}
          >
            <Input placeholder="Enter username" />
          </Form.Item>

          <Form.Item 
            label="Password" 
            name="password"
            rules={[{ required: true, message: 'Please enter password' }]}
          >
            <Input.Password
              placeholder="Enter password"
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={isLoading}>
                {isEditing ? 'Update User' : 'Add User'}
              </Button>
              <Button onClick={() => setIsModalVisible(false)} disabled={isLoading}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddUser;