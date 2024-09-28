const express = require("express");
const { getUserProfile } = require("../controllers/userController");
const { authenticateToken } = require("../middleware/authMiddleware");
const router = express.Router();

// User routes
router.get("/:userId", authenticateToken, getUserProfile);

// Granted route - protected
router.get("/granted", authenticateToken, (req, res) => {
  res.render("granted", { user: req.user }); // Pass user info if needed
});

module.exports = router;
