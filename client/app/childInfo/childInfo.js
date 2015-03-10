'use strict';

angular.module('babyDoctorApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('childInfo', {
        url: '/childInfo',
        templateUrl: 'app/childInfo/childInfo.html',
        controller: 'ChildInfoCtrl',
         authenticate: true
      });
  });