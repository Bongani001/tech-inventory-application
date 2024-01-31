const express = require("express");
const router = express.Router();
const phoneController = require("../controllers/phoneController");
const laptopController = require("../controllers/laptopController");

////// PHONE ROUTER ///////

// GET request to get a list of phones
router.get("/phones", phoneController.phone_list);

// GET request to get a form to add a new phone
router.get("/phones/create", phoneController.phone_create_get);

// POST request to add a new phone
router.post("/phones/create", phoneController.phone_create_post);

// GET request to get a specific phone to be updated
router.get("/phones/:id/update", phoneController.phone_update_get);

// POST request to update specific phone 
router.post("/phones/:id/update", phoneController.phone_update_post);

// POST request to delete specific phone 
router.post("/phones/:id/delete", phoneController.phone_delete_post);

// GET request to get a specific phone
router.get("/phones/:id", phoneController.phone_detail);

////// LAPTOP ROUTER ///////

// GET request to get a list of phones
router.get("/laptops", laptopController.laptop_list);

// GET request to get a form to add a new laptop
router.get("/laptops/create", laptopController.laptop_create_get);

// POST request to add/create a new laptop
router.post("/laptops/create", laptopController.laptop_create_post);

// GET request to get a specific laptop to be updated
router.get("/laptops/:id/update", laptopController.laptop_update_get);

// POST request to update specific laptop 
router.post("/laptops/:id/update", laptopController.laptop_update_post);

// // POST request to update specific laptop 
// router.post("/laptops/:id/delete", laptopController.laptop_delete_post);

// GET request to get a specific phone
router.get("/laptops/:id", laptopController.laptop_detail);


module.exports = router;
