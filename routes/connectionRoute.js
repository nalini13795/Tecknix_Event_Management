const express = require('express');
const controller = require('../controllers/ConnectionController')
const router = express.Router();



router.get('/', controller.Connections);

router.get('/newConnection',controller.newConnection);

router.get('/showConnection',controller.Connection);

router.get('/about',controller.about);

router.get('/contact', controller.contact);

router.get('/:id',controller.showByID);

router.post('/newConnection',controller.addConnection);

router.delete('/:id', controller.delete);

router.get('/:id/edit',controller.edit);

router.put('/:id', controller.update);



module.exports = router;