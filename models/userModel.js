const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "user name is required"],
    },
    email: {
      type: String,
      required: [true, "email are required "],
    },
    password: {
      type: String,
      required: [true, "password are required"],
    },
    blogs: [
      {
        type: mongoose.Types.ObjectId,
        ref: "blogModel",
      },
    ],
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
