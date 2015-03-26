'use strict';

angular.module('babyDoctorApp')
    .controller('FaqCtrl', function($scope) {
        $scope.oneAtATime = false;
        $scope.status = {
            isFirstOpen: true,
            isFirstDisabled: false
        };
    });
