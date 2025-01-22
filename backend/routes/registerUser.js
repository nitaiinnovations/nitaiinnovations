const express = require("express");
const router = express.Router();
const Users = require("../models/users");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { username, firstName, lastName, email, password } = req.body;
  try {
    // Check if the email already exists
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      console.log("Hello World ::", existingUser);

      return res.status(400).json({
        status: "error",
        error: "email already exists",
      });
    }

    // Proceed with user creation if email does not exist
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new Users({
      username,
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).send(user);
  } catch (err) {
    console.log("Error during user registration:", err);
    res.status(500).json({
      status: "error",
      error: err.message || "An error occurred during registration",
    });
  }
});

module.exports = router;
