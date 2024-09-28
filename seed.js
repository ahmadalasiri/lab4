require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./src/models/userModel");

const users = [
  {
    userID: "id1",
    name: "student1",
    role: "student1",
    password: bcrypt.hashSync("password", 10),
  },
  {
    userID: "id2",
    name: "student2",
    role: "student2",
    password: bcrypt.hashSync("password2", 10),
  },
  {
    userID: "id3",
    name: "teacher",
    role: "teacher",
    password: bcrypt.hashSync("password3", 10),
  },
  {
    userID: "admin",
    name: "admin",
    role: "admin",
    password: bcrypt.hashSync("admin", 10),
  },
];

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log("Reusing MongoDB connected");
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

const seedUsers = async () => {
  try {
    await connectDB();
    await User.deleteMany({});
    await User.insertMany(users);
    console.log("Users added successfully");
    mongoose.connection.close(); // Close the connection after seeding
  } catch (error) {
    console.error("Error adding users: ", error);
    mongoose.connection.close(); // Ensure the connection is closed in case of an error
  }
};

seedUsers();
