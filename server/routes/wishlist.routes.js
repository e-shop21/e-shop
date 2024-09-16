


const express = require('express');
const router = express.Router();
const wishlistController = require('../controller/wishlist.controller');
const authMiddleware = require('../middleware/auth.middleware');







router.post('/', authMiddleware, wishlistController.createWishlist);
router.get('/user', authMiddleware, wishlistController.findAllByUser);
router.delete('/remove/:productId', authMiddleware, wishlistController.deleteWishlist);
router.get('/', wishlistController.getAllWishlist);

module.exports = router;


module.exports = router;