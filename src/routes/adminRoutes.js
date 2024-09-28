const express = require("express");
const { getAdminPage } = require("../controllers/adminController");
const {
  authenticateToken,
  allowedTo,
} = require("../middleware/authMiddleware");
const router = express.Router();

// Admin routes
router.get("/", authenticateToken, allowedTo("admin"), getAdminPage);

module.exports = router;
