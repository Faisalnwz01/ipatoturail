'use strict';

angular.module('babyDoctorApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('doctorLogin', {
        url: '/doctorLogin',
        templateUrl: 'app/doctorLogin/doctorLogin.html',
        controller: 'DoctorLoginCtrl'
      });
  });