const Blog = require('../models/Blog');
const mongoose = require('mongoose');
mongoose.connect('localhost:27017/test');

// let blogs = [
//   new Blog({
//     title: 'Blogs 1',
//     slug: 'blogs-1',
//     images: 'background.jpg',
//     price: 10000,
//   }),
//   new Blog({
//     title: 'Blogs 2',
//     slug: 'blogs-2',
//     images: 'background.jpg',
//     price: 20000,
//   }),
// ];
let blogs = [];
for (var i = 1; i <= 5; i++) {
  let seeder = new Blog({
    title: `Blogs-${i}`,
    slug: `blogs-${i}`,
    images: 'background.jpg',
    price: 1000*i,
  });
  blogs.push(seeder);
}

let done = 0;
for (var i = 0; i < blogs.length; i++) {
  blogs[i].save((err,result) => {
    done++;
    if(done === blogs.length){
      exit();
    }
  });
}
function exit(){
  mongoose.disconnect();
}
