'use strict';

var express = require('express');
var controller = require('./question.controller');


var app = express();

app.get('/', controller.index);
app.get('/:id', controller.show);
app.post('/', controller.create);
app.put('/:id', controller.update);
app.patch('/:id', controller.update);
app.delete('/:id', controller.destroy);

module.exports = app;
