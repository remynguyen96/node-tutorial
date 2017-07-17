const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

let UserSchema = new Schema({
  name : {type :String, required: true},
  email : {type :String, unique :true, required: true, lowercase : true},
  password : {type :String, required: true},
  createdAt : {type :Date, default: new Date() },
});


UserSchema.methods.encryptPassword = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5),null);
};

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

const User  = module.exports = mongoose.model('User',UserSchema);

module.exports.getUserById = function(id,callback){
  User.findById(id,callback);
}

module.exports.getUserByEmail = function(email,callback) {
  const query = {email : email};
  User.findOne(query,callback)
}
