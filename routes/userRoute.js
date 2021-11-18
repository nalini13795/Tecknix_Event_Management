const express = require('express');
const controller = require('../controllers/userController')
const router = express.Router();


router.get('/login',controller.loginPage);

router.get('/signup',controller.signup);

router.post('/login',controller.login);

router.post('/signup',controller.create);

router.get('/profile', controller.profile);

router.get('/logout', controller.logout);

module.exports = router;