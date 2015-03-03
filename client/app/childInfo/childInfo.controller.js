'use strict';

angular.module('babyDoctorApp')
  .controller('ChildInfoCtrl', function ($scope, Auth, $http, $state, $cookieStore) {
    // $('.datepicker').pickadate();

$scope.getCurrentUser = Auth.getCurrentUser();


$scope.token = $cookieStore.get('token')



      $scope.child = {
    name: "",
    dob: null,
    ssn: "",
    conditions: "",
    symptoms: ""
  }


        $scope.truevaultPostDoc = function() {
            $cookieStore.remove('token')

            $cookieStore.remove('token')
            var apiKey = $scope.getCurrentUser.api_key
            var doc = {
                method: 'POST',
                url: "https://api.truevault.com/v1/vaults/6ee2c09a-c2cd-4970-ac08-5900827afa52/documents",
                headers: {
                    'Authorization':'Basic ' + btoa(apiKey + ":") ,
                    'Content-Type': 'multipart/form-data'
                },
                params: {
                    document: btoa(JSON.stringify($scope.child))
                }
            }

            $http(doc).success(function(data) {
                console.log(data)
                console.log($scope.token)
               $cookieStore.put('token', $scope.token);

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
