import { useState, useEffect, useRef } from 'react';
import { Form, Input, Button, Table, Space, Modal, message, Typography, Card } from 'antd';
import { DeleteOutlined, EditOutlined, UserAddOutlined } from '@ant-design/icons';
import axios from 'axios';
import { addStudentStyles } from '../styles/pages';
const { Title } = Typography;

const API_BASE_URL = 'http://localhost:3000/api';
const COURSES = [
  'Computer Science',
  'Information Technology',
  'Business Administration',
  'Engineering'
];

const YEAR_LEVELS = [1, 2, 3, 4, 5];

const AddStudent = () => {
  const [form] = Form.useForm();
  const formRef = useRef(null);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      console.log('Fetching students from API...');
      const response = await axios.get(`${API_BASE_URL}/fetchstudents`);
      console.log('Fetched students:', response.data);
      setStudents(response.data);
    } catch (err) {
      console.error('Failed to load students:', err);
      message.error('Could not load students');
    }
  };

  const addStudent = async (values) => {
    try {
      console.log('Adding new student:', values);
      await axios.post(`${API_BASE_URL}/addstudents`, values);
      message.success('Student added successfully');
      fetchStudents();
      setIsModalVisible(false);
      form.resetFields();
    } catch (err) {
      console.error('Error adding student:', err);
      message.error('Failed to add student');
    }
  };

  const updateStudent = async (values) => {
    try {
      console.log('Updating student:', values);
      await axios.put(`${API_BASE_URL}/editstudent/${selectedStudent.idNumber}`, values);
      message.success('Student updated successfully');
      fetchStudents();
      setIsModalVisible(false);
    } catch (err) {
      console.error('Error updating student:', err);
      message.error('Failed to update student');
    }
  };

  const deleteStudent = async (id) => {
    try {
      console.log('Deleting student with ID:', id);
      await axios.delete(`${API_BASE_URL}/deletestudent/${id}`);
      message.success('Student deleted successfully');
      fetchStudents();
    } catch (err) {
      console.error('Error deleting student:', err);
      message.error('Failed to delete student');
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

  const focusIdField = () => {
    const idField = form.getFieldInstance('idNumber');
    if (idField) {
      console.log('Focusing on ID field');
      idField.focus();
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (isEditing) {
        await updateStudent(values);
      } else {
        await addStudent(values);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      scrollToError();
    }
  };

  const showAddModal = () => {
    setIsEditing(false);
    form.resetFields();
    setIsModalVisible(true);
    setTimeout(focusIdField, 100);
  };

  const showEditModal = (student) => {
    setIsEditing(true);
    setSelectedStudent(student);
    form.setFieldsValue(student);
    setIsModalVisible(true);
  };

  const columns = [
    { title: 'ID', dataIndex: 'idNumber', key: 'idNumber' },
    { title: 'Name', key: 'name', render: (_, record) => `${record.firstName} ${record.lastName}` },
    { title: 'Course', dataIndex: 'course', key: 'course' },
    { title: 'Year', dataIndex: 'year', key: 'year' },
    { title: 'Actions', key: 'actions', render: (_, record) => (
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
            onClick={() => deleteStudent(record.idNumber)}
            size="small"
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={addStudentStyles.container}>
      <Card style={addStudentStyles.headerCard}>
        <Space style={addStudentStyles.headerSpace}>
          <Title level={3}>Student Management Sytem</Title>
          <Button 
            type="primary" 
            icon={<UserAddOutlined />} 
            onClick={showAddModal}
          >
            Add Student
          </Button>
        </Space>
      </Card>

      <Card bodyStyle={addStudentStyles.tableCard}>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '500px' }}>
          <Table
            columns={columns}
            dataSource={students}
            rowKey="idNumber"
            pagination={{ 
              pageSize: 8,
              position: ['bottomCenter'],
              showSizeChanger: false,
              style: { 
                marginBottom: 0,
                padding: '16px 0',
                background: '#fff',
                borderTop: '1px solid #f0f0f0'
              }
            }}
            style={{
              width: '100%',
              flex: 1
            }}
          />
        </div>
      </Card>

      <Modal
        title={isEditing ? "Edit Student" : "Add New Student"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={addStudentStyles.modalWidth.width}
      >
        <Form
          form={form}
          ref={formRef}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item 
            label="Student ID" 
            name="idNumber"
            rules={[{ required: true, message: 'Please enter student ID' }]}
          >
            <Input placeholder="Enter student ID" />
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
            label="Course" 
            name="course"
            rules={[{ required: true, message: 'Please enter a course' }]}
          >
            <Input placeholder="Enter course name" />
          </Form.Item>

          <Form.Item 
            label="Year Level" 
            name="year"
            rules={[{ required: true, message: 'Please enter year level' }]}
          >
            <Input placeholder="Enter year level (1-5)" />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {isEditing ? 'Update Student' : 'Add Student'}
              </Button>
              <Button onClick={() => setIsModalVisible(false)}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddStudent;
