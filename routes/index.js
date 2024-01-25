const express = require("express");
const router = express.Router();
const Category = require("../models/category");
const Item = require("../models/item");
const categoryController = require("../controllers/categoryController")
const itemController = require("../controllers/itemController")

/* GET home page. */
router.get("/", async function (req, res, next) {
  const [categories, items] = await Promise.all([
    Category.find().exec(),
    Item.find().exec(),
  ]);

  res.render("index", {
    title: "Express",
    categories: categories,
    items: items,
  });
});

module.exports = router;
