const express = require('express');
const router = express.Router();
const { uploadImage, createImage, getImagesByProductId, updateImage, deleteImage , getAllImages } = require('../controller/image.controller');

router.post('/upload', uploadImage);
router.post('/', createImage);
router.get('/:product_id', getImagesByProductId);
router.put('/:id', updateImage); // Ensure updateImage is defined in the controller
router.delete('/:id', deleteImage);
router.get('/', getAllImages);



module.exports = router;