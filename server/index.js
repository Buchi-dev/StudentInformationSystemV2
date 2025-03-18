const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Define database file paths
const STUDENTS_DB_FILE = path.join(__dirname, 'students.json');
const USERS_DB_FILE = path.join(__dirname, 'users.json');

// Data storage from JSON files
let students = [];
let users = []; 

// Save database functions
const saveStudentsDatabase = () => {
  try {
    const data = JSON.stringify(students, null, 2);
    fs.writeFileSync(STUDENTS_DB_FILE, data);
    console.log('Students saved to file');
  } catch (error) {
    console.error('Error saving students:', error);
  }
};

const saveUsersDatabase = () => {
  try {
    const data = JSON.stringify(users, null, 2);
    fs.writeFileSync(USERS_DB_FILE, data);
    console.log('Users saved to file');
  } catch (error) {
    console.error('Error saving users:', error);
  }
};

// Load databases
loadDatabases();

// Function to load both databases
function loadDatabases() {
  loadStudentsDatabase();
  loadUsersDatabase();
}

// Function to load students database
function loadStudentsDatabase() {
  try {
    if (fs.existsSync(STUDENTS_DB_FILE)) {
      const data = fs.readFileSync(STUDENTS_DB_FILE, 'utf8');
      students = JSON.parse(data);
      console.log('Students loaded:', students.length, 'records');
    } else {
      console.log('No students file found, starting with empty list');
      saveStudentsDatabase(); // Create an empty file
    }
  } catch (error) {
    console.error('Error loading students:', error);
  }
}

// Function to load users database
function loadUsersDatabase() {
  try {
    if (fs.existsSync(USERS_DB_FILE)) {
      const data = fs.readFileSync(USERS_DB_FILE, 'utf8');
      users = JSON.parse(data);
      console.log('Users loaded:', users.length, 'records');
    } else {
      console.log('No users file found, starting with empty list');
      saveUsersDatabase(); // Create an empty file
    }
  } catch (error) {
    console.error('Error loading users:', error);
  }
}

// STUDENT ROUTES

// GET - Fetch all students
app.get('/api/fetchstudents', (req, res) => {
  res.json(students);
});

// POST - Add new student
app.post('/api/addstudents', (req, res) => {
  const newStudent = req.body;
  students.push(newStudent);
  saveStudentsDatabase();
  res.status(201).json(newStudent);
  console.log('Student added:', newStudent);
});

// PUT - Edit student
app.put('/api/editstudent/:idNumber', (req, res) => {
  const { idNumber } = req.params;
  const updatedStudent = req.body;
  
  const index = students.findIndex(student => student.idNumber === idNumber);
  if (index === -1) {
    return res.status(404).json({ message: 'Student not found' });
  }
  
  students[index] = updatedStudent;
  saveStudentsDatabase();
  res.json(updatedStudent);
  console.log('Student updated');
});

// DELETE - Delete student
app.delete('/api/deletestudent/:idNumber', (req, res) => {
  const { idNumber } = req.params;
  
  const index = students.findIndex(student => student.idNumber === idNumber);
  if (index === -1) {
    return res.status(404).json({ message: 'Student not found' });
  }
  
  students = students.filter(student => student.idNumber !== idNumber);
  saveStudentsDatabase();
  res.json({ message: 'Student deleted' });
});

// USER ROUTES

// GET - Fetch all users
app.get('/api/fetchusers', (req, res) => {
  res.json(users);
});

// POST - Add new user
app.post('/api/adduser', (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  saveUsersDatabase();
  res.status(201).json(newUser);
  console.log('User added');
});

// PUT - Edit user
app.put('/api/edituser/:userId', (req, res) => {
  const { userId } = req.params;
  const updatedUser = req.body;
  
  const index = users.findIndex(user => user.userId === userId);
  if (index === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  users[index] = updatedUser;
  saveUsersDatabase();
  res.json(updatedUser);
  console.log('User updated');
});

// DELETE - Delete user
app.delete('/api/deleteuser/:userId', (req, res) => {
  const { userId } = req.params;
  
  const index = users.findIndex(user => user.userId === userId);
  if (index === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  users = users.filter(user => user.userId !== userId);
  saveUsersDatabase();
  res.json({ message: 'User deleted' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Student Information System API is ready!`);
});
