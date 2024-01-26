const express = require("express");
const router = express.Router();
const phoneController = require("../controllers/phoneController");


////// PHONES ROUTER ///////

router.get("/phones", phoneController.phone_list)


module.exports = router;