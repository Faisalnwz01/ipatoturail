'use strict';

angular.module('babyDoctorApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('team', {
        url: '/team',
        templateUrl: 'app/team/team.html',
        controller: 'TeamCtrl'
      });
  });