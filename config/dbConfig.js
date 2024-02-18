const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      serverSelectionTimeoutMS: 10000, // Set a longer timeout (in milliseconds)
    });
    console.log(`Connected to MongoDB Database ${mongoose.connection.host}`);
  } catch (error) {
    console.error(`Mongo DB Connection Error ${error}`);
  }
};

module.exports = connectDB;
