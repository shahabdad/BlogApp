
// const userModel = require("../models/UserModel");
// const bcrypt = require("bcrypt");

// // Register User
// exports.registerController = async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     if (!username || !email || !password) {
//       return res.status(400).send({
//         success: false,
//         message: "Please fill all fields",
//       });
//     }

//     const existingUser = await userModel.findOne({ email });
//     if (existingUser) {
//       return res.status(401).send({
//         success: false,
//         message: "User already exists",
//       });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new userModel({ username, email, password: hashedPassword });
//     await user.save();

//     return res.status(201).send({
//       success: true,
//       message: "New User Created",
//       user,
//     });
//   } catch (error) {
//     console.error(error.message || error);
//     return res.status(500).send({
//       message: "Error in registration callback",
//       success: false,
//       error,
//     });
//   }
// };

// // Get All Users
// exports. getUsersController= async (req, res) => {
//   try {
//     const users = await userModel.find();
//     return res.status(200).send({
//       usersCount: users.length,
//       success: true,
//       message: "All users data",
//       users,
//     });
//   } catch (error) {
//     console.error(error.message || error);
//     return res.status(500).send({
//       success: false,
//       message: "Error in fetching all users",
//       error,
//     });
//   }
// };

// // Login User
// exports.loginController = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email) {
//       return res.status(400).send({
//         success: false,
//         message: "Email is required",
//       });
//     }

//     if (!password) {
//       return res.status(400).send({
//         success: false,
//         message: "Password is required",
//       });
//     }

//     const user = await userModel.findOne({ email });
//     if (!user) {
//       return res.status(401).send({
//         success: false,
//         message: "Invalid email or password",
//       });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).send({
//         success: false,
//         message: "Invalid email or password",
//       });
//     }

//     const { password: _, ...rest } = user._doc;
//     return res.status(200).send({
//       success: true,
//       message: "User logged in successfully",
//       user: rest,
//     });
//   } catch (error) {
//     console.error(error.message || error);
//     return res.status(500).send({
//       success: false,
//       message: "Error in login callback",
//       error,
//     });
//   }
// };

const userModel = require("../models/UserModel");
const bcrypt = require("bcrypt");

// Register User
exports.registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!username || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please fill all fields",
      });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(401).send({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userModel({
      username,
      email,
      password: hashedPassword,
      image,
    });

    await user.save();

    return res.status(201).send({
      success: true,
      message: "New User Created",
      user,
    });
  } catch (error) {
    console.error(error.message || error);
    return res.status(500).send({
      success: false,
      message: "Error in registration callback",
      error,
    });
  }
};

// Get All Users
exports.getUsersController = async (req, res) => {
  try {
    const users = await userModel.find();
    return res.status(200).send({
      usersCount: users.length,
      success: true,
      message: "All users data",
      users,
    });
  } catch (error) {
    console.error(error.message || error);
    return res.status(500).send({
      success: false,
      message: "Error in fetching all users",
      error,
    });
  }
};

// Login User
exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    const { password: _, ...rest } = user._doc;

    return res.status(200).send({
      success: true,
      message: "User logged in successfully",
      user: rest,
    });
  } catch (error) {
    console.error(error.message || error);
    return res.status(500).send({
      success: false,
      message: "Error in login callback",
      error,
    });
  }
};
