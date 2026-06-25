const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, "title is required"],
    },
    description: {
      type: String,
      required: [true, "description is require"],
    },
    image: {
      type: String,
      required: [true, "image is require"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      require: [true, "user id is required"],
    },
    category: {
      type: String,
      default: "General",
    },
    likes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        user: {
          type: mongoose.Types.ObjectId,
          ref: "User",
          required: true,
        },
        username: {
          type: String,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

const blogModel = mongoose.model("Blog", blogSchema);

module.exports = blogModel;