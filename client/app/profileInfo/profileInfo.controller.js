'use strict';

angular.module('babyDoctorApp')
    .controller('ProfileInfoCtrl', function($scope, Auth, $http, $state, $cookieStore) {

$scope.getCurrentUser = Auth.getCurrentUser();
console.log($scope.getCurrentUser)

console.log($scope.getCurrentUser.user_id)
$scope.token = $cookieStore.get('token')
console.log($scope.token, 'tokennnnnnnnnnnnnnnnnnn')

$cookieStore.remove('token')
console.log($cookieStore.get('token'))


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
             // var vaultId = "6ee2c09a-c2cd-4970-ac08-5900827afa52"

             var apiKey = "f9fa5cdf-2de8-4ba3-9a0d-0bd12a8b4518"
             console.log(apiKey)
            //var apiKey = "f1f04b66-ea1f-4616-87e4-e357c9b95b13"
            var doc = {
                method: 'POST',
                url: "https://api.truevault.com/v1/vaults/6ee2c09a-c2cd-4970-ac08-5900827afa52/documents",
                headers: {
                    'Authorization':'Basic ' + btoa(apiKey + ":") ,
                    'Content-Type': 'multipart/form-data'
                },
                params: {
                    document: btoa(JSON.stringify($scope.address))
                }
            }

            $http(doc).success(function(data) {
                console.log(data)
                $cookieStore.set('token') = $scope.token
                config.headers.Authorization = 'Bearer ' + $cookieStore.get('token')

            }).error(function(data) {
                console.log(data)
            });
        };

          // $scope.truevaultPostDoc();

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