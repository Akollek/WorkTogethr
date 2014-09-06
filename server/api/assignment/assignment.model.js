'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema
    , ObjectId = Schema.Types.ObjectId;

var AssignmentSchema = new Schema({
  name: String,
  info: String,
  active: Boolean,
  questions: [{type: ObjectId, ref: 'Question'}]
});

module.exports = mongoose.model('Assignment', AssignmentSchema);
