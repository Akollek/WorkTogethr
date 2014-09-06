'use strict';

angular.module('worktogethrApp')
  .controller('AssignmentCtrl', function ($scope, $location) {
    $scope.question_view = false;

    $scope.assignment_questions = [
      {
        _id: 1
        , img: 'http://i.imgur.com/S84BANr.jpg'
      }
      , {
        _id: 2
        , img: 'http://i.imgur.com/S84BANr.jpg'
      }
    ];
    $scope.assignment_id = $location.$$url.split('/')[2];


    if($location.$$url.split('/')[3] == 'question') {
      $scope.question_view = true;
      $scope.question_id = $location.$$url.split('/')[4];
      $scope.question_img = _.filter($scope.assignment_questions, function(q) {
        if(q._id == $scope.question_id) {
          return true;
        } else {
          return false;
        }
      })[0].img;
    } else {
      $scope.question_view = false;
    }
  });
