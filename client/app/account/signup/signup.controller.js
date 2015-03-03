'use strict';

angular.module('babyDoctorApp')
  .controller('SignupCtrl', function($scope, Auth, $location, $window, $http) {
      $scope.users = {};
      $scope.errors = {};
        var apiKey = "f9fa5cdf-2de8-4ba3-9a0d-0bd12a8b4518"
        var vaultId = "6ee2c09a-c2cd-4970-ac08-5900827afa52"


$scope.update = function(res){
        var updateGroup = {
          method: 'PUT',
          url: 'https://api.truevault.com/v1/groups/' + $scope.groupId,
          headers: {
            'Authorization': 'Basic ' + btoa(apiKey + ":"),
            'Content-Type': 'multipart/form-data'
          },

          params: {
            user_ids: res.user.user_id, 
            operation: 'APPEND'
          }
        }
        console.log($scope.groupId)
          $http(updateGroup).success(function(res) {
            console.log(res)
          }).error(function(err) {
            console.log(err)
          })

}

      $scope.group = function() {
      

            var policy = JSON.stringify([{
              "Activities": "CRU",
              "Resources": [
                "Vault::", "Vault::.*::Document::.*"
              ]
            }])
       
         
     policy =btoa(policy)
        var group = {
          method: 'POST',
          url: 'https://api.truevault.com/v1/groups',
          headers: {
            'Authorization': 'Basic ' + btoa(apiKey + ":"),
            'Content-Type': 'multipart/form-data'
          },

          params: {
            name: $scope.users.name + " group",
            "policy": policy
          }
        }

          $http(group).success(function(res) {
            console.log(res)
            $scope.groupId = res.group.group_id; 
          }).error(function(err) {
            console.log(err)
          })
        }


        $scope.register = function() {
          $scope.group()
          var apiKey = "f9fa5cdf-2de8-4ba3-9a0d-0bd12a8b4518"

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
             $scope.update(res)
            Auth.createUser({
                name: $scope.users.name,
                email: $scope.users.email,
                password: $scope.users.password,
                user_id: res.user.user_id,
                api_key: res.user.api_key
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