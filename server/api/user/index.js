'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var app = express();

app.get('/', auth.hasRole('admin'), controller.index);
app.delete('/:id', auth.hasRole('admin'), controller.destroy);
app.get('/me', auth.isAuthenticated(), controller.me);
app.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
app.get('/:id', auth.isAuthenticated(), controller.show);
app.post('/', controller.create);

module.exports = app;
