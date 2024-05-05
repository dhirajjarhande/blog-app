const express = require("express");
const {
  getAllBlogController,
  createBlogController,
  updateBlogController,
  getBlogController,
  deleteBlogController,
  userBlogController,
} = require("../controllers/blogController");

const router = express();

//route
//get || all blog
router.get("/all-blog", getAllBlogController);

//post || create blog

router.post("/create-blog", createBlogController);

//PUT || update blog

router.put("/update-blog/:id", updateBlogController);

//GET || single blog details
router.get("/get-blog/:id", getBlogController);

// DELETE ||  DELETE BLOG

router.delete("/delete-blog/:id", deleteBlogController);

// get || user blog
router.get("/user-blog/:id", userBlogController);

module.exports = router;
