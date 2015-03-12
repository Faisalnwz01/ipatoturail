'use strict';

angular.module('babyDoctorApp')
    .controller('DoctorDashCtrl', function($scope, $http, Auth, $cookieStore) {
        $scope.getCurrentUser = Auth.getCurrentUser()
        $scope.truevaultGetDocs = function(docId) {
            $cookieStore.remove('token')
            $cookieStore.remove('token')
            var apiKey = "f9fa5cdf-2de8-4ba3-9a0d-0bd12a8b4518"
            var doc = {
                method: 'Get',
                url: "https://api.truevault.com/v1/vaults/6ee2c09a-c2cd-4970-ac08-5900827afa52/documents/" + docId,
                headers: {
                    'Authorization': 'Basic ' + btoa(apiKey + ":"),
                    'Content-Type': 'multipart/form-data'
                }
                // params: {
                //     document: btoa(JSON.stringify($scope.address))
                // }
            }
            $http(doc).success(function(data) {
                // console.log(data)

                console.log(JSON.parse(atob(data)), 'user data from true vault')

                // return JSON.parse(atob(data));

            }).error(function(data) {
                console.log(data)
            });
        }
        $scope.getDataTruevault = function(argument) {

            $http.get('api/orders').then(function(data) {


                for (var i = 0; i < data.data.length; i++) {
                    if (data.data[i].doctor_id === $scope.getCurrentUser.address.phone) {
                      console.log('data.data', data.data[i])
                        $scope.trueVaultDocId = data.data[i].document_id
                    console.log($scope.trueVaultDocId, 'document ID')
                    $scope.truevaultGetDocs($scope.trueVaultDocId)
                    console.log($scope.trueVaultDocId)
                  }
                };
            })
        }
    })