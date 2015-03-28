'use strict';

angular.module('babyDoctorApp')
    .controller('ProfileInfoCtrl', function($scope, Auth, $http, $state, $cookieStore, $mdDialog) {

        $scope.getCurrentUser = Auth.getCurrentUser();

 $scope.showAlert = function() {
    $mdDialog.show(
      $mdDialog.alert()
        .title('Sorry Service Not Avaiable')
        .content('Currently BabyDoctor is Only Avaiable in Manhattan, Ny. Please Enter a Valid Manhattan Address')
        .ariaLabel('Alert Dialog Demo')
        .ok('Got it!')
        
    );
  };


        $scope.token = $cookieStore.get('token')

        $scope.manArray = [10001, 10002, 10003, 10004, 10005, 10006, 10007, 10009, 10010, 10011, 10012, 10013, 10014, 10016, 10017, 10018, 10019, 10020, 10021, 10021, 10022, 10023, 10024, 10025, 10026, 10027, 10028, 10029, 10030, 10031, 10032,
            10033, 10034, 10035, 10036, 10037, 10038, 10039, 10040, 10044, 10065, 10069, 10075, 10103, 10110, 10111, 10112, 10115, 10119, 10128, 10152, 10153, 10154, 10162, 10165, 10167, 10168, 10169, 10170, 10171, 10172, 10173, 10174, 10177, 10199, 10271, 10278, 10279, 10280, 10282
        ]


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
        $scope._id = $scope.getCurrentUser._id

        $scope.postAddress = function(address) {
            $scope.getCurrentUser.address = address
                console.log($scope._id)
                $http.put('api/users/' + $scope._id, $scope.getCurrentUser).then(function(user) {
                    console.log(user, "userrrrrrrrrr")
                    $state.go('childInfo')
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
                    $scope.showAlert()
                } else {
                    $scope.postAddress($scope.address);
                    console.log("Address Is Goood")
                }
            })
        }
        

        $scope.user = {};
        $scope.errors = {};

    });
