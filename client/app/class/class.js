'use strict';

angular.module('worktogethrApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('class', {
        url: '/class/:class_id',
        templateUrl: 'app/class/class.html',
        controller: 'ClassCtrl'
      });
  });
