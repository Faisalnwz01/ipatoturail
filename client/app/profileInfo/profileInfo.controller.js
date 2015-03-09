'use strict';

angular.module('babyDoctorApp')
    .controller('ProfileInfoCtrl', function($scope, Auth, $http, $state, $cookieStore) {

$scope.getCurrentUser = Auth.getCurrentUser();



$scope.token = $cookieStore.get('token')




$scope.resetForm = function() {
            $scope.address = {
                street1: "",
                street2: "",
                city: "",
                state: "",
                zip: "",
                phone: ""
            }
        }

        $scope.address = {
            street1: "",
            street2: "",
            city: "",
            state: "",
            zip: "",
            phone: "",
            
        }
            $scope._id =  $scope.getCurrentUser._id
            console.log($scope.user_id )

        $scope.postAddress = function(address){
            console.log($scope.getCurrentUser)
            $scope.getCurrentUser.address = address
            console.log($scope._id)
            $http.put('api/users/'+$scope._id, $scope.getCurrentUser).then(function(user){
                console.log(user, "userrrrrrrrrr")
            })
        }


        // $scope.truevaultPostDoc = function() {
        //     $cookieStore.remove('token')

        //     $cookieStore.remove('token')
        //     var apiKey = $scope.getCurrentUser.api_key
        //     var doc = {
        //         method: 'POST',
        //         url: "https://api.truevault.com/v1/vaults/6ee2c09a-c2cd-4970-ac08-5900827afa52/documents",
        //         headers: {
        //             'Authorization':'Basic ' + btoa(apiKey + ":") ,
        //             'Content-Type': 'multipart/form-data'
        //         },
        //         params: {
        //             document: btoa(JSON.stringify($scope.address))
        //         }
        //     }

        //     $http(doc).success(function(data) {
        //         console.log(data)
        //         console.log($scope.token)
        //        $cookieStore.put('token', $scope.token);

        //     }).error(function(data) {
        //         console.log(data)
        //     });
        // };

          // $scope.truevaultPostDoc();

        $scope.submit = function() {
            $http.post('/api/users/address', $scope.address).then(function(data) {
                if (data.data === "Address is invalid") {
                    console.log("Address is invalid")
                } else {
                    $scope.postAddress($scope.address); 

                    console.log("Address Is Goood")
                    $state.go('childInfo')
                }
            })
        }

        $scope.user = {};
        $scope.errors = {};

    });