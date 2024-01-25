const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

router.get("/categories/create", categoryController.category_create_get);

router.post("/categories/create", categoryController.category_create_post);
