'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var OrderSchema = new Schema({
  ParentName: String,
  document_id: String, 
  phone: String, 
  email: String, 
  address: {}, 
  status: String
});

module.exports = mongoose.model('Order', OrderSchema);