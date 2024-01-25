const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

// Get request for displaying all categories
router.get("/", categoryController.category_list)

// Get request for creating a category
router.get("/categories/create", categoryController.category_create_get);

// Post request for creating a category
router.post("/categories/create", categoryController.category_create_post);



module.exports = router;