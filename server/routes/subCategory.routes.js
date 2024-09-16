const express = require('express');
const router = express.Router();
const { getSubcategoriesByCategoryId } = require('../controller/subCategory.controller');

router.get('/:categoryId', getSubcategoriesByCategoryId);

module.exports = router;