const express = require('express');
const adminController = require('../controller/admin.controller');
const router = express.Router();

const authMiddleware = require('../middleware/auth.middleware');

router.post('/createAdmin', adminController.createAdmin);
router.get('/', adminController.getAdmin);
router.get('/seller-stats/:sellerId', authMiddleware, adminController.getSellerStats);
router.get('/user-buying-rate/:userId', authMiddleware, adminController.getUserBuyingRate);
router.get('/user-purchases/:userId', authMiddleware, adminController.getUserPurchases);



module.exports = router;