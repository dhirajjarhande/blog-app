const mongoose = require("mongoose");
const userModel = require("../models/userModel");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    discription: {
      type: String,
      required: [true, "discription is required"],
    },
    image: {
      type: String,
      required: [true, "image is required"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      Ref: "user",
      required: [true, "user id is required"],
    },
  },

  { timestamps: true }
);

const blogModel = mongoose.model("blogModel", blogSchema);

module.exports = blogModel;
