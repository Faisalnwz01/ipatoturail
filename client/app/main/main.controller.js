'use strict';

angular.module('babyDoctorApp')
    .controller('MainCtrl', function($scope, $http, socket, $state) {

// $http.get('/api/users/doctors/get').then(function(data){
//     console.log(data, 'asfffffffffffffffff')
// })





    //     $scope.resetForm = function() {
    //         $scope.address = {
    //             name: "",
    //             street1: "",
    //             street2: "",
    //             city: "",
    //             state: "",
    //             zip: "",
    //             phone: ""
    //         }

    //     }

    //     $scope.address = {
    //         name: "",
    //         street1: "",
    //         street2: "",
    //         city: "",
    //         state: "",
    //         zip: "",
    //         phone: ""
    //     }
    //     $scope.submit = function() {
    //         $http.post('/api/users/address', $scope.address).then(function(data) {
    //             if (data.data === "Address is invalid") {
    //                 console.log("Address is invalid")
    //             } else {
    //                 console.log("Address Is Goood")
    //                 $state.go('childInfo')
    //             }
    //         })
    //     }

    //      $scope.user = {};
    // $scope.errors = {};



// var apiKey = "f9fa5cdf-2de8-4ba3-9a0d-0bd12a8b4518"
// var vaultId = "d66fc65c-6d22-41f9-953a-612c45c7082e"

// var req = {
//  method: 'POST',
//  url: 'https://api.truevault.com/v1/users',
//  headers: {
//   'Authorization' : 'Basic ' + btoa(apiKey + ":"), 
//    'Content-Type': 'multipart/form-data'
//  },

// params: {username: 'asdfasfd', 
//          'password': 'swagasgsdf', 
//         }
// }

// $http(req).success(function(res){console.log(res)}).error(function(err){console.log(err)});


// //Oauth Starts
//     $scope.login = function(form) 
//       $scope.submitted = true;

//       if(form.$valid) {
//         Auth.login({
//           email: $scope.user.email,
//           password: $scope.user.password
//         })
//         .then( function() {
//           // Logged in, redirect to home
//           $location.path('/');
//         })
//         .catch( function(err) {
//           $scope.errors.other = err.message;
//         });
//       }
//     };

//     $scope.loginOauth = function(provider) {
//       $window.location.href = '/auth/' + provider;
//     };
    });