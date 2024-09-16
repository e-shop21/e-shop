const express = require('express');
const router = express.Router();
const authController = require('../controller/auth.controller');

router.post('/signup', authController.signUp);
router.post('/signin', authController.signIn);
router.get('/verify', authController.verifyToken);



module.exports = router;