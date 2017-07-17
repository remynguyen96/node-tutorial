const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let blogSchema = new Schema({
  title: {type: String, required: true},
  slug: {type: String, unique :true, required: true},
  images: {type: String, required: true},
  author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  category: [{type: Schema.Types.ObjectId, ref: 'Category', required: true}],
  price: {type: Number, required: true},
  createdAt : {type :Date, default: new Date() },
});

const Blog = module.exports = mongoose.model('Blog',blogSchema);


module.exports.getBlogBySlug = function(slug,callback){
  const query = { slug : slug };
  Blog.findOne(query,callback)
}
