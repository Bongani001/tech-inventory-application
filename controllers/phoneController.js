const express = require("express");
const route = express.Router();
const asyncHandler = require("express-async-handler");
const Item = require("../models/item");

// Display a list of all phones
exports.phone_list = asyncHandler(async (req, res) => {
  const allItems = await Item.find().populate("category").exec();
  const phones = allItems.filter((item) => item.category.name === "phones");
  console.log(phones);
  res.render("phone_list", { title: "Phones", phones });
});
