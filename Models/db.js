const mongoose = require("mongoose");

mongodb_uri = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(mongodb_uri);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
