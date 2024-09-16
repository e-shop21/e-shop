const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const authMiddleware = require('../middleware/auth.middleware');





router.get("/get/profile", authMiddleware, userController.getProfile);
router.put("/put/profile", authMiddleware, userController.updateProfile);
router.get('/', userController.findAll);
router.get('/:id', userController.findOne);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);


module.exports = router;