'use strict';

angular.module('babyDoctorApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('doctorSignup', {
        url: '/doctorSignup',
        templateUrl: 'app/doctorSignup/doctorSignup.html',
        controller: 'DoctorSignupCtrl'
      });
  });