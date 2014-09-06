'use strict';

angular.module('worktogethrApp')
  .controller('AssignmentCtrl', function ($scope, $location, $http
  , $q
  , $window
  , $upload
  ) {
    $scope.question_view = false;
    $scope.myModelObj;

    $scope.onFileSelect = function($files) {
      console.log('onFileSelect');

      //$files: an array of files selected, each file has name, size, and type.
      for (var i = 0; i < $files.length; i++) {
        var file = $files[i];
        $scope.upload = $upload.upload({
          url: '/api/assignments/upload', //upload.php script, node.js route, or servlet url
          method: 'POST', // or 'PUT',
          //headers: {'header-key': 'header-value'},
          //withCredentials: true,
          data: {myObj: $scope.myModelObj},
          file: file, // or list of files ($files) for html5 only
          //fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
          // customize file formData name ('Content-Disposition'), server side file variable name. 
          //fileFormDataName: myFile, //or a list of names for multiple files (html5). Default is 'file' 
          // customize how data is added to formData. See #40#issuecomment-28612000 for sample code
          //formDataAppender: function(formData, key, val){}
        }).progress(function(evt) {
          console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
        }).success(function(data, status, headers, config) {
          // file is uploaded successfully
          console.log(data);
        });
        //.error(...)
        //.then(success, error, progress); 
        // access or attach event listeners to the underlying XMLHttpRequest.
        //.xhr(function(xhr){xhr.upload.addEventListener(...)})
      }
      /* alternative way of uploading, send the file binary with the file's content-type.
         Could be used to upload files to CouchDB, imgur, etc... html5 FileReader is needed. 
         It could also be used to monitor the progress of a normal http post/put request with large data*/
      // $scope.upload = $upload.http({...})  see 88#issuecomment-31366487 for sample code.
    };
    $scope.onFileSelect();
    //$scope.assignment_questions = [
      //{
        //_id: 1
        //, img: 'http://i.imgur.com/S84BANr.jpg'
      //}
      //, {
        //_id: 2
        //, img: 'http://i.imgur.com/S84BANr.jpg'
      //}
    //];
    $scope.assignment_id = $location.$$url.split('/')[2];

    // fetches assignment questions
    $scope.getAssignmentQuestions = function(assignment_id) {
      $http.get('/api/assignments/' + assignment_id)
      .success(function(data, status, headers, config) {
        console.log('questions: ', data.questions);
        $scope.assignment_questions = data.questions;

        console.log($location.$$url.split('/')[3]);
        if($location.$$url.split('/')[3] == 'question') {
          $scope.question_view = true;
          $scope.question_id = $location.$$url.split('/')[4];

          // gets appropriate question_img
          $scope.question_img = _.filter($scope.assignment_questions, function(q) {
            if(q._id == $scope.question_id) {
              return true;
            } else {
              return false;
            }
          })[0].img;
          console.log('asdf', $scope.question_img);
        } else {
          $scope.question_view = false;
        }
      })
    }
    $scope.assignment_questions = $scope.getAssignmentQuestions($scope.assignment_id);

    
    $scope.clickQuestion = function(question_id) {
      $location.url('assignment/' + $scope.assignment_id + '/question/' + question_id);
      setTimeout(function() {
        $window.location.reload();
      }, 500) // mini timeout to allow url to update
      //$route.reload();
    }
  });
