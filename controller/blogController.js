const blogModel = require('../models/BlogModel');
const userModel = require('../models/UserModel');
const mongoose = require('mongoose');

// GET All Blogs
exports.getAllBlogsController = async (req, res) => {
  try {
    const blogs = await blogModel.find({}).populate('user');
    if (!blogs.length) {
      return res.status(200).send({
        success: false,
        message: 'No blogs found',
      });
    }
    return res.status(200).send({
      success: true,
      BlogCount: blogs.length,
      message: 'All blogs list',
      blogs,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: 'Server error while fetching blogs',
      error,
    });
  }
};

// Create Blog
exports.createBlogController = async (req, res) => {
  try {
    const { title, description, image, user } = req.body;

    if (!title || !description || !image || !user) {
      return res.status(400).send({
        success: false,
        message: 'All fields are required',
      });
    }

    const existingUser = await userModel.findById(user);
    if (!existingUser) {
      return res.status(404).send({
        success: false,
        message: 'User not found',
      });
    }

    const newBlog = new blogModel({ title, description, image, user });
    const session = await mongoose.startSession();
    session.startTransaction();

    await newBlog.save({ session });
    existingUser.blogs.push(newBlog);
    await existingUser.save({ session });

    await session.commitTransaction();

    return res.status(201).send({
      success: true,
      message: 'Blog created successfully',
      newBlog,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: 'Error while creating blog',
      error,
    });
  }
};

// Update Blog
exports.updateBLogController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;

    const blog = await blogModel.findByIdAndUpdate(
      id,
      { title, description, image },
      { new: true }
    );

    return res.status(200).send({
      success: true,
      message: 'Blog updated successfully',
      blog,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send({
      success: false,
      message: 'Error while updating blog',
      error,
    });
  }
};

// Get Single Blog by ID
exports.getBlogByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findById(id).populate('user');

    if (!blog) {
      return res.status(404).send({
        success: false,
        message: 'Blog not found with this ID',
      });
    }

    return res.status(200).send({
      success: true,
      message: 'Fetched single blog successfully',
      blog,
    });
  } catch (error) {
    console.error(error);
    return res.status(401).send({
      success: false,
      message: 'Error while fetching single blog',
      error,
    });
  }
};

// Delete Blog
exports.deleteBlogController = async (req, res) => {
  try {
    const blog = await blogModel.findByIdAndDelete(req.params.id).populate('user');

    if (!blog) {
      return res.status(404).send({
        success: false,
        message: 'Blog not found to delete',
      });
    }

    await blog.user.blogs.pull(blog);
    await blog.user.save();

    return res.status(200).send({
      success: true,
      message: 'Blog deleted successfully',
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send({
      success: false,
      message: 'Error while deleting blog',
      error,
    });
  }
};

// Get Blogs by User ID
exports.userBlogController = async (req, res) => {
  try {
    const userBlog = await userModel.findById(req.params.id).populate('blogs');

    if (!userBlog) {
      return res.status(404).send({
        success: false,
        message: 'Blogs not found for this user',
      });
    }

    return res.status(200).send({
      success: true,
      message: 'User blogs fetched successfully',
      userBlog,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send({
      success: false,
      message: 'Error while fetching user blogs',
      error,
    });
  }
};
