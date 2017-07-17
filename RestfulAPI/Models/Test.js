const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//  child Schema
var addressSchema = new Schema({
  type: String,
  street: String,
  city: String,
  state: String,
  country: String,
  postalCode: Number,
});
//  parent Schema
var customerSchema = new Schema({
    name : {
      first: String,
      last: String,
    },
    address: [ addressSchema ],
    isActive: {
      type: Boolean,
      default: true
    }
});

module.exports = mongoose.model('Customer',customerSchema);
