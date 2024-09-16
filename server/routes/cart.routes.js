const express = require('express');
const router = express.Router();
const cartController = require('../controller/cart.controller');
const authMiddleware = require('../middleware/auth.middleware');


router.get('/', authMiddleware,cartController.findAllByUser);
router.post('/',authMiddleware, cartController.createCart);

router.delete('/:id',authMiddleware, cartController.deleteCartItem);
router.delete('/product/:product_id',authMiddleware, cartController.deleteAllByProductAndUser);
router.post('/checkout',authMiddleware, cartController.checkout);

module.exports = router;

