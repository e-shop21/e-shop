const express = require('express');
const router = express.Router();
const sellerController = require('../controller/seller.controller');

// Create a new Seller
     router.post("/", sellerController.create);
     router.get("/", sellerController.findAll);
     router.get("/:id", sellerController.findOne);
     router.put("/:id", sellerController.update);
     router.delete("/:id", sellerController.delete);


module.exports = router;