const Student = require('../models/student.model');

// Basic student controller with CRUD operations
const studentController = {
    // Get all students
    getAllStudents: async (req, res) => {
        try {
            const students = await Student.find();
            res.json(students);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Add a student
    addStudent: async (req, res) => {
        try {
            const student = new Student(req.body);
            await student.save();
            res.status(201).json(student);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Update a student
    updateStudent: async (req, res) => {
        try {
            const student = await Student.findOneAndUpdate(
                { idNumber: req.params.idNumber },
                req.body,
                { new: true }
            );
            
            if (!student) return res.status(404).json({ message: "Student not found" });
            res.json(student);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Delete a student
    deleteStudent: async (req, res) => {
        try {
            const student = await Student.findOneAndDelete({ idNumber: req.params.idNumber });
            if (!student) return res.status(404).json({ message: "Student not found" });
            res.json({ message: "Student deleted" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = studentController; 