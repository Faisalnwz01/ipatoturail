'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var apiKey = 'i9bmu2obdkr7H47YgfzhmA';
var easypost = require('node-easypost')(apiKey);
var _ = require('lodash');
var stripe = require("stripe")("sk_test_Bkp3kD47ARbEfHuGo4twLFPR");
// var TrueVault = require('truevaultjs');
// var client = new TrueVault('f9fa5cdf-2de8-4ba3-9a0d-0bd12a8b4518');

var validationError = function(res, err) {
  return res.json(422, err);
};

///stripe payments 
exports.stripe = function (req, res) {
  var stripeToken = req.body.id;
  var time = 24
  console.log(time, 'timeeeeeeeeeeeeeeeeeeeeeee')

  if(time >= 17 && time < 20){
    console.log("charge $250")
  } 

  else if( time >=20 && time < 24){
      console.log("charge $350")
  }

  else if (time >= 24 && time < 2){
    console.log("change $450")
  }

  else{
    console.log("sorry we are not open now")
  }

stripe.customers.create({
  source: stripeToken,
  description: 'payinguser@example.com'
}).then(function(customer) {
  // console.log(customer, "cusomter")
  return stripe.charges.create({
    amount: 1000, // amount in cents, again
    currency: "usd",
    customer: customer.id
  });
}).then(function(charge) {
  console.log("Chargeeeeeeeeeeeeeeeeeeeeeeeeeeeee", charge, "Chargeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
  // saveStripeCustomerId(user, charge.customer);
});

// // Later...
// var customerId = getStripeCustomerId(user);

// stripe.charges.create({
//   amount: 1500, // amount in cents, again
//   currency: "usd",
//   customer: customerId
// });
}


// Updates an existing thing in the DB.
// exports.update = function(req, res) {
//   console.log(req)

//   if(req.body._id) { delete req.body._id; }
//   User.findById(req.params.id, function (err, user) {
//     if(err) return res.send(500, err);
//     if(!user) { return res.send(404); }
//     var updated = _.extend(user, req.body);
//     updated.save(function (err) {
//       if(err) return res.send(500, err);
//       return res.json(200, user);
//     });
//   });
// };

exports.update = function(req, res) {
  console.log(req.body)
  
  User.findById(req.body._id).exec(function(err, user) {
  var updated = _.merge(user, req.body);
    if (err) return res.send(500)
    updated.save(function(err, user) {
      if (err) return res.send(500)
      return res.send(200)
    })
  })
}

exports.test = function(){
  console.log('working')
}

// exports.trueVault = function(){
//   var vaultId = 'd66fc65c-6d22-41f9-953a-612c45c7082e '
// var mydoc = { secure: 'data', isPHI: true };
// client.json.create(vaultId,mydoc,function(err,result) {
//     console.log(result.document_id);
// });

// mydoc.newField = 12345;
// client.json.update(vaultId,mydoc,function(err) {});

// // client.json.get(vaultId,documentId,function(err,document) {
// //     assert.equal(mydoc,document);
// // });

// // client.json.del(vaultId,documentId,function(err) {});
// }

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.find({}, '-salt -hashedPassword', function (err, users) {
    if(err) return res.send(500, err);
    res.json(200, users);
  });
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  if(!newUser.role){
  newUser.role = 'user';
}
  newUser.save(function(err, user) {
    if (err) return validationError(res, err);
    var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
    res.json({ token: token });
  });
};


/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    res.json(user.profile);
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return res.send(500, err);
    return res.send(204);
  });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};

//eastpost confirm address
exports.easyPost = function(req, res) {
  console.log(req.body)
  var fromAddress = {
    name: req.body.name,
    street1: req.body.street1,
    street2: req.body.street2,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    phone: req.body.phone
};

// verify address
easypost.Address.create(fromAddress, function(err, fromAddress) {
    fromAddress.verify(function(err, response) {
        if (err) {
            console.log('Address is invalid.');
            res.send("Address is invalid")
        } else if (response.message !== undefined && response.message !== null) {
            console.log('Address is valid but has an issue: ', response.message);
            var verifiedAddress = response.address;
        } else {
          console.log('address is gooddddd')
            var verifiedAddress = response;
            res.send(verifiedAddress)
        }
    });
  });

}

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.json(401);
    res.json(user);
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
