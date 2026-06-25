const express = require('express');
const {
  getUsersController,
  registerController,
  loginController
} = require('../controller/userController');
const upload = require('../middlware/upload');

const router = express.Router();

// Get all users
router.get('/all-users', getUsersController);

// Register user with image upload
router.post('/register', upload.single("image"), registerController);

// Login user
router.post('/login', loginController);

// Optional: test upload route
router.post('/upload', upload.single('file'), (req, res) => {
  res.send('File uploaded!');
});

module.exports = router;
