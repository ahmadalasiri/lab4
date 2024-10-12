const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const User = require("./userModel");
require("dotenv").config();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
};

connectDB().then(() => {
  console.log("Connected to MongoDB");
});

app.get("/", (req, res) => {
  res.redirect("/identify");
});

app.get("/identify", (req, res) => {
  res.render("identify.ejs");
});

app.post("/identify", async (req, res) => {
  const { userID, password } = req.body;

  const user = await User.findOne({
    userID: userID,
  });

  if (!user) {
    res.status(400).send("user not found");
  }

  let isCorrectPassword = await bcrypt.compare(password, user.password);
  if (!isCorrectPassword) {
    return res.status(400).send("invalid password");
  }

  const token = jwt.sign(
    { userID: user.userID, role: user.role },
    process.env.ACCESS_TOKEN_SECRET
  );

  res.cookie("access_token", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  res.redirect(`/users/${user.userID}`);
});

const authenticateToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return res.redirect("/identify");

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
    if (error) return res.redirect("/identify");
    req.user = user;
    next();
  });
};

// Authorization (User permissions)
const allowedTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(401).send("Unauthorized");
    }

    next();
  };

app.get("/granted", authenticateToken, (req, res) => {
  res.render("start.ejs");
});

app.get("/admin", authenticateToken, allowedTo("admin"), async (req, res) => {
  const users = await User.find({});
  res.render("admin.ejs", { users });
});

app.get(
  "/student1",
  authenticateToken,
  allowedTo("student1", "teacher", "admin"),
  (req, res) => {
    res.render("student1.ejs");
  }
);

app.get(
  "/student2",
  authenticateToken,
  allowedTo("student2", "teacher", "admin"),
  (req, res) => {
    res.render("student2.ejs");
  }
);

app.get(
  "/teacher",
  authenticateToken,
  allowedTo("teacher", "admin"),
  (req, res) => {
    res.render("teacher.ejs");
  }
);

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const { userID, name, password, role } = req.body;

  if (!userID || !password || !role || !name) {
    return res.status(400).send("userID, password, role and name are required");
  }

  if (role !== "student" && role !== "teacher") {
    return res.status(400).send("role must be student or teacher");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    userID,
    name,
    password: hashedPassword,
    role,
  });

  res.redirect("/identify");
});

app.get("/users/:userId", authenticateToken, async (req, res) => {
  const user = await User.findOne({ userID: req.params.userId });
  if (!user) {
    return res.status(404).send("User not found");
  }

  if (user.userID !== req.user.userID) {
    return res.status(401).send("Unauthorized");
  }

  res.render("userProfile.ejs", { user });
});

app.listen(8000, () => {
  console.log(`Server running on http//localhost:8000`);
});
