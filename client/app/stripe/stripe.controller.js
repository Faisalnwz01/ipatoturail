'use strict';

angular.module('babyDoctorApp')
    .controller('StripeCtrl', function($scope, $http) {
        $scope.message = 'Hello';
        Stripe.setPublishableKey('pk_test_CeLioPTKCLddQsFlJIM93b4V')

        $scope.paymentNow = function() {
            var time = new Date()
            time = time.getHours()
            if (time >= 17 && time < 20) {
                $scope.chargeNow =  250;
            } else if (time >= 20 && time < 24) {
                $scope.chargeNow =  350;
            } else if (time >= 24 && time < 2) {
                $scope.chargeNow =  450;
            } else {
                $scope.chargeNow = "sorry we are not open now"
            }
        };
         $scope.paymentNow()



        $scope.handleStripe = function(status, response) {
            if (response.error) {
                console.log(response, 'errorrroeoer')
                    // there was an error. Fix it.
            } else {
                console.log(response, 'not error')

                // got stripe token, now charge it or smt
                var token = response.id
                    // var timenow= Date()
                    // var charedtotal= {token: token, time:timenow}
                var time = new Date()

                time = time.getHours()

                response.time = time
                console.log(time, "timeeeeeeeeeeeeeeeeee")

                console.log(response.time, "response.timeeeeeeeeeeeeeeeee")

                $http.post('api/users/stripe', response).then(function(data) {
                    console.log(data)
                })
            }
        }
    });