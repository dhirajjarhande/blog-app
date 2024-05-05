const blogModel = require("../models/blogModel");
const mongoose = require("mongoose");
const userModel = require("../models/userModel");

//GET || ALL BLOG
exports.getAllBlogController = async (req, res) => {
  try {
    const blogs = await blogModel.find({}).populate("user");
    if (!blogs) {
      return res.status(200).send({
        success: false,
        message: "no blog found",
      });
    }
    return res.status(200).send({
      success: true,
      blogCount: blogs.length,
      message: "all blog list",
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "erroe while gettin blog",
      error,
    });
  }
};

//post || create blog

exports.createBlogController = async (req, res) => {
  try {
    const { title, discription, image, user } = req.body;
    //validation
    if (!title || !discription || !image || !user) {
      return res.status(400).send({
        success: false,
        message: "please provide all field",
      });
    }
    const existingUser = await userModel.findById(user);
    if (!existingUser) {
      return res.status(404).send({
        success: false,
        message: "unable to find user",
      });
    }
    //save blog
    const newBlog = new blogModel({
      title,
      discription,
      image,
      user,
    });
    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session });
    existingUser.blogs.push(newBlog);
    await existingUser.save({ session });
    await session.commitTransaction();
    await newBlog.save();
    return res.status(201).send({
      success: true,
      mesage: "blog created",
      newBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "error while creating blog",
      error,
    });
  }
};

//PUT || update blog

exports.updateBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, discription, image } = req.body;

    const blog = await blogModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "updated this blog",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      mesage: "error while in update blog",
      error,
    });
  }
};

//GET || single blog details

exports.getBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "blog not found with this id",
      });
    }
    return res.status(200).send({
      success: true,
      message: "featch single blog",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "error while in geting single blog",
      error,
    });
  }
};

// DELETE ||  DELETE BLOG
exports.deleteBlogController = async (req, res) => {
  try {
    const blog = await blogModel
      .findOneAndDelete(req.params.id)
      .populate("user");
    // await blog.user.blogs.pull(blog);

    // await blog.user.save();
    return res.status(200).send({
      success: true,
      mesage: "single blog is deleted",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      mesage: "error while delete blog",
      error,
    });
  }
};

//GET USER BLOG

exports.userBlogController = async (req, res) => {
  try {
    const userBlog = await userModel.findById(req.params.id).populate("blogs");

    if (!userBlog) {
      return res.status(404).send({
        success: false,
        message: "blog not found this id",
        userBlog,
      });
    }
    return res.status(200).send({
      success: true,
      message: "user blog",
      userBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "error while in single user blog",
      error,
    });
  }
};
