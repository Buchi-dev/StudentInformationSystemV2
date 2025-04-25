const mongoose = require("mongoose")

// Basic Student Schema
const StudentSchema = new mongoose.Schema({
    idNumber: String,
    firstName: String,
    lastName: String,
    middleName: String,
    course: String,
    year: String,
    section: String
})

module.exports = mongoose.model("Student", StudentSchema, "students")