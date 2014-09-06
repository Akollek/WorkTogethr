'use strict';

var _ = require('lodash');
var Assignment = require('./assignment.model');
var Question = require('../question/question.model');

// Get list of assignments
exports.index = function(req, res) {
  Assignment.find()
  .populate('questions')
  .exec(function (err, assignments) {
    if(err) { return handleError(res, err); }
    return res.json(200, assignments);
  });
};

// Get a single assignment
exports.show = function(req, res) {
  Assignment.findById(req.params.id, function (err, assignment) {
    if(err) { return handleError(res, err); }
    if(!assignment) { return res.send(404); }
    return res.json(assignment);
  });
};

// Creates a new assignment in the DB.
exports.create = function(req, res) {
  Assignment.create(req.body, function(err, assignment) {
    if(err) { return handleError(res, err); }
    return res.json(201, assignment);
  });
};

// Updates an existing assignment in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Assignment.findById(req.params.id, function (err, assignment) {
    if (err) { return handleError(res, err); }
    if(!assignment) { return res.send(404); }
    var updated = _.merge(assignment, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, assignment);
    });
  });
};

// Deletes a assignment from the DB.
exports.destroy = function(req, res) {
  Assignment.findById(req.params.id, function (err, assignment) {
    if(err) { return handleError(res, err); }
    if(!assignment) { return res.send(404); }
    assignment.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

//
exports.uploadAssignment = function(req, res) {
  console.log('in uploadAssignment');
  console.log(req.files);
  return res.send(204);
};

//
exports.manualUploadAssignment = function(req, res) {
  console.log('image links: ', req.body);

  var questions = [];
  var question1 = new Question({
    img: req.body.question_images[0]
  });
  question1.save(function(err) {
    questions.push(question1._id);
    var question2 = new Question({
      img: req.body.question_images[1]
    });
    question2.save(function(err) {
      questions.push(question2._id);
      console.log('here', questions);
      var assignment = new Assignment({
        'questions': questions
      });
      console.log('assignment: ', assignment);
      assignment.save(function(err) {
        return res.json(200, assignment);
      });
    })
  })
};

function handleError(res, err) {
  return res.send(500, err);
}
