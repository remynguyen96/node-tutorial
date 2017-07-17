const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let blogSchema = new Schema({
  title: {type: String, required: true, lowercase : true},
  slug: {type: String, unique :true, required: true, lowercase : true},
  images: {type: String},
  description: {type: String},
  author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  category: [{type: Schema.Types.ObjectId, ref: 'Category', required: true}],
  createdAt : {type :Date, default: new Date() },
});

module.exports = mongoose.model('Blog',blogSchema);
