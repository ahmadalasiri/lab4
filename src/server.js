require("dotenv").config();
const express = require("express");
const { connectDB } = require("./dbConnection");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const { authenticateToken, allowedTo } = require("./middleware/authMiddleware");

connectDB().then(() => {
  console.log("Connected to DB");
});

// Initialize Express app
const app = express();
app.use(cookieParser());

// Middleware
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // To parse incoming JSON requests
app.use(express.static("public")); // Serve static files

// Routes (endpoints)
app.use("/identify", authRoutes);
app.use("/users", userRoutes);
app.use("/admin", adminRoutes);
app.get(
  "/student1",
  authenticateToken,
  allowedTo("student1", "teacher", "admin"),
  (req, res) => {
    res.render("student1", { user: req.user });
  }
);
app.get(
  "/student2",
  authenticateToken,
  allowedTo("student2", "teacher", "admin"),
  (req, res) => {
    res.render("student2", { user: req.user });
  }
);

app.get(
  "/teacher",
  authenticateToken,
  allowedTo("teacher", "admin"),
  (req, res) => {
    res.render("teacher", { user: req.user });
  }
);
app.get("/granted", authenticateToken, (req, res) => {
  console.log("req.user", req.user);
  res.render("granted", { user: req.user }); // Pass user info if needed
});

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/logout", (req, res) => {
  res.clearCookie("access_token");
  res.redirect("/");
});

// Global error handling (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(400).send(`${err.message}`);
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
