'use strict';

angular.module('babyDoctorApp')
  .controller('DoctorDashCtrl', function ($scope, $http) {
   
   $scope.truevaultGetDocs = function() {
            // $cookieStore.remove('token')
            // $cookieStore.remove('token')
            var apiKey = "f9fa5cdf-2de8-4ba3-9a0d-0bd12a8b4518"
            var doc = {
                method: 'Get',
                url: "https://api.truevault.com/v1/vaults/6ee2c09a-c2cd-4970-ac08-5900827afa52/documents/19e15dae-e52a-4f85-9cd8-f59321a13242",
                headers: {
                    'Authorization':'Basic ' + btoa(apiKey + ":") ,
                    'Content-Type': 'multipart/form-data'
                }
                // params: {
                //     document: btoa(JSON.stringify($scope.address))
                // }
            }
            $http(doc).success(function(data) {
                // console.log(data)
               console.log(JSON.parse(atob(data)))
              
            	// return JSON.parse(atob(data));

            }).error(function(data) {
                console.log(data)
            });
        }

        

 })