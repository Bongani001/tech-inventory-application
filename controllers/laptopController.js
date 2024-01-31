const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Item = require("../models/item");
const Category = require("../models/category");

// Display a list of all laptops
exports.laptop_list = asyncHandler(async (req, res) => {
  const allItems = await Item.find().populate("category").exec();
  const laptops = allItems.filter((item) => item.category.name === "laptops");

  res.render("item_list", { title: "Laptops", items: laptops });
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

exports.laptop_create_post = [
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

    const laptop = new Item({
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
        title: "Add a Laptop",
        categories,
        item: laptop,
        errors: errors.array(),
      });
    } else {
      const createdLaptop = await laptop.save();
      const category = await Category.findById(createdLaptop.category).exec();
      res.redirect(`/categories/${category.name}/${createdLaptop._id}`);
    }
  }),
];

exports.laptop_update_get = asyncHandler(async (req, res) => {
  const laptop = await Item.findById(req.params.id).exec();
  const categories = await Category.find().exec();

  res.render("item_form", { title: "Update Laptop", categories, item: laptop });
});

exports.laptop_update_post = [
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

    const laptop = new Item({
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
        title: "Update Laptop",
        categories,
        item: laptop,
        errors: errors.array(),
      });
    } else {
      const createdLaptop = await Item.findByIdAndUpdate(req.params.id, laptop, {});
      const category = await Category.findById(createdLaptop.category).exec();
      res.redirect(`/categories/${category.name}/${createdLaptop._id}`);
    }
  }),
];
