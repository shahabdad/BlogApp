const express = require('express');
const { getUsersController, registerController, loginController } = require('../controller/userController');

const router = express.Router();
// GET route to fetch all users
router.get('/all-users', getUsersController); 
// POST route for user registration
router.post('/register', registerController);
// POST route for user login
router.post('/login', loginController);

module.exports = router;
