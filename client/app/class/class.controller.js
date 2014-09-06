'use strict';

angular.module('worktogethrApp')
  .controller('ClassCtrl', function (
  $scope
  , $stateParams
  ) {
    $scope.class_id = $stateParams.class_id;
    console.log($stateParams.class_id);
    $scope.message = 'Hello';
  });
