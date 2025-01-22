const mongoose = require("mongoose");

// Define the Blog schema
const blogsSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  firstName: {
    type: String,
    require: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    sparse: true,
  },
  desc: {
    type: String,
    required: true,
    trim: true,
  },
  profileImageUrl: {
    type: String,
    default: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  },
  imageUrl: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Blogs model
const Blogs = mongoose.model("Blogs", blogsSchema);

module.exports = Blogs;
