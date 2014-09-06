'use strict';

angular.module('worktogethrApp')
  .controller('AssignmentCtrl', function ($scope, $location, $http
  , $q
  , $window
  , $upload
  ) {
    $scope.question_view = false;
    $scope.myModelObj;

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
          $scope.question_id = $location.$$url.split('/')[4];

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
                var options = {
      binder_name: $scope.question_id,
      iframe: true,
      tagid4iframe: "container",
      iframewidth: "920px",
      iframeheight: "650px",
      autostart_meet: false,
      autostart_note: true,
      start_chat: function(event) {
      alert("Chat started session Id: " + event.session_id);
      },
      start_meet: function(event) {
      alert("Meet started session key: " + event.session_key + " session id: " + event.session_id);
      },
      end_meet: function(event) {
      alert("Meet end event");
      },
      invite_member: function(event) {
      alert("Invite member into binder Id: " + event.binder_id);
      },
      request_note: function(event) {
      alert("Note start request");
      },
      error: function(event) {
      alert("Chat error code: " + event.error_code + " error message: " + event.error_message);
      }
      };
      Moxtra.chat(options);
      $scope.latex="latex";

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
