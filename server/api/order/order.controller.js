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

exports.twilio = function(req, res) {
  console.log('hit on back end')
    //Send an SMS text message
  var numbers = ['+17185308914', '+16094396655', '+16094396656']
  for (var i = 0; i < numbers.length; i++) {
    client.sendMessage({

      to: numbers[i], // Any number Twilio can deliver to
      from: '+16096143170', // A number you bought from Twilio and can use for outbound communication
      body: 'word to your mother.' // body of the SMS message

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

exports.texts =function(){
  console.log('hit text twilio functions')
   if (twilio1.validateExpressRequest(req, 'd5c437f360516d9dabc6783981b51dd5')) {
        var twiml = new twilio1.TwimlResponse();
        twiml.sms('Hi!  Thanks for checking out my app!')
        res.send(twiml.toString());
    }
    else {
        res.send('you are not twilio.  Buzz off.');
    }
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