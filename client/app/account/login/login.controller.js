'use strict';

angular.module('babyDoctorApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $window, $http, catalyze) {


var apiKey = "f9fa5cdf-2de8-4ba3-9a0d-0bd12a8b4518"
var vaultId = "d66fc65c-6d22-41f9-953a-612c45c7082e"
var json = 'sadfasfsfsfafs'

var doc = {
 method: 'POST',
 url: "https://api.truevault.com/v1/vaults/"+ vaultId+"/documents/",
 headers: { 
  'Authorization' : 'Basic ' + btoa(apiKey + ":"), 
  'Content-Type': 'multipart/form-data'
 },
  params: { document: btoa(JSON.stringify(json))}
}

var get = {
 method: 'GET',
 url: "https://api.truevault.com/v1/vaults/"+ vaultId + "/documents/",
 headers: {
   'Authorization' : 'Basic ' + btoa(apiKey + ":"), 
   'Content-Type': 'multipart/form-data'
 }

}

var req = {
 method: 'POST',
 url: 'https://api.truevault.com/v1/users',
 headers: {
  'Authorization' : 'Basic ' + btoa(apiKey + ":"), 
   'Content-Type': 'multipart/form-data'
 },

params: {username: 'asdfasfd', 
         'password': 'swagasgsdf', 
        }
}

$http(req).success(function(res){console.log(res)}).error(function(err){console.log(err)});
$http(doc).success(function(data){console.log(data)}).error(function(data){console.log(data)});
// $http(get).success(function(resy){console.log(resy)}).error(function(data){console.log(data)});



    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
