const User = require('../models/user.model');

// Basic user controller with CRUD operations
const userController = {
    // Get all users
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find().select('-password');
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Add a user
    addUser: async (req, res) => {
        try {
            const user = new User(req.body);
            await user.save();
            
            const response = user.toObject();
            delete response.password;
            
            res.status(201).json(response);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Update a user
    updateUser: async (req, res) => {
        try {
            const user = await User.findOneAndUpdate(
                { userId: req.params.userId },
                req.body,
                { new: true }
            ).select('-password');
            
            if (!user) return res.status(404).json({ message: "User not found" });
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Delete a user
    deleteUser: async (req, res) => {
        try {
            const user = await User.findOneAndDelete({ userId: req.params.userId });
            if (!user) return res.status(404).json({ message: "User not found" });
            res.json({ message: "User deleted" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Login a user
    login: async (req, res) => {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username, password });
            
            if (!user) {
                return res.status(401).json({ 
                    success: false, 
                    message: "Invalid credentials" 
                });
            }
            
            const userResponse = user.toObject();
            delete userResponse.password;
            
            res.json({ success: true, user: userResponse });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = userController; 