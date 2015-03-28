'use strict';

angular.module('babyDoctorApp')
    .controller('ConfirmationPageCtrl', function($scope) {
        $scope.message = 'Hello';
        $scope.date = new Date()

    $scope.fortyMinutesLater = new Date($scope.date.getTime() + (40 * 60 * 1000));
    

    });
