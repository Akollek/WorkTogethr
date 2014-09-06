'use strict';

var express = require('express');
var controller = require('./assignment.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.post('/upload', controller.uploadAssignment);
router.post('/manual_upload', auth.isAuthenticated(), controller.manualUploadAssignment);
router.get('/get_my_assignments', auth.isAuthenticated(), controller.index);

module.exports = router;
