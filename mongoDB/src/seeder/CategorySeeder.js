const Category = require('../models/Category');
const mongoose = require('mongoose');
mongoose.connect('localhost:27017/test');

let category = [];
for (var i = 0; i <= 5; i++) {
  let seeder = new Category({
    title: `Category-${i}`,
    slug: `category-${i}`,
    description: `This is description category ${i}`,
  });
  category.push(seeder);
}

let done = 0;
for (var i = 0; i < category.length; i++) {
  category[i].save((err,result) => {
    done++;
    if(done === category.length){
      exit();
    }
  });
}

function exit(){
  mongoose.disconnect();
}
