'use strict';

angular.module('babyDoctorApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('stripe', {
        url: '/stripe',
        templateUrl: 'app/stripe/stripe.html',
        controller: 'StripeCtrl',
         authenticate: true
      });
  });