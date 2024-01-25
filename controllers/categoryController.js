const category = require("../models/category");
const Category = require("../models/category");

exports.category_list = async (req, res) => {
  const categories = await Category.find().exec();
  res.render("category_list", {
    title: "Home",
    categories: categories,
  }); 
};

exports.category_create_get = (req, res) => {
  res.render("category_form", { title: "Create Category" });
};

exports.category_create_post = async (req, res) => {
  const category = new Category({
    name: req.body.name,
  });

  const createdCategory = await category.save();
  res.redirect(`/category/${createdCategory.url}`);
};

exports.category_update_get = async (req, res) => {
  const category = await Category.findById(req.params.id).exec();

  if (!category) {
    const error = new Error("Category Not Found.");
    error.status = 404;
    res.redirect("/categories");
  } else {
    res.render("category_form", {
      title: "Create Category",
      category: category,
    });
  }
};
