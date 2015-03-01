'use strict';

angular.module('babyDoctorApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('profileInfo', {
        url: '/profileInfo',
        templateUrl: 'app/profileInfo/profileInfo.html',
        controller: 'ProfileInfoCtrl'
      });
  });