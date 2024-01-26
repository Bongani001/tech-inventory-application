const express = require("express");
const router = express.Router();
const phoneController = require("../controllers/phoneController");
const laptopController = require("../controllers/laptopController")

////// PHONES ROUTER ///////

// GET request to get a list of phones
router.get("/phones", phoneController.phone_list);

// GET request to get a specific phone
router.get("/phones/:id", phoneController.phone_detail);


////// PHONES ROUTER ///////

// GET request to get a list of phones
router.get("/laptops", laptopController.laptop_list);

// GET request to get a specific phone
router.get("/laptops/:id", laptopController.laptop_detail);


module.exports = router; 
