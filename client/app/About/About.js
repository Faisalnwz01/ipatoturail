'use strict';

angular.module('babyDoctorApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('About', {
        url: '/About',
        templateUrl: 'app/About/About.html',
        controller: 'AboutCtrl'
      });
  });