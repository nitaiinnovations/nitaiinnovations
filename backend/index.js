const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

// Import routes
const registerUser = require("./routes/registerUser");
const loginUser = require("./routes/loginUser");
const createBlog = require("./routes/createBlog");
const allBlogs = require("./routes/allBlogs");
const userData = require("./routes/userData");
const editBlog = require("./routes/editBlog");
const updateUser = require("./routes/updateUser");
const deleteBlog = require("./routes/deleteBlog");
const userMessage = require("./routes/userMessages");

const app = express();

// CORS configuration
const corsOptions = {
  origin: ["https://nitaiinnovations.netlify.app", process.env.FRONTEND_URL],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

app.use("/uploads", express.static(path.join(__dirname, "./uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Not Connected to MongoDB: ", err));

// Routes
app.get("/", (req, res) => {
  res.render("index");
});
app.use("/registerUser", registerUser);
app.use("/loginUser", loginUser);
app.use("/createBlog", createBlog);
app.use("/allBlogs", allBlogs);
app.use("/getUserData", userData);
app.use("/editBlog", editBlog);
app.use("/updateUser", updateUser);
app.use("/deleteBlog", deleteBlog);
app.use("/userMessages", userMessage);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error from backend: ", err.stack);
  res.status(err.status || 500).json({ error: err.message });
});

app.listen(3000, () => {
  console.log("Server started on port : 3000 ");
});

module.exports = app;
