const userModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const cloudinary = require("../config/cloudinary");

// Helper function to upload file buffer to Cloudinary
const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "blog_profiles" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    uploadStream.end(fileBuffer);
  });
};

// Register User
exports.registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    let image = null;
    if (req.file) {
      try {
        const uploadResult = await uploadToCloudinary(req.file.buffer);
        image = uploadResult.secure_url;
      } catch (uploadError) {
        console.error("Cloudinary Upload Error:", uploadError);
        return res.status(500).send({
          success: false,
          message: "Failed to upload image to Cloudinary",
          error: uploadError,
        });
      }
    }

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

// Get Single User Details
exports.getUserByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id).select("-password");
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "User profile fetched",
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error in fetching user details",
      error,
    });
  }
};

// Update User Profile
exports.updateUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password } = req.body;

    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    if (username) user.username = username;
    if (email) user.email = email;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    if (req.file) {
      try {
        const uploadResult = await uploadToCloudinary(req.file.buffer);
        user.image = uploadResult.secure_url;
      } catch (uploadError) {
        console.error("Cloudinary Profile Update Error:", uploadError);
        return res.status(500).send({
          success: false,
          message: "Failed to upload new profile image",
          error: uploadError,
        });
      }
    }

    await user.save();

    // Exclude password from response
    const { password: _, ...rest } = user._doc;

    return res.status(200).send({
      success: true,
      message: "Profile updated successfully",
      user: rest,
    });
  } catch (error) {
    console.error("Update Profile Error:", error);
    return res.status(500).send({
      success: false,
      message: "Error in updating user profile",
      error,
    });
  }
};

