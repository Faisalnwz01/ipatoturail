'use strict';

angular.module('babyDoctorApp')
  .controller('ChildInfoCtrl', function ($scope, $http, $state) {
    // $('.datepicker').pickadate();

      $scope.child = {
    name: "",
    dob: null,
    ssn: "",
    conditions: "",
    symptoms: ""
  }

  $scope.truevaultPostDoc = function() {

            var apiKey = "f9fa5cdf-2de8-4ba3-9a0d-0bd12a8b4518"
            var doc = {
                method: 'POST',
                url: "https://api.truevault.com/v1/vaults/d66fc65c-6d22-41f9-953a-612c45c7082e/documents",
                headers: {
                    'Authorization': 'Basic ' + btoa(apiKey + ":"),
                    'Content-Type': 'multipart/form-data'
                },
                params: {
                    document: btoa(JSON.stringify($scope.child))
                }
            }

            $http(doc).success(function(data) {
                console.log(data)
            }).error(function(data) {
                console.log(data)
            });
        };

$scope.submitChildInfo = function(){
  $scope.truevaultPostDoc();
  console.log($scope.child)
  $state.go('stripe')


}
  });
