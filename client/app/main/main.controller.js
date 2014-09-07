'use strict';

angular.module('worktogethrApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.courses = [];

    $http.get('/api/courses/').success(function(data) {
      console.log('data: ', data);
      $scope.courses = data;
    });

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addClass = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/courses/', { name: $scope.class_id})
      .success(function(data) {
        $scope.courses.push(data);
      })
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  });
