const express = require('express');
const router = express.Router();
const soldController = require('../controller/sold.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.use(authMiddleware);


router.get('/seller/get', soldController.getSoldItemsBySeller);
router.get('/user/get', soldController.getSoldItemsByUser);
router.get('/', soldController.findAllSold);
router.get('/:id', soldController.findSoldById);
router.put('/:id', soldController.updateSold);
router.post('/item', soldController.createSoldItem);


module.exports = router;