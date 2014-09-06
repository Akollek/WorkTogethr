'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var QuestionSchema = new Schema({
  name: String,
  info: String,
  active: Boolean,
  img: String
});

module.exports = mongoose.model('Question', QuestionSchema);
