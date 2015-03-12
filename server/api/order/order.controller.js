'use strict';

var _ = require('lodash');
var Order = require('./order.model');
var client = require('twilio')('AC055e2c406321688db01756618570376e', '3ed6d61c3e9a141a97903453820f65ba');
var twilio1 = require('twilio')

// Get list of orders
exports.index = function(req, res) {
    Order.find(function(err, orders) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(200, orders);
    });
};
var code4Digit;
var orderRecieved;

//Send the intitial text message with order id
exports.twilio = function(req, res) {
    console.log(req.body, 'req for the body wiht order')
    console.log('hit on back end')
    orderRecieved = req;
    var address = req.body.address;

    code4Digit = req.body.document_id.slice(0, 4)

    //Send an SMS text message
    // var numbers = ['+17185308914', '+16094396656']
    var numbers = ['+17185308914']
    for (var i = 0; i < numbers.length; i++) {
        client.sendMessage({

            to: numbers[i], // Any number Twilio can deliver to
            from: '+16096143170', // A number you bought from Twilio and can use for outbound communication
            body: 'Patient ' + address.name + ' with ph# ' + address.phone + ' needs help at ' + address.street1 + " " + address.city + " " + address.state + " " + address.zip + " if you accept text back  this code " + code4Digit // body of the SMS message

        }, function(err, responseData) { //this function is executed when a response is received from Twilio

            if (!err) { // "err" is an error received during the request, if any

                // "responseData" is a JavaScript object containing data received from Twilio.
                // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
                // http://www.twilio.com/docs/api/rest/sending-sms#example-1

                console.log(responseData.from); // outputs "+14506667788"
                console.log(responseData.body); // outputs "word to your mother."
                console.log('hit success')

            } else {
                console.log(err)
                console.log('hit error')
            }
        });
    }
}

// exports.texts = function(req,res){
//   console.log(req.body)
//   console.log('hit text controller')
//    if (twilio1.validateExpressRequest(req, 'd5c437f360516d9dabc6783981b51dd5')) {
//         var twiml = new twilio1.TwimlResponse();
//         twiml.sms('Hi!  Thanks for checking out my app!')
//         res.send(twiml.toString());
//     }
//    else {
//         res.send('you are not twilio.  Buzz off.');
//     }


// }
var counterFirstText = 0;
exports.texts = function(req, res) {
    var query = Order.where({
        document_id: orderRecieved.body.document_id
    });
    var response = req.body.Body.toLowerCase();
    query.findOne(function(err, order) {
    if (err) {return handleError(err)};
    if (order.doctor_id === undefined || order.doctor_id === null) {
        ///req.body.From === doctor that got the order
        // var docID = {doctor_id: req.body.From}
        var query = Order.where({
            document_id: orderRecieved.body.document_id
        });
        query.findOne(function(err, order) {
            if (err) return handleError(err);
            if (order) {
                console.log(order, 'here is the order i foudn for you sonnn')
                order.doctor_id = req.body.From
                console.log(order, 'here is the order i found for you with added doctor #######')
                order.save(function(err) {
                    if (err) {
                        console.log(err, 'errorin updating')
                    }
                });
            }
        });

        ////end of  adding doctor phone to order

        if (response === code4Digit) {
            console.log('hit yes')
            client.sendMessage({

                to: req.body.From, // Any number Twilio can deliver to
                from: '+16096143170', // A number you bought from Twilio and can use for outbound communication
                body: 'Hey, you got the order. You have 40 minutes to get to this location. Goodluck!!' // body of the SMS message

            }, function(err, responseData) { //this function is executed when a response is received from Twilio

                if (!err) { // "err" is an error received during the request, if any

                    // "responseData" is a JavaScript object containing data received from Twilio.
                    // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
                    // http://www.twilio.com/docs/api/rest/sending-sms#example-1

                    console.log(responseData.from); // outputs "+14506667788"
                    console.log(responseData.body); // outputs "word to your mother."
                    console.log('hit success')

                } else {
                    console.log(err)
                    console.log('hit error')
                }
            });

        } else {
            client.sendMessage({
                to: req.body.From, // Any number Twilio can deliver to
                from: '+16096143170', // A number you bought from Twilio and can use for outbound communication
                body: 'Please enter the excat four digit code.' // body of the SMS message

            }, function(err, responseData) { //this function is executed when a response is received from Twilio
                if (!err) { // "err" is an error received during the request,
                    console.log(responseData.from); // outputs "+14506667788"
                    console.log(responseData.body); // outputs "word to your mother."
                    console.log('hit success')
                } else {
                    console.log(err)
                    console.log('hit error')
                }
            });
        }
        counterFirstText++
    } else {
        client.sendMessage({
            to: req.body.From, // Any number Twilio can deliver to
            from: '+16096143170', // A number you bought from Twilio and can use for outbound communication
            body: 'Sorry you didnt get the order, GoodBye' // body of the SMS message

        }, function(err, responseData) { //this function is executed when a response is received from Twilio
            if (!err) { // "err" is an error received during the request,
                console.log(responseData.from); // outputs "+14506667788"
                console.log(responseData.body); // outputs "word to your mother."
                console.log('hit success')
            } else {
                console.log(err)
                console.log('hit error')
            }
        });
    }
  });



    // if (twilio1.validateExpressRequest(req, '3ed6d61c3e9a141a97903453820f65ba')) {
    //      console.log('hide success')
    //      var twiml = new twilio1.TwimlResponse();
    //      // console.log(twiml.toString(), 'twiml to strong')
    //      twiml.sms('Hi!  Thanks for checking out my app!')
    //      res.send(twiml.toString());
    //  }
    //  else {
    //    console.log('hit error')
    //    var twiml = new twilio1.TwimlResponse();
    //    twiml.sms('fuck off')
    //      res.send('you are not twilio.  Buzz off.');
    //  }
}

// Get a single order
exports.show = function(req, res) {
    Order.findById(req.params.id, function(err, order) {
        if (err) {
            return handleError(res, err);
        }
        if (!order) {
            return res.send(404);
        }
        return res.json(order);
    });
};

// Creates a new order in the DB.
exports.create = function(req, res) {
    Order.create(req.body, function(err, order) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(201, order);
    });
};

// Updates an existing order in the DB.
exports.update = function(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Order.findById(req.params.id, function(err, order) {
        if (err) {
            return handleError(res, err);
        }
        if (!order) {
            return res.send(404);
        }
        var updated = _.merge(order, req.body);
        updated.save(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.json(200, order);
        });
    });
};

// Deletes a order from the DB.
exports.destroy = function(req, res) {
    Order.findById(req.params.id, function(err, order) {
        if (err) {
            return handleError(res, err);
        }
        if (!order) {
            return res.send(404);
        }
        order.remove(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.send(204);
        });
    });
};

function handleError(res, err) {
    return res.send(500, err);
}