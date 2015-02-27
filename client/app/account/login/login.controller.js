'use strict';

angular.module('babyDoctorApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $window, $http, catalyze) {

var apikey = Config.catalyze_apikey;
    var host = "https://api.catalyze.io";





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
