const express = require("express");
const { login, register } = require("../controllers/authController");
const router = express.Router();

// Routes
router.get("/", (req, res) => res.render("identify"));
router.post("/", login);
router.get("/register", (req, res) => res.render("register", { error: null }));
router.post("/register", register);

module.exports = router;
