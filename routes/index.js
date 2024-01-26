const express = require("express");
const router = express.Router();
const Category = require("../models/category");
const categoryController = require("../controllers/categoryController")

/* GET home page. */
router.get("/", async function (req, res, next) {
  const [phones, laptops] = await Promise.all([
    Category.find({ category: "phones" }).countDocuments().exec(),
    Category.find({ category: "laptops" }).countDocuments().exec(),
  ]);

  res.render("index", {
    title: "Tech Inventory",
    phones,
    laptops,
  });
});

// Get request for displaying all categories
router.get("/", categoryController.category_list)

module.exports = router;
