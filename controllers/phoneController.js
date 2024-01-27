const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Item = require("../models/item");
const router = require("../routes/itemsRouter");
const Category = require("../models/category");

// Display a list of all phones
exports.phone_list = asyncHandler(async (req, res) => {
  const allItems = await Item.find().populate("category").exec();
  const phones = allItems.filter((item) => item.category.name === "phones");

  res.render("item_list", { title: "Phones", items: phones });
});

// Display details of a certain phone
exports.phone_detail = asyncHandler(async (req, res) => {
  const phone = await Item.findById(req.params.id).populate("category").exec();

  if (phone === null) {
    const error = new Error("Phone Not Found");
    error.status = 404;
    res.redirect("/categories/phones");
    return;
  }

  res.render("item_detail", { title: "Phone Details", item: phone });
});

// Display a form for creating a new phone
exports.phone_create_get = asyncHandler(async (req, res) => {
  const categories = await Category.find().exec();

  res.render("item_form", { title: "Add a Phone", categories });
});
