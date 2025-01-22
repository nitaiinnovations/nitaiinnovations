const express = require("express");
const route = express.Router();
const Users = require("../models/users");
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
const upload = multer({ storage });

route.patch("/", upload.single("image"), async (req, res) => {
  try {
    const { username, email, changetitle, currentTitle, changedesc } = req.body;
    const uploadedImage = req.file; // multer processes the file and attaches it to req.file

    console.log("Req Body: ", req.body);
    console.log("Req File: ", uploadedImage);

    // Fetch the user
    const user = await Users.findOne({ username });

    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    // Find and update the blog in user's blogs
    const blog = user.blogs.find((blog) => blog.title === currentTitle);
    if (!blog) {
      return res
        .status(404)
        .json({ status: "error", message: "Blog not found" });
    }

    if (changetitle) blog.title = changetitle;
    if (changedesc) blog.desc = changedesc;

    // Handle image upload
    if (uploadedImage) {
      const bufferStream = new Readable();
      bufferStream.push(uploadedImage.buffer);
      bufferStream.push(null);

      const uploadPromise = new Promise((resolve, reject) => {
        bufferStream.pipe(
          cloudinary.uploader.upload_stream(
            { resource_type: "image" },
            (error, result) => {
              if (error) {
                reject(new Error("Cloudinary upload failed"));
              } else {
                resolve(result.secure_url);
              }
            }
          )
        );
      });

      blog.imageUrl = await uploadPromise;
    }

    await user.save();

    // Find and update the blog in all blogs collection
    const allBlogs = await Blogs.findOne({ title: currentTitle, email });
    if (!allBlogs) {
      return res
        .status(404)
        .json({ status: "error", message: "Blog not found in all blogs" });
    }

    if (changetitle) allBlogs.title = changetitle;
    if (changedesc) allBlogs.desc = changedesc;

    // Handle image upload
    if (uploadedImage) {
      const bufferStream = new Readable();
      bufferStream.push(uploadedImage.buffer);
      bufferStream.push(null);

      const uploadPromise = new Promise((resolve, reject) => {
        bufferStream.pipe(
          cloudinary.uploader.upload_stream(
            { resource_type: "image" },
            (error, result) => {
              if (error) {
                reject(new Error("Cloudinary upload failed"));
              } else {
                resolve(result.secure_url);
              }
            }
          )
        );
      });

      allBlogs.imageUrl = await uploadPromise;
    }

    await allBlogs.save();

    res.send({ status: "ok", message: "Blog updated successfully" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ status: "error", message: "Server error: " + err.message });
  }
});

module.exports = route;
