const express = require('express');
const router = express.Router();
const sellerController = require('../controller/seller.controller');
const authMiddleware = require('../middleware/auth.middleware');



router.get("/get/profile", authMiddleware, sellerController.getProfile);  // Ensure this line is correct
router.put("/put/profile", authMiddleware, sellerController.updateProfile);  // Add this line for updating profile
router.get("/", sellerController.findAll);
router.get("/:id", sellerController.findOne);
router.put("/:id", sellerController.update);
router.delete("/:id", sellerController.delete);


module.exports = router;
     

module.exports = router;