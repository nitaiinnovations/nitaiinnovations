const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { Readable } = require("stream");
const route = express.Router();
const Users = require("../models/users");
const Blogs = require("../models/blogs");

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

route.patch("/", upload.single("image"), async (req, res) => {
  try {
    const { username, originalEmail, firstName, lastName, email } = req.body;
    let profileImageUrl = req.body.profileImageUrl;

    if (req.file) {
      // Upload image to Cloudinary
      const bufferStream = new Readable();
      bufferStream.push(req.file.buffer);
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

      profileImageUrl = await uploadPromise;
    }

    const user = await Users.findOne({ username, email: originalEmail });

    if (user) {
      // Update user profile details
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      if (profileImageUrl) {
        user.profileImageUrl = profileImageUrl; // Update image URL
      }

      await user.save();

      // Update the profileImageUrl in all blogs of the user
      await Blogs.updateMany(
        { username }, // Find blogs by username
        { $set: { profileImageUrl } } // Update the profileImageUrl field
      );

      res.status(200).send(user);
    } else {
      res.status(404).send({ status: "error", message: "User not found" });
    }
  } catch (err) {
    console.error("Server error:", err);
    res
      .status(500)
      .send({ status: "error", message: "Server error: " + err.message });
  }
});

module.exports = route;
