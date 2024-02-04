const express = require("express");
const router = express.Router();
const Category = require("../models/category");
const Item = require("../models/item");
const categoryController = require("../controllers/categoryController");

/* GET home page. */
router.get("/", async function (req, res, next) {
  const allItems = await Item.find().populate("category").exec();
  let phones = 0, laptops = 0;
  allItems.forEach(item => {
    if(item.category.name === "phones") {
      phones++
    } else {
      laptops++
    }
  })
  // const [phones, laptops] = await Promise.all([
  //   Category.find({ category: "phones" }).countDocuments().exec(),
  //   Category.find({ category: "laptops" }).countDocuments().exec(),
  // ]);

  res.render("index", {
    title: "Tech Inventory",
    phones,
    laptops
  });
});

// Get request for displaying all categories
router.get("/", categoryController.category_list);

module.exports = router;
