const express = require('express');
const controller = require('../controllers/userController')
const {isGuest,isLoggedIn,isValidEmail}= require('../middleware/auth');
const {validateLogin, validateResult, validateSignup} = require('../middleware/validator');
// const {body, validationResult} = require('express-validator');

const router = express.Router();


router.get('/login', isGuest,controller.loginPage);

router.get('/signup', isGuest, controller.signup);

router.post('/login', isGuest ,validateLogin, validateResult, controller.login);

router.post('/signup', isGuest, validateSignup , isValidEmail, validateResult, controller.create);

router.get('/profile', isLoggedIn, controller.profile);

router.get('/logout', isLoggedIn, controller.logout);

module.exports = router;