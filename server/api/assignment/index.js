'use strict';

var express = require('express');
var controller = require('./assignment.controller');
var auth = require('../../auth/auth.service');

var app = express();

app.get('/', controller.index);
app.get('/:id', controller.show);
app.post('/', controller.create);
app.put('/:id', controller.update);
app.patch('/:id', controller.update);
app.delete('/:id', controller.destroy);
app.post('/upload', controller.uploadAssignment);
app.post('/manual_upload', auth.isAuthenticated(), controller.manualUploadAssignment);
app.post('/get_my_assignments', auth.isAuthenticated(), controller.getMyAssignments);
//router.get('/get_my_assignments_test', controller.getMyAssignmentsTest);

module.exports = app;
