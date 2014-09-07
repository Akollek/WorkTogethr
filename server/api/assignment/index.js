'use strict';

var express = require('express');
var controller = require('./assignment.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.post('/upload', controller.uploadAssignment);
router.post('/manual_upload', auth.isAuthenticated(), controller.manualUploadAssignment);
router.post('/manual_upload_pdf', auth.isAuthenticated(), controller.manualAddPDF);
router.post('/get_my_assignments', auth.isAuthenticated(), controller.getMyAssignments);
//router.get('/get_my_assignments_test', controller.getMyAssignmentsTest);

module.exports = router;
