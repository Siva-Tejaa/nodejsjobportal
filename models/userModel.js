const mongoose = require("mongoose");

//Schema
const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "FirstName is Required"],
    },
    lastname: {
      type: String,
      required: [true, "LastName is Required"],
    },
    email: {
      type: String,
      required: [true, "Email is Required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
