'use strict';

angular.module('babyDoctorApp')
    .controller('ChildInfoCtrl', function($scope, Auth, $http, $state, $cookieStore, $location, $stateParams) {
        // $('.datepicker').pickadate();

        $scope.getCurrentUser = Auth.getCurrentUser();

        $scope.token = $cookieStore.get('token')
        $scope.child = {
            name: "",
            dob: "",
            ssn: "",
            conditions: "",
            symptoms: "",
            allergies: ""
        }

        $scope.postDocumentID = function() {
            // console.log($scope.getCurrentUser)
            $scope.getCurrentUser.document_id = $scope.document_id
                // console.log($scope._id)
                // console.log($scope.getCurrentUser)
            $http.put('api/users/' + $scope._id, $scope.getCurrentUser).then(function(user) {
                var user = Auth.getCurrentUser();

                console.log(user, 'Faisalllllllllllllllllllllllllllllll')

                $scope.order = {
                    ParentName: user.name,
                    document_id: user.document_id,
                    phone: user.address.phone,
                    email: user.email,
                    address: user.address,
                    status: "OPEN"
                }
                $http.post('api/orders/', $scope.order).then(function(order) {
                    // console.log(order, 'here i am find me here')
                    // console.log($scope.order, 'here i am find order here')

                    $location.path('/stripe/' + order.data._id)

                    // console.log(order)
                })
            })
        }


        $scope.truevaultPostDoc = function() {
            $cookieStore.remove('token')

            $cookieStore.remove('token')
            var apiKey = $scope.getCurrentUser.api_key
            var doc = {
                method: 'POST',
                url: "https://api.truevault.com/v1/vaults/6ee2c09a-c2cd-4970-ac08-5900827afa52/documents",
                headers: {
                    'Authorization': 'Basic ' + btoa(apiKey + ":"),
                    'Content-Type': 'multipart/form-data'
                },
                params: {
                    document: btoa(JSON.stringify($scope.child))
                }
            }

            $http(doc).success(function(data) {
                console.log(data)
                $scope.document_id = data.document_id;
                console.log($scope.token)
                $cookieStore.put('token', $scope.token);
                $scope.postDocumentID();

            }).error(function(data) {
                console.log(data)
            });
        };



        $scope.submitChildInfo = function() {
            $scope.truevaultPostDoc();




        }
    });