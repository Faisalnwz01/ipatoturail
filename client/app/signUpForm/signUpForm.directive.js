'use strict';

angular.module('babyDoctorApp')
  .directive('signUpForm', function () {
    return {
      templateUrl: 'app/signUpForm/signUpForm.html',
      restrict: 'EA',
      controller: "SignupCtrl", 
      link: function (scope, element, attrs) {
      }
    };
  });