const db = require('../utils/database');

const userController = {
    getAllUsers(req, res) {
        try {
            const users = db.getUsers();
            res.json(users);
        } catch (error) {
            console.error('❌ Error fetching users:', error.message);
            res.status(500).json({ error: 'Failed to fetch users' });
        }
    },

    addUser(req, res) {
        try {
            const newUser = req.body;
            const user = db.addUser(newUser);
            console.log('👤 User added:', user.username);
            res.status(201).json(user);
        } catch (error) {
            console.error('❌ Error adding user:', error.message);
            res.status(500).json({ error: 'Failed to add user' });
        }
    },

    updateUser(req, res) {
        try {
            const { userId } = req.params;
            const updatedUser = req.body;
            
            const user = db.updateUser(userId, updatedUser);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            
            console.log('✏️ User updated:', userId);
            res.json(user);
        } catch (error) {
            console.error('❌ Error updating user:', error.message);
            res.status(500).json({ error: 'Failed to update user' });
        }
    },

    deleteUser(req, res) {
        try {
            const { userId } = req.params;
            
            const success = db.deleteUser(userId);
            if (!success) {
                return res.status(404).json({ message: 'User not found' });
            }
            
            console.log('🗑️ User deleted:', userId);
            res.json({ message: 'User deleted successfully' });
        } catch (error) {
            console.error('❌ Error deleting user:', error.message);
            res.status(500).json({ error: 'Failed to delete user' });
        }
    },

    login(req, res) {
        try {
            const { username, password } = req.body;
            
            const user = db.validateUser(username, password);
            if (user) {
                console.log('🔓 User logged in:', username);
                res.json({
                    success: true,
                    user
                });
            } else {
                console.log('🚫 Failed login attempt for username:', username);
                res.status(401).json({
                    success: false,
                    message: 'Invalid username or password'
                });
            }
        } catch (error) {
            console.error('❌ Error during login:', error.message);
            res.status(500).json({ error: 'Login failed' });
        }
    }
};

module.exports = userController; 