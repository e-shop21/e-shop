const express = require('express');
const router = express.Router();
const { createProduct, getAllProducts, searchProducts,getSellerPendingProductsForAdmin, getSellerSoldProductsForAdmin, getPendingProductsBySellerId, getProductsByCategoryId, getProductsBySellerId, getProductById, updateProduct, deleteProduct, getProductsBySubcategoryId } = require('../controller/product.controller');
const authMiddleware = require('../middleware/auth.middleware');



router.get('/search', authMiddleware, searchProducts);
router.get('/', getAllProducts);
router.post('/', authMiddleware, createProduct);
router.get('/seller/get', authMiddleware, getProductsBySellerId);
router.get('/seller/pending', authMiddleware, getPendingProductsBySellerId);
router.get('/category/:categoryId', getProductsByCategoryId);
router.get('/subcategory/:subcategoryId', getProductsBySubcategoryId);
router.get('/:id', getProductById);
router.put('/:id', authMiddleware, updateProduct);
router.delete('/:id', authMiddleware, deleteProduct);
router.get('/admin/seller/:sellerId/pending', authMiddleware, getSellerPendingProductsForAdmin);
router.get('/admin/seller/:sellerId/sold', authMiddleware, getSellerSoldProductsForAdmin);
module.exports = router;