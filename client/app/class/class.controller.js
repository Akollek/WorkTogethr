'use strict';



angular.module('worktogethrApp')
  .controller('ClassCtrl', function (
  $scope
  , $http
  , $stateParams
  , $location
  , upload
  ) {
    $scope.question_images = ['enter image url', 'http://i.imgur.com/S84BANr.jpg'];

    $scope.doUpload = function () {
      upload({
        url: '/upload',
        data: {
          anint: 123,
          aBlob: Blob([1,2,3]), // Only works in newer browsers
          aFile: $scope.myFile, // a jqLite type="file" element, upload() will extract all the files from the input and put them into the FormData object before sending.
        }
      }).then(
        function (response) {
          console.log(response.data); // will output whatever you choose to return from the server on a successful upload
          console.log('my file: ', $scope.myFile);

        },
        function (response) {
            console.error(response); //  Will return if status code is above 200 and lower than 300, same as $http
        }
      );
    }

    //$scope.onFileSelect = function($files) {
      //console.log('onFileSelect');

      ////$files: an array of files selected, each file has name, size, and type.
      //for (var i = 0; i < $files.length; i++) {
        //var file = $files[i];
        //$scope.upload = $upload.upload({
          //url: '/api/assignments/upload', //upload.php script, node.js route, or servlet url
          //method: 'POST', // or 'PUT',
          ////headers: {'header-key': 'header-value'},
          ////withCredentials: true,
          //data: {myObj: $scope.myModelObj},
          //file: file, // or list of files ($files) for html5 only
          ////fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
          //// customize file formData name ('Content-Disposition'), server side file variable name. 
          ////fileFormDataName: myFile, //or a list of names for multiple files (html5). Default is 'file' 
          //// customize how data is added to formData. See #40#issuecomment-28612000 for sample code
          ////formDataAppender: function(formData, key, val){}
        //}).progress(function(evt) {
          //console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
        //}).success(function(data, status, headers, config) {
          //// file is uploaded successfully
          //console.log(data);
        //});
        ////.error(...)
        ////.then(success, error, progress); 
        //// access or attach event listeners to the underlying XMLHttpRequest.
        ////.xhr(function(xhr){xhr.upload.addEventListener(...)})
      //}
      //[> alternative way of uploading, send the file binary with the file's content-type.
         //Could be used to upload files to CouchDB, imgur, etc... html5 FileReader is needed. 
         //It could also be used to monitor the progress of a normal http post/put request with large data*/
      //// $scope.upload = $upload.http({...})  see 88#issuecomment-31366487 for sample code.
    //};
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
      var class_id = $location.$$url.split('/')[2];
      var update = {
        question_images: $scope.question_images
        , class_id: class_id
      };
      $http.post('/api/assignments/manual_upload', update)
        .success(function(data, status, headers, config) {
          console.log('assignment: ', data);
          $scope.assignments.push(data);
        })
    };

    // gets all assignments
    // TODO: get only assignments for class
    $scope.getAssignments = function() {
      var class_id = $location.$$url.split('/')[2];
      $http.post('/api/assignments/get_my_assignments', {class_id: class_id})
        .success(function(data, status, headers, config) {
          console.log('assignments: ', data);
          $scope.assignments = data;
        })
    };
    $scope.getAssignments();

  });

//// ![CDATA[
    //var client_id = "jsT4n6rAa2I";
    //var client_secret = "sX2W2h_eLQE";
    //var timestamp = new Date().getTime();
    //var uniqueid = "test";

    //var hash = CryptoJS.HmacSHA256(client_id + uniqueid + timestamp, client_secret);
    //var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
    //var signature = hashInBase64.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
//// ]]

//function get_token() {
    //var in_options = {
        //uniqueid: uniqueid,
        //timestamp: timestamp,
        //signature: signature,
        //get_accesstoken: function(result) {
            //alert("access_token: " + result.access_token + " expires in: " + result.expires_in);
        //},
        //error: function(result) {
            //alert("error code: " + result.error_code + " message: " + result.error_message);
        //}
    //};
    //Moxtra.setup(in_options);
//}
