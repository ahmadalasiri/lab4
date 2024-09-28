const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const accessTokenCookieOptions = {
  httpOnly: true, // client side js cannot access the cookie
  maxAge: 30 * 24 * 60 * 60 * 1000, // one month
  secure: process.env.NODE_ENV !== "development", // cookie only works in https (secure is true if NODE_ENV is production and false if NODE_ENV is development)
  sameSite: "strict", //or "strict"
};

// Handle user login
const login = async (req, res) => {
  const { userID, password } = req.body;
  const user = await User.findOne({ userID });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send("Invalid credentials");
  }

  const token = jwt.sign(
    { userID: user.userID, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1h" }
  );
  console.log("token", token);
  res.cookie("access_token", token, accessTokenCookieOptions);

  res.status(200).json({ token, userID, message: "Login successful" });
};

// Handle user registration
const register = async (req, res) => {
  const { userID, name, password, role } = req.body;
  if (role !== "student" && role !== "teacher") {
    return res.status(400).send("Invalid role");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ userID, name, role, password: hashedPassword });

  try {
    await newUser.save();
    res.redirect("/identify");
  } catch (err) {
    res.status(500).send("Error registering user");
  }
};

module.exports = { login, register };
