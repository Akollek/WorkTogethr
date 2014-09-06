'use strict';

angular.module('worktogethrApp')
  .controller('ClassCtrl', function (
  $scope
  , $http
  , $stateParams
  , $location
  ) {
    $scope.question_images = ['enter image url', 'http://i.imgur.com/S84BANr.jpg'];

    $scope.class_id = $stateParams.class_id;
    console.log($stateParams.class_id);
    console.log($stateParams.assignment_id);
    if($location.$$url.split('/')[3] == 'assignment') {
      $scope.assignment_view = true;
    } else {

    }
    $scope.message = 'Hello';


    // hackily adds an assignment with hardcoded questions
    $scope.manualAddAssignment = function() {
      $http.post('/api/assignments/manual_upload', {question_images: $scope.question_images})
        .success(function(data, status, headers, config) {
          console.log('assignment: ', data);
        })
    };

    // gets all assignments
    $scope.getAssignments = function() {
      $http.get('/api/assignments')
        .success(function(data, status, headers, config) {
          console.log('assignments: ', data);
          $scope.assignments = data;
        })
    };
    $scope.getAssignments();

  });
