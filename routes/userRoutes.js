const express = require('express');
const {
  getUsersController,
  registerController,
  loginController,
  getUserByIdController,
  updateUserController
} = require('../controller/userController');
const upload = require('../middlware/upload');
const cloudinary = require('../config/cloudinary');

const router = express.Router();

// Get all users
router.get('/all-users', getUsersController);

// Register user with image upload
router.post('/register', upload.single("image"), registerController);

// Login user
router.post('/login', loginController);

// Get single user details
router.get('/profile/:id', getUserByIdController);

// Update user profile
router.put('/update-profile/:id', upload.single("image"), updateUserController);

// Optional: test upload route
router.post('/upload', upload.single('file'), (req, res) => {
  res.send('File uploaded!');
});

// Diagnostic route to test Cloudinary credentials
router.get("/cloudinary-test", async (req, res) => {
  try {
    const result = await cloudinary.api.ping();
    res.json(result);
  } catch (error) {
    console.error("Cloudinary ping test failed:", error);
    res.status(500).json(error);
  }
});

module.exports = router;
