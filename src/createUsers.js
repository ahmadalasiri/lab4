require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./userModel");

const users = [
  {
    userID: "id1",
    name: "user1",
    role: "student",
    password: bcrypt.hashSync("password", 10),
  },
  {
    userID: "id2",
    name: "user2",
    role: "student",
    password: bcrypt.hashSync("password2", 10),
  },
  {
    userID: "id3",
    name: "user3",
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

const createUsers = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  await User.deleteMany({});
  await User.insertMany(users);

  console.log("Users added successfully");
};

createUsers();
