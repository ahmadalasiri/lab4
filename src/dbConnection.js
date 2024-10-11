require("dotenv").config(); // Load environment variables
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/lab4"
    );
    console.log(`MongoDB Connected: ${conn.connection.name}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = { connectDB };
