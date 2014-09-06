'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var SchoolSchema = new Schema({
  name: String,
  info: String,
  active: Boolean,
  users: [{type: ObjectId, ref: 'User'}],
  assignments: [{type: ObjectId, ref: 'Assignment'}]
});

module.exports = mongoose.model('School', SchoolSchema);
