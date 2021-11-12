const express = require('express');
const controller = require('../controllers/userController')
const router = express.Router();


router.get('/login',controller.login);

router.get('/signup',controller.signup);

router.post('/login',controller.login);

router.post('/signup',controller.signup);

router.get('/profile', controller.profile);


module.exports = router;