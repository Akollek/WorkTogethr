'use strict';

angular.module('worktogethrApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('assignment', {
        url: '/assignment/:assignment_id',
        templateUrl: 'app/assignment/assignment.html',
        controller: 'AssignmentCtrl'
      })
      .state('assignment.question', {
        url: '/question/:question_id',
        templateUrl: 'app/assignment/assignment.html',
        controller: 'AssignmentCtrl'
      });
  });
