const asyncHandler = require("express-async-handler");
const Item = require("../models/item");
const Category = require("../models/category");

// Display a list of all laptops
exports.laptop_list = asyncHandler(async (req, res) => {
  const allItems = await Item.find().populate("category").exec();
  const laptops = allItems.filter((item) => item.category.name === "laptops");

  res.render("item_list", { title: "Phones", items: laptops });
});

// Display details of a certain laptop
exports.laptop_detail = asyncHandler(async (req, res) => {
  const laptop = await Item.findById(req.params.id).populate("category").exec();

  if (laptop === null) {
    const error = new Error("Laptop Not Found");
    error.status = 404;
    res.redirect("/categories/laptops");
    return;
  }

  res.render("item_detail", { title: "Laptop Details", item: laptop });
});

// Display a form for creating a new laptop
exports.laptop_create_get = asyncHandler(async (req, res) => {
  const categories = await Category.find().exec();

  res.render("item_form", { title: "Add a Laptop", categories });
});
