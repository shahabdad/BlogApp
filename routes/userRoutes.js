

// // // const express = require('express');
// // // const { getUsersController, registerController, loginController } = require('../controller/userController');
// // // const upload = require("../middlware/upload");

// // // const router = express.Router();

// // // // GET route to fetch all users
// // // router.get('/all-users', getUsersController); 

// // // // POST route for user registration (with file upload)
// // // router.post('/register', upload.single("image"), registerController);

// // // // POST route for user login
// // // router.post('/login', loginController);

// // // module.exports = router;



// // const userModel = require("../models/UserModel");
// // const bcrypt = require("bcrypt");

// // // Register User
// // exports.registerController = async (req, res) => {
// //   try {
// //     const { username, email, password } = req.body;

// //     if (!username || !email || !password) {
// //       return res.status(400).send({
// //         success: false,
// //         message: "Please fill all fields",
// //       });
// //     }

// //     const existingUser = await userModel.findOne({ email });
// //     if (existingUser) {
// //       return res.status(401).send({
// //         success: false,
// //         message: "User already exists",
// //       });
// //     }

// //     const hashedPassword = await bcrypt.hash(password, 10);
// //     const user = new userModel({ username, email, password: hashedPassword });
// //     await user.save();

// //     return res.status(201).send({
// //       success: true,
// //       message: "New User Created",
// //       user,
// //     });
// //   } catch (error) {
// //     console.error(error.message || error);
// //     return res.status(500).send({
// //       message: "Error in registration callback",
// //       success: false,
// //       error,
// //     });
// //   }
// // };

// // // Get All Users
// // exports. getUsersController= async (req, res) => {
// //   try {
// //     const users = await userModel.find();
// //     return res.status(200).send({
// //       usersCount: users.length,
// //       success: true,
// //       message: "All users data",
// //       users,
// //     });
// //   } catch (error) {
// //     console.error(error.message || error);
// //     return res.status(500).send({
// //       success: false,
// //       message: "Error in fetching all users",
// //       error,
// //     });
// //   }
// // };

// // // Login User
// // exports.loginController = async (req, res) => {
// //   try {
// //     const { email, password } = req.body;

// //     if (!email) {
// //       return res.status(400).send({
// //         success: false,
// //         message: "Email is required",
// //       });
// //     }

// //     if (!password) {
// //       return res.status(400).send({
// //         success: false,
// //         message: "Password is required",
// //       });
// //     }

// //     const user = await userModel.findOne({ email });
// //     if (!user) {
// //       return res.status(401).send({
// //         success: false,
// //         message: "Invalid email or password",
// //       });
// //     }

// //     const isMatch = await bcrypt.compare(password, user.password);
// //     if (!isMatch) {
// //       return res.status(401).send({
// //         success: false,
// //         message: "Invalid email or password",
// //       });
// //     }

// //     const { password: _, ...rest } = user._doc;
// //     return res.status(200).send({
// //       success: true,
// //       message: "User logged in successfully",
// //       user: rest,
// //     });
// //   } catch (error) {
// //     console.error(error.message || error);
// //     return res.status(500).send({
// //       success: false,
// //       message: "Error in login callback",
// //       error,
// //     });
// //   }
// // };


// const express = require('express');
// const {
//   getUsersController,
//   registerController,
//   loginController
// } = require('../controller/userController');
// // const upload = require("../middleware/upload");

// const router = express.Router();

// // Get all users
// router.get('/all-users', getUsersController);

// // Register user with image upload
// router.post('/register', upload.single("image"), registerController);

// // Login user
// router.post('/login', loginController);
// const upload = require('../middleware/upload');

// router.post('/upload', upload.single('file'), (req, res) => {
//   res.send('File uploaded!');
// });

// module.exports = router;


const express = require('express');
const {
  getUsersController,
  registerController,
  loginController
} = require('../controller/userController');
const upload = require('../middlware/upload'); // ✅ FIXED: moved to top

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
