const express = require('express');
const router = express.Router();
const controller = require('../controllers/rsvpController')
const {validateId, validateRsvp} = require('../middleware/validator');
const {isLoggedIn}= require('../middleware/auth');
// const {validateConn, validateResult} = require('../middleware/validator');

router.post('/:id/:value', isLoggedIn, validateId, validateRsvp, controller.createRsvp);

router.delete('/:id', isLoggedIn, validateId, controller.delete);

module.exports = router;