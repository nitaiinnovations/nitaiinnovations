const express = require("express");
const route = express.Router();
const Users = require("../models/users");
const Blogs = require("../models/blogs");

route.delete("/", async (req, res) => {
  const { email, title } = req.body;

  try {
    // Find the user and remove the blog from the user's blogs array
    const user = await Users.findOneAndUpdate(
      { email },
      { $pull: { blogs: { title } } },
      { new: true }
    );

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    //Remove the blog from the Blogs collection if it exists there
    await Blogs.deleteOne({ title, email });

    res.status(200).send({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error });
  }
});

module.exports = route;
