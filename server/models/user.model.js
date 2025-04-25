const mongoose = require("mongoose")

// Basic User Schema
const UserSchema = new mongoose.Schema({
    userId: String,
    firstName: String,
    lastName: String,
    middleName: String,
    username: String,
    password: String,
    role: String
}, { collection: "user-data" })

module.exports = mongoose.model("User", UserSchema)
