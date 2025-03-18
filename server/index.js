const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const fileServer = require('file-server'); // Add file-server package

const app = express();

// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Initialize file server
const server = fileServer.createServer({
  root: __dirname,
  cache: false // Disable caching for development
});

// Define database file paths
const STUDENTS_DB_FILE = path.join(__dirname, 'students.json');
const USERS_DB_FILE = path.join(__dirname, 'users.json');

// Temporary data storage
let students = [];
let users = []; 

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
      server.serveFile(STUDENTS_DB_FILE, function(err, data) {
        if (err) {
          console.error('Error loading students database:', err);
          return;
        }
        students = JSON.parse(data);
        console.log('Students database loaded:', students.length, 'records');
      });
    } else {
      console.log('Students database file not found, starting with empty database');
      saveStudentsDatabase(); // Create an empty file
    }
  } catch (error) {
    console.error('Error loading students database:', error);
  }
}

// Function to load users database
function loadUsersDatabase() {
  try {
    if (fs.existsSync(USERS_DB_FILE)) {
      server.serveFile(USERS_DB_FILE, function(err, data) {
        if (err) {
          console.error('Error loading users database:', err);
          return;
        }
        users = JSON.parse(data);
        console.log('Users database loaded:', users.length, 'records');
      });
    } else {
      console.log('Users database file not found, starting with empty database');
      saveUsersDatabase(); // Create an empty file
    }
  } catch (error) {
    console.error('Error loading users database:', error);
  }
}

// Save database functions
const saveStudentsDatabase = () => {
  try {
    const data = JSON.stringify(students, null, 2);
    server.saveFile(STUDENTS_DB_FILE, data, function(err) {
      if (err) {
        console.error('Error saving students database:', err);
        return;
      }
      console.log('Students database saved successfully');
    });
  } catch (error) {
    console.error('Error preparing students database for save:', error);
  }
};

const saveUsersDatabase = () => {
  try {
    const data = JSON.stringify(users, null, 2);
    server.saveFile(USERS_DB_FILE, data, function(err) {
      if (err) {
        console.error('Error saving users database:', err);
        return;
      }
      console.log('Users database saved successfully');
    });
  } catch (error) {
    console.error('Error preparing users database for save:', error);
  }
};

// GET - Fetch all students
app.get('/api/fetchstudents', (req, res) => {
  res.json(students);
});

// POST - Add new student
app.post('/api/addstudents', (req, res) => {
  const newStudent = req.body;
  students.push(newStudent);
  saveStudentsDatabase(); // Save changes to file
  res.status(201).json(newStudent);
  console.log('Student added successfully:', newStudent);
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
  saveStudentsDatabase(); // Save changes to file
  res.json(updatedStudent);
  console.log('Student updated successfully:', updatedStudent);
});

// DELETE - Delete student
app.delete('/api/deletestudent/:idNumber', (req, res) => {
  const { idNumber } = req.params;
  
  const index = students.findIndex(student => student.idNumber === idNumber);
  if (index === -1) {
    return res.status(404).json({ message: 'Student not found' });
  }
  
  students = students.filter(student => student.idNumber !== idNumber);
  saveStudentsDatabase(); // Save changes to file
  res.json({ message: 'Student deleted successfully' });
});

// User Management API Endpoints

// GET - Fetch all users
app.get('/api/fetchusers', (req, res) => {
  res.json(users);
});

// POST - Add new user
app.post('/api/adduser', (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  saveUsersDatabase(); // Save changes to file
  res.status(201).json(newUser);
  console.log('User added successfully:', newUser);
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
  saveUsersDatabase(); // Save changes to file
  res.json(updatedUser);
  console.log('User updated successfully:', updatedUser);
});

// DELETE - Delete user
app.delete('/api/deleteuser/:userId', (req, res) => {
  const { userId } = req.params;
  
  const index = users.findIndex(user => user.userId === userId);
  if (index === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  users = users.filter(user => user.userId !== userId);
  saveUsersDatabase(); // Save changes to file
  res.json({ message: 'User deleted successfully' });
});

// Serve static files from the data directory
app.use('/data', express.static(path.join(__dirname, 'data')));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Using file-server for database operations`);
  console.log(`Students database file: ${STUDENTS_DB_FILE}`);
  console.log(`Users database file: ${USERS_DB_FILE}`);
});
