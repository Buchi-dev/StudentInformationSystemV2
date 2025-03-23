const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/fetchusers', userController.getAllUsers);
router.post('/adduser', userController.addUser);
router.put('/edituser/:userId', userController.updateUser);
router.delete('/deleteuser/:userId', userController.deleteUser);
router.post('/login', userController.login);

module.exports = router; 