'use strict';

angular.module('babyDoctorApp')
  .controller('SignupCtrl', function ($scope, Auth, $location, $window) {
    $scope.users = {};
    $scope.errors = {};

    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.createUser({
          name: $scope.users.name,
          email: $scope.users.email,
          password: $scope.users.password
        })
        .then( function() {
          // Account created, redirect to home
          $location.path('/profileInfo');
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };

    $scope.isLoggedIn = Auth.isLoggedIn;
  });
