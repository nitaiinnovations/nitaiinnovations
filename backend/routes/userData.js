const express = require("express");
const router = express.Router();
const Users = require("../models/users");

router.get("/", async (req, res) => {
  try {
    const { userName, userEmail } = req.query;
    const user = await Users.findOne({ username: userName, email: userEmail });

    if (user) {
      res.send({
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        image: user.profileImageUrl,
        email: user.email,
        totalPostsLength: user.blogs.length,
        allBlogPosts: user.blogs,
      });
    } else {
      res.send({ message: "User not found" });
    }
  } catch (err) {
    res.send({ message: "Server error", error: err.message });
  }
});

module.exports = router;
