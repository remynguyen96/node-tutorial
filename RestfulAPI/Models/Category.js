const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var categorySchema = new Schema({
  title:{ type: String, required : true, lowercase : true},
  slug:{ type: String, unique :true, required : true, lowercase : true},
  images:{ type: String, required : true},
  createdAt : {type :Date, default: new Date() },
});


module.exports = mongoose.model('Category',categorySchema);
