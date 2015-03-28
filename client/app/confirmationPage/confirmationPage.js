'use strict';

angular.module('babyDoctorApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('confirmationPage', {
        url: '/confirmationPage',
        templateUrl: 'app/confirmationPage/confirmationPage.html',
        controller: 'ConfirmationPageCtrl'
      });
  });