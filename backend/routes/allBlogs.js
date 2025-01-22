const express = require("express");
const route = express.Router();
const Blogs = require("../models/blogs");

route.get("/", async (req, res) => {
  const blogs = await Blogs.find();
  res.send(blogs);
});

module.exports = route;
