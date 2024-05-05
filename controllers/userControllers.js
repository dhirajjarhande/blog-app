const userModel = require("../models/userModel");
const blogModel = require("../models/blogModel");
const bcrypt = require("bcryptjs");

//create user resister user
exports.registerController = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    //validation
    if (!userName || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "please all field are required",
      });
    }

    //existingUser
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(401).send({
        success: false,
        message: "user are alredy existed",
      });
    }
    //hased password

    const hashedPassword = await bcrypt.hash(password, 10);

    //save user

    const user = new userModel({ userName, email, password: hashedPassword });
    await user.save();
    return res.status(201).send({
      success: true,
      message: "new user created",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "error in register callback",
      success: false,
      error,
    });
  }
};

//all useres
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    return res.status(200).send({
      userCount: users.length,
      success: true,
      message: "all users data",
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in all get user",
      error,
    });
  }
};

//login

exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "please provide email or password",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "email is not register",
      });
    }
    //password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "invalid password or email",
      });
    }
    return res.status(200).send({
      success: true,
      message: "login siccessfull",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in login callback",
      error,
    });
  }
};
