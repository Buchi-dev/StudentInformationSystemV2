const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/fetchstudents', studentController.getAllStudents);
router.post('/addstudents', studentController.addStudent);
router.put('/editstudent/:idNumber', studentController.updateStudent);
router.delete('/deletestudent/:idNumber', studentController.deleteStudent);

module.exports = router; 