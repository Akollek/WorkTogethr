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

// ![CDATA[
    var client_id = "jsT4n6rAa2I";
    var client_secret = "sX2W2h_eLQE";
    var timestamp = new Date().getTime();
    var uniqueid = "test";

    var hash = CryptoJS.HmacSHA256(client_id + uniqueid + timestamp, client_secret);
    var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
    var signature = hashInBase64.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
// ]]

function get_token() {
    var in_options = {
        uniqueid: uniqueid,
        timestamp: timestamp,
        signature: signature,
        get_accesstoken: function(result) {
            alert("access_token: " + result.access_token + " expires in: " + result.expires_in);
        },
        error: function(result) {
            alert("error code: " + result.error_code + " message: " + result.error_message);
        }
    };
    Moxtra.setup(in_options);
}
