const asyncHandler = require("express-async-handler");
const Item = require("../models/item");

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
