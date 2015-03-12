'use strict';

angular.module('babyDoctorApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('order', {
        url: '/order/:id',
        templateUrl: 'app/order/order.html',
        controller: 'OrderCtrl'
      });
  });