'use strict';

angular.module('babyDoctorApp')
  .controller('ChildInfoCtrl', function ($scope, $http, $state) {
    $('.datepicker').pickadate();

      $scope.child = {
    name: "",
    dob: null,
    ssn: "",
    conditions: "",
    symptoms: ""
  }

$scope.submitChildInfo = function(){
  console.log($scope.child)
  $state.go('stripe')


}
  });
