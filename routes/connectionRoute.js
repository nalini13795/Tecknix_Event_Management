const express = require('express');
const controller = require('../controllers/ConnectionController')
const router = express.Router();


router.get('/', controller.Connections);

router.get('/newConnection',controller.newConnection);

router.get('/showConnection',controller.Connection);

module.exports = router;