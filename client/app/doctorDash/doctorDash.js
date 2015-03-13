'use strict';

angular.module('babyDoctorApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('doctorDash', {
        url: '/doctorDash',
        templateUrl: 'app/doctorDash/doctorDash.html',
        controller: 'DoctorDashCtrl' 
        // authenticate: true
      });
  });