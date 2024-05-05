const express = require("express");
const {
  getAllUsers,
  registerController,
  loginController,
} = require("../controllers/userControllers");

//router object
const router = express();

//get allusers || get
router.get("/all-user", getAllUsers);

//create users||post

router.post("/register", registerController);

//login || pots

router.post("/login", loginController);

module.exports = router;
