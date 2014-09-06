'use strict';

angular.module('worktogethrApp')
  .controller('ClassCtrl', function (
  $scope
  , $stateParams
  , $location
  ) {
    $scope.class_id = $stateParams.class_id;
    console.log($stateParams.class_id);
    console.log($stateParams.assignment_id);
    if($location.$$url.split('/')[3] == 'assignment') {
      $scope.assignment_view = true;
    } else {

    }
    $scope.message = 'Hello';
  });
