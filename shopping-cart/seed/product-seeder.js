var Product = require('../models/product');
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/shopping');

var products = [
  new Product({
    imagePath: 'http://generativemedicine.org/portal/wp-content/uploads/2015/12/meditation.jpg',
    title: 'Meditaion',
    description: 'Awesome Meditation midfullness !',
    price : 45,
  }),
  new Product({
    imagePath: 'http://hinessight.blogs.com/.a/6a00d83451c0aa69e201b8d165e9fc970c-600wi',
    title: 'Meditaion 2',
    description: 'Good Meditation midfullness !',
    price : 60,
  }),
  new Product({
    imagePath: 'https://www.ananda.org/wp-content/uploads/2013/02/meditation-girl-364x242.jpg',
    title: 'Meditaion 3',
    description: 'Great Meditation midfullness !',
    price : 75,
  }),
  new Product({
    imagePath: 'https://sg-dae.kxcdn.com/blog/wp-content/uploads/2012/07/meditation-going-beyond-logic.jpg',
    title: 'Meditaion 4',
    description: 'Wonderful Meditation midfullness !',
    price : 90,
  }),
];
var done = 0;
var productLength = products.length;
for (var i = 0; i < productLength; i++) {
  products[i].save(function(err,result){
    done++;
    if(done  === productLength){
      exit();
    }
  });
}
function exit(){
  mongoose.disconnect();
}
