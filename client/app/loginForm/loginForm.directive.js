'use strict';

angular.module('babyDoctorApp')
  .directive('loginForm', function () {
    return {
      templateUrl: 'app/loginForm/loginForm.html',
      restrict: 'EA',
      controller: 'LoginCtrl', 
      link: function (scope, element, attrs) {
      }
    };
  });