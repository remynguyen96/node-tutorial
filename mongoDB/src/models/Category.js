const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var categorySchema = new Schema({
  title:{ type: String, required : true},
  slug:{ type: String, unique :true, required : true},
  description:{ type: String, required : true},
  createdAt : {type :Date, default: new Date() },
});


const Category = module.exports = mongoose.model('Category',categorySchema);

module.exports.getAllCategory = function(callback){
  Category.find(callback);
}

// module.exports.getUserById = function(id,callback){
  // User.findById(id,callback);
// }
