const express = require('express');
const router = express.Router();
const controller = require('../controllers/rsvpController')
const {validateId} = require('../middleware/validator');
const {isLoggedIn}= require('../middleware/auth');
// const {validateConn, validateResult} = require('../middleware/validator');

router.post('/:id/:value', isLoggedIn, validateId, controller.createRsvp);

router.delete('/:id', isLoggedIn, validateId, controller.delete);

module.exports = router;