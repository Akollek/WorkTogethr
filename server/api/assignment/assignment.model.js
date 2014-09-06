'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AssignmentSchema = new Schema({
  name: String,
  info: String,
  active: Boolean,
  // array of images
});

module.exports = mongoose.model('Assignment', AssignmentSchema);
