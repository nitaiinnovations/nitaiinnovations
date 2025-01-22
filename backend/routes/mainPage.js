const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index"); // Render the views/index.ejs file
});

module.exports = router;
