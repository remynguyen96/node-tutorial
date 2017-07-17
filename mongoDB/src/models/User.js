const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');


let userSchema = new Schema({
  name : {type :String, required: true},
  email : {type :String, unique :true, required: true},
  password : {type :String, required: true},
  token : {type :String, required: false},
  createdAt : {type :Date, default: new Date() },
});


userSchema.methods.encryptPassword = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5),null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User',userSchema);
