'use strict';

angular.module('babyDoctorApp')
  .controller('ProfileInfoCtrl', function ($scope, $http, $state) {
    
        $scope.resetForm = function() {
            $scope.address = {
                name: "",
                street1: "",
                street2: "",
                city: "",
                state: "",
                zip: "",
                phone: ""
            }

        }

        $scope.address = {
            name: "",
            street1: "",
            street2: "",
            city: "",
            state: "",
            zip: "",
            phone: ""
        }
        
        $scope.submit = function() {
            $http.post('/api/users/address', $scope.address).then(function(data) {
                if (data.data === "Address is invalid") {
                    console.log("Address is invalid")
                } else {
                    console.log("Address Is Goood")
                    $state.go('childInfo')
                }
            })
        }

         $scope.user = {};
    $scope.errors = {};

  });
