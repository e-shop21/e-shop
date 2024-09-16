const express = require('express');
const router = express.Router();
const commercialController = require('../controller/commercial.controller');
const middleware = require('../middleware/auth.middleware');

router.post('/', middleware, commercialController.createCommercial);
router.get('/new-arrivals', commercialController.getNewArrivals);
router.get('/exclusive-offer', commercialController.getExclusiveOffer);
router.get('/pub', commercialController.getPub);

module.exports = router;