const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Usermessage = require("../models/userMessages");
require("dotenv").config();

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PASSWORD,
  },
});
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Store the message in the database
    const userMess = await Usermessage.create({
      name,
      email,
      subject,
      message,
    });

    // Send email
    const mailOptions = {
      from: email,
      to: process.env.EMAIL_ID,
      subject: subject,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Sent mail");

    res.status(201).send(userMess);
  } catch (err) {
    console.log("Error storing user feedback or sending email:", err);
    res.status(400).json({
      status: "error",
      error: err.message || "Can't store message or send email",
    });
  }
});

module.exports = router;
