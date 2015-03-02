'use strict';

angular.module('babyDoctorApp')
  .controller('SignupCtrl', function($scope, Auth, $location, $window, $http) {
      $scope.users = {};
      $scope.errors = {};


      $scope.group = function() {
        var apiKey = "f9fa5cdf-2de8-4ba3-9a0d-0bd12a8b4518"
        var vaultId = "d66fc65c-6d22-41f9-953a-612c45c7082e"

            var pol = JSON.stringify([{
              "Activities": "C",
              "Resources": [
                "Vault::"
              ]
            }])
       
         
          var fin =btoa(pol)
          


        var group = {
          method: 'POST',
          url: 'https://api.truevault.com/v1/groups',
          headers: {
            'Authorization': 'Basic ' + btoa(apiKey + ":"),
            'Content-Type': 'multipart/form-data'
          },

          params: {
            name: "yourtrippingsonjkhkjhklhkljh",
            "policy": fin
          }
        }

          $http(group).success(function(res) {
            console.log(res)
          }).error(function(err) {
            console.log(err)
          })
        }


        $scope.register = function() {
          // var apiKey = "f9fa5cdf-2de8-4ba3-9a0d-0bd12a8b4518"
          // var vaultId = "d66fc65c-6d22-41f9-953a-612c45c7082e"

          //    var group = {
          //     method: 'POST',
          //     url: 'https://api.truevault.com/v1/groups',
          //     headers: {
          //         'Authorization': 'Basic ' + btoa(apiKey + ":"),
          //         'Content-Type': 'multipart/form-data'
          //     },

          //     params: {
          //       name: "yourtrippingson",     
          //       policy: { "Resources": ["Vault::.*", "Vault::.*::Document::.*"],
          //      "Activities": "CRUD"
          //     }
          //   }
          // }

          // $http(group).success(function(res){
          //   console.log(res)
          // })
          var apiKey = "f9fa5cdf-2de8-4ba3-9a0d-0bd12a8b4518"
          var vaultId = "d66fc65c-6d22-41f9-953a-612c45c7082e"


          var req = {
            method: 'POST',
            url: 'https://api.truevault.com/v1/users',
            headers: {
              'Authorization': 'Basic ' + btoa(apiKey + ":"),
              'Content-Type': 'multipart/form-data'
            },

            params: {
              username: $scope.users.name,
              password: $scope.users.password
            }
          }

          $http(req).success(function(res) {
            console.log(res)
            Auth.createUser({
                name: $scope.users.name,
                email: $scope.users.email,
                password: $scope.users.password,
                user_id: res.user.user_id
              })
              .then(function() {

                // Account created, redirect to home
                $location.path('/profileInfo');
              })
              .catch(function(err) {
                err = err.data;
                $scope.errors = {};

                // Update validity of form fields that match the mongoose errors
                angular.forEach(err.errors, function(error, field) {
                  form[field].$setValidity('mongoose', false);
                  $scope.errors[field] = error.message;
                });
              });


          }).error(function(err) {
            console.log(err)
          });
          //end of truevault post create user
        };


        $scope.register1 = function(form) {
          $scope.submitted = true;
          if (form.$valid) {

            Auth.createUser({
                name: $scope.users.name,
                email: $scope.users.email,
                password: $scope.users.password
              })
              .then(function() {

                // Account created, redirect to home
                $location.path('/profileInfo');
              })
              .catch(function(err) {
                err = err.data;
                $scope.errors = {};

                // Update validity of form fields that match the mongoose errors
                angular.forEach(err.errors, function(error, field) {
                  form[field].$setValidity('mongoose', false);
                  $scope.errors[field] = error.message;
                });
              });



          }
        };

        $scope.loginOauth = function(provider) {
          $window.location.href = '/auth/' + provider;
        };

        $scope.isLoggedIn = Auth.isLoggedIn;
      });