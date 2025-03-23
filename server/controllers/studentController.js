const db = require('../utils/database');

const studentController = {
    getAllStudents(req, res) {
        try {
            const students = db.getStudents();
            res.json(students);
        } catch (error) {
            console.error('❌ Error fetching students:', error.message);
            res.status(500).json({ error: 'Failed to fetch students' });
        }
    },

    addStudent(req, res) {
        try {
            const newStudent = req.body;
            const student = db.addStudent(newStudent);
            console.log('👨‍🎓 Student added:', student.idNumber);
            res.status(201).json(student);
        } catch (error) {
            console.error('❌ Error adding student:', error.message);
            res.status(500).json({ error: 'Failed to add student' });
        }
    },

    updateStudent(req, res) {
        try {
            const { idNumber } = req.params;
            const updatedStudent = req.body;
            
            const student = db.updateStudent(idNumber, updatedStudent);
            if (!student) {
                return res.status(404).json({ message: 'Student not found' });
            }
            
            console.log('✏️ Student updated:', idNumber);
            res.json(student);
        } catch (error) {
            console.error('❌ Error updating student:', error.message);
            res.status(500).json({ error: 'Failed to update student' });
        }
    },

    deleteStudent(req, res) {
        try {
            const { idNumber } = req.params;
            
            const success = db.deleteStudent(idNumber);
            if (!success) {
                return res.status(404).json({ message: 'Student not found' });
            }
            
            console.log('🗑️ Student deleted:', idNumber);
            res.json({ message: 'Student deleted successfully' });
        } catch (error) {
            console.error('❌ Error deleting student:', error.message);
            res.status(500).json({ error: 'Failed to delete student' });
        }
    }
};

module.exports = studentController; 