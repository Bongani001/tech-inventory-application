const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Item = require("../models/item");
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

exports.phone_create_post = [
  // Validate and sanitize fields
  body("name", "Name must not be empty").trim().isLength({ min: 1 }).escape(),
  body("description", "Description must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("price", "Price must be greater than 0").isInt({ min: 1 }).escape(),
  body("inStock").isAlphanumeric().escape(),
  body("category", "Please choose a category")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  // Process the request after validation
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    const phone = new Item({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      inStock: req.body.inStock,
    });

    if (!errors.isEmpty()) {
      // There are errors, render the form again
      const categories = await Category.find().exec();
      res.render("item_form", {
        title: "Add a Phone",
        categories,
        item: phone,
        errors: errors.array(),
      });
    } else {
      const createdPhone = await phone.save();
      const category = await Category.findById(createdPhone.category).exec();
      res.redirect(`/categories/${category.name}/${createdPhone._id}`);
    }
  }),
];

exports.phone_update_get = asyncHandler(async (req, res) => {
  const phone = await Item.findById(req.params.id).exec();
  const categories = await Category.find().exec();

  res.render("item_form", { title: "Update Phone", categories, item: phone });
});

exports.phone_update_post = [
  // Validate and sanitize fields
  body("name", "Name must not be empty").trim().isLength({ min: 1 }).escape(),
  body("description", "Description must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("price", "Price must be greater than 0").isInt({ min: 1 }).escape(),
  body("inStock").isAlphanumeric().escape(),
  body("category", "Please choose a category")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  // Process the request after validation
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    const phone = new Item({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      inStock: req.body.inStock,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      // There are errors, render the form again
      const categories = await Category.find().exec();
      res.render("item_form", {
        title: "Update Phone",
        categories,
        item: phone,
        errors: errors.array(),
      });
    } else {
      const createdPhone = await Item.findByIdAndUpdate(
        req.params.id,
        phone,
        {}
      );
      const category = await Category.findById(createdPhone.category).exec();
      res.redirect(`/categories/${category.name}/${createdPhone._id}`);
    }
  }),
];

exports.phone_delete_post = asyncHandler(async (req, res, next) => {
  const phone = await Item.findById(req.params.id).exec();

  if (phone === null) {
    const error = new Error("Phone Not Found.");
    error.status = 404;
    return next(error);
  }

  await Item.findByIdAndDelete(req.params.id);
  res.redirect("/categories/phones/");
});
