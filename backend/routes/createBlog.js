const express = require("express");
const route = express.Router();
const User = require("../models/users");
const Blogs = require("../models/blogs");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { Readable } = require("stream");

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
});

route.post("/", upload.single("image"), async (req, res) => {
  const { username, title, email, desc, firstName, lastName } = req.body;
  console.log(req.body);

  try {
    // Fetch the user to get profile image and check if the blog title exists
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Check if the title already exists in user's blogs
    const existingBlog = user.blogs.find((blog) => blog.title === title);

    if (existingBlog) {
      return res.status(400).send({
        message: "Blog title already exists for this user",
        status: "titlesSame",
      });
    }

    let imageUrl = "";
    if (req.file) {
      // Upload image to Cloudinary
      const uploadPromise = new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: "image" },
          (error, result) => {
            if (error) {
              reject(new Error("Cloudinary upload failed"));
            } else {
              resolve(result);
            }
          }
        );

        // Convert buffer to a readable stream
        const bufferStream = new Readable();
        bufferStream.push(req.file.buffer);
        bufferStream.push(null);

        // Pipe bufferStream to uploadStream
        bufferStream.pipe(uploadStream);
      });

      const result = await uploadPromise;
      imageUrl = result.secure_url;
    }

    const profileImageUrl = user.profileImageUrl || "";

    // Add the blog to user's blogs array
    user.blogs.push({
      title,
      firstName,
      lastName,
      email,
      desc,
      imageUrl,
      profileImageUrl, // Add the user's profile image to the blog
    });
    await user.save();

    // Add the blog to the global Blogs collection
    await Blogs.create({
      username,
      firstName,
      lastName,
      email,
      title,
      desc,
      imageUrl,
      profileImageUrl, // Add the user's profile image to the global blog entry
    });

    const blogs = await Blogs.find();
    res.status(200).send({ user, blogs });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message || "Internal Server Error" });
  }
});

module.exports = route;
