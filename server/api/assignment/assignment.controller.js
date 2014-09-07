'use strict';

var _ = require('lodash');
var Assignment = require('./assignment.model');
var Question = require('../question/question.model');
var Course = require('../course/course.model');
var User = require('../user/user.model');
var exec = require('child_process').exec,
    child;
var Sync = require('sync');

var http = require('http');
var fs = require('fs');

var uploader = require('../helper/uploader'),
    path = require('path');


exports.uploadAssignment = function(req,res, callback){    
    console.log('in uploadAssignment');
    console.log('req files: ', req.file);
    console.log('req body: ', req.body);
    uploader.processFileUpload(req, ['.pdf', '.jpeg', '.png'], function(uploadError, tempPath, formPayload){

    var fileExtenstion = path.extname(tempPath).toLowerCase();
    var targetPath = "/exampleUploadDir/testFile" + fileExtenstion;

    fs.rename(tempPath, targetPath, function(error) {
      if(error){
        return callback("cant upload employee image");
      }

      callback(null, newFileName);
    });
  });
}

/*// Get list of assignments*/
//exports.getMyAssignmentsTest = function(req, res) {
  //console.log('req.user: ', req.user);
  //return res.send(200);
//};

// Get list of assignments
// doesn't ensure courses are unique
// only ensures it only lists the student's assignment
exports.getMyAssignments = function(req, res) {
  console.log('req.user: ', req.user);
  console.log('assignment name: ', req.user.name);
  User.findOne({'_id': req.user._id})
  .populate('assignments')
  .exec(function (err, user) {
    if(err) { return handleError(res, err); }
    return res.json(200, user.assignments);
  });
};

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
  Assignment.findById(req.params.id)
  .populate('questions')
  .exec(function (err, assignment) {
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


exports.manualAddPDF = function(req, res) {
  console.log('add pdf');
  var assignment = new Assignment({
    'course': req.body.class_id
    , name: req.body.name
  });
  assignment.save(function(err) {
    var file = fs.createWriteStream("temp/" + assignment._id + ".pdf");
    var request = http.get(req.body.pdf_link, function(response) {
      console.log('writing file');
      response.pipe(file);
      //java stuff
      response.on('end', function() {
        console.log('done writing file');
        child = exec('pdftoppm -png temp/' + assignment._id + '.pdf temp/' + assignment._id,
        function (error, stdout, stderr) {
          console.log('stdout: ' + stdout);
          console.log('stderr: ' + stderr);
          if (error !== null) {
            console.log('exec error: ' + error);
          }
          child = exec('/bin/bash questioncutter/JavaApplication1/parse-script temp/' + assignment._id + ' temp/' + assignment._id + '-1 ./',
          //child = exec('/bin/bash ../../../questioncutter/JavaApplication1/parse-script temp/' + assignment._id + '.pdf temp/' + assignment._id + '-01.png',
          function (error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            var num_questions = stdout;
            console.log('num_questions: ', num_questions);
            console.log('num_questions + 1: ', num_questions + 1);
            if (error !== null) {
              console.log('exec error: ' + error);
            }

            var questions = [];
            for(var i = 0; i < num_questions; i++) {
              var question = new Question({
                img: 'temp/' + assignment._id + '-1-' + i + '.png'
              });
              console.log('question: ', question);
              question.save(function(err) {
                questions.push(question._id);
                console.log('questoins: ', questions);
              })
            }
            setTimeout(function() {
              console.log('questions after: ', questions);
              assignment.questions = questions;
              assignment.save(function(err) {
                req.user.assignments.push(assignment);
                req.user.save(function(err) {
                  return res.json(200, assignment);
                })
              })
            }, 1000);
          });
        });
      })
    });
    
  });
  // TODO: change to hash id
  //Course.findOne({'name': req.body.class_id})
  //.exec(function(err, course) {
    //if (err) { return handleError(res, err); }

    //// create course if doesn't exist
    //// continue if it does
    //!function(callback) {
      //if(course == null) {
        //course = new Course({
          //name: req.body.class_id
        //});
        //course.save(function(err) {
          //if(!err) {
            //callback(course);
          //}
        //});
      //} else {
        //callback(course);
      //}
    //}(function(course) {
      //var questions = [];
      //var question1 = new Question({
        //img: req.body.question_images[0]
      //});
      //question1.save(function(err) {
        //questions.push(question1._id);
        //var question2 = new Question({
          //img: req.body.question_images[1]
        //});
        //question2.save(function(err) {
          //questions.push(question2._id);
          //console.log('here', questions);
          //var assignment = new Assignment({
            //'questions': questions
            //, 'course': course
          //});
          //console.log('assignment: ', assignment);
          //assignment.save(function(err) {
            //req.user.assignments.push(assignment);
            //req.user.save(function(err) {

            //// convert to image first with pdftoppm -png sample_assignment newname
            //// TODO: run java code

////'java -cp bin:dist/lib/itextpdf-5.5.2.jar:dist/lib/itext-pdfa-5.5.2-javadoc.jar:dist/lib/itext-xtra-5.5.2-sources.jar:dist/lib/itextpdf-5.5.2-javadoc.jar:dist/lib/itext-pdfa-5.5.2-sources.jar:dist/lib/levigo-jbig2-imageio-1.6.1.jar:dist/lib/itextpdf-5.5.2-sources.jar:dist/lib/itext-xtra-5.5.2.jar:dist/lib/pdfbox-app-1.8.6.jar:dist/lib/itext-pdfa-5.5.2.jar:dist/lib/itext-xtra-5.5.2-javadoc.jar javaapplication1/JavaApplication1'
              //child = exec('cat *.js bad_file | wc -l',
              //function (error, stdout, stderr) {
                //console.log('stdout: ' + stdout);
                //console.log('stderr: ' + stderr);
                //if (error !== null) {
                  //console.log('exec error: ' + error);
                //}
                //return res.json(200, assignment);
              //});
            //})
          //});
        //})
      //})
    //})
  //})
}

//
//exports.uploadAssignment = function(req, res) {
  //console.log('in uploadAssignment');
  //console.log('req files: ', req.file);
  //console.log('req body: ', req.body);

  //return res.send(204);
//};

//
exports.manualUploadAssignment = function(req, res) {
  console.log('image links: ', req.body);
  console.log('class id: ', req.body.class_id);

  Course.findOne({'name': req.body.class_id})
  .exec(function(err, course) {
    if (err) { return handleError(res, err); }

    // create course if doesn't exist
    // continue if it does
    !function(callback) {
      if(course == null) {
        course = new Course({
          name: req.body.class_id
        });
        course.save(function(err) {
          if(!err) {
            callback(course);
          }
        });
      } else {
        callback(course);
      }
    }(function(course) {
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
            , 'course': course
          });
          console.log('assignment: ', assignment);
          assignment.save(function(err) {
            req.user.assignments.push(assignment);
            req.user.save(function(err) {

            // convert to image first with pdftoppm -png sample_assignment newname
            // TODO: run java code

//'java -cp bin:dist/lib/itextpdf-5.5.2.jar:dist/lib/itext-pdfa-5.5.2-javadoc.jar:dist/lib/itext-xtra-5.5.2-sources.jar:dist/lib/itextpdf-5.5.2-javadoc.jar:dist/lib/itext-pdfa-5.5.2-sources.jar:dist/lib/levigo-jbig2-imageio-1.6.1.jar:dist/lib/itextpdf-5.5.2-sources.jar:dist/lib/itext-xtra-5.5.2.jar:dist/lib/pdfbox-app-1.8.6.jar:dist/lib/itext-pdfa-5.5.2.jar:dist/lib/itext-xtra-5.5.2-javadoc.jar javaapplication1/JavaApplication1'
              child = exec('cat *.js bad_file | wc -l',
              function (error, stdout, stderr) {
                console.log('stdout: ' + stdout);
                console.log('stderr: ' + stderr);
                if (error !== null) {
                  console.log('exec error: ' + error);
                }
                return res.json(200, assignment);
              });
            })
          });
        })
      })
    })
  })
};

function handleError(res, err) {
  console.log('error: ', err);
  return res.send(500, err);
}