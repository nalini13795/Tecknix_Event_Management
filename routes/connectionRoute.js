const express = require('express');
const controller = require('../controllers/connectionController')
const router = express.Router();
const {validateId} = require('../middleware/validator');
const {isAuthor} = require('../middleware/auth');
const {isGuest,isLoggedIn}= require('../middleware/auth');
const {validateConn, validateResult} = require('../middleware/validator');



router.get('/', controller.Connections);

router.get('/newConnection', isLoggedIn ,controller.newConnection);

router.get('/:id', validateId, controller.showByID);

router.post('/newConnection', isLoggedIn, validateConn, validateResult, controller.addConnection);

router.delete('/:id',isLoggedIn ,validateId, isAuthor, controller.delete);

router.get('/:id/edit', isLoggedIn, validateId, isAuthor, controller.edit);

router.put('/:id', isLoggedIn, validateId, isAuthor, controller.update);


module.exports = router;