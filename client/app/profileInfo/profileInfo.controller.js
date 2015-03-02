'use strict';

angular.module('babyDoctorApp')
    .controller('ProfileInfoCtrl', function($scope, Auth, $http, $state) {

$scope.getCurrentUser = Auth.getCurrentUser();
console.log($scope.getCurrentUser)

console.log($scope.getCurrentUser.user_id)


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
            phone: "",
            // user_id: $scope.getCurrentUser.user_id
        }


        $scope.truevaultPostDoc = function() {

            var apiKey = "f9fa5cdf-2de8-4ba3-9a0d-0bd12a8b4518"
            var doc = {
                method: 'POST',
                url: "https://api.truevault.com/v1/vaults/d66fc65c-6d22-41f9-953a-612c45c7082e/documents",
                headers: {
                    'Authorization': 'Basic ' + btoa(apiKey + ":"),
                    'Content-Type': 'multipart/form-data'
                },
                params: {
                    document: btoa(JSON.stringify($scope.address))
                }
            }

            $http(doc).success(function(data) {
                console.log(data)
            }).error(function(data) {
                console.log(data)
            });
        };

          $scope.truevaultPostDoc();

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