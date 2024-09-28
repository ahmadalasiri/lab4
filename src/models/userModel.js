const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema({
  userID: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["student", "student1", "student2", "teacher", "admin"],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Create the User model from the schema
const User = mongoose.model("User", userSchema);

// Export the User model
module.exports = User;
