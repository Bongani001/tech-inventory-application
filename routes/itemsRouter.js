const express = require("express");
const router = express.Router();
const phoneController = require("../controllers/phoneController");
const laptopController = require("../controllers/laptopController");

////// PHONE ROUTER ///////

// GET request to get a list of phones
router.get("/phones", phoneController.phone_list);

// GET request to get a form to add a new phone
router.get("/phones/create", phoneController.phone_create_get);

// GET request to get a specific phone
router.get("/phones/:id", phoneController.phone_detail);

////// LAPTOP ROUTER ///////

// GET request to get a list of phones
router.get("/laptops", laptopController.laptop_list);

// GET request to get a form to add a new laptop
router.get("/laptops/create", laptopController.laptop_create_get);

// GET request to get a specific phone
router.get("/laptops/:id", laptopController.laptop_detail);


module.exports = router;
