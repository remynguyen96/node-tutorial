const express = require('express');
const router = express.Router();

// NOTE: Model
const Blog = require('../models/Blog');
const Category = require('../models/Category');


// NOTE: Config Upload File
const multer = require('multer');
const upload = multer();

// NOTE: Settings All Router

router.get('/',(req,res) => {
  Blog.find((err,docs) => {
    let blogChunks = [];
    let chunkSize = 3;
    let docsLength = docs.length
    for (var i = 0; i < docsLength; i+= chunkSize) {
      blogChunks.push(docs.slice(i, i+chunkSize));
    }
    res.render('sections/homepage',{
      pageTitle : 'Homepage Blogs',
      pageID: 'homepage',
      blog: blogChunks,
    });
  });
});

// NOTE: Handing Blogs

  // NOTE: Show all blogs
router.get('/list-blogs/:slug',(req,res) => {
  let slug = req.params.slug;
  Blog.findOne({slug : slug}, (err,foundBlog) => {
    if(err){
      console.log(err);
      return res.sendStatus(500);
    }else{
      console.log(foundBlog);
      res.render('sections/detail-blog',{
        pageTitle : 'Detail Blogs',
        pageID: 'detail',
        blog: foundBlog,
      });
    }
  });
});
  // NOTE: Update blog
router.put('/list-blogs/update/:id',(req,res) => {
  let id = req.params.id;
  Blog.findOne({_id : id}, (err,foundObject) => {
    if(err){
      console.log(`Err: ${err}`);
      res.sendStatus(500);
    }else{
      if(!foundObject){
        res.sendStatus(404);
      }else{
        if(req.body.title){
          foundObject.title = req.body.title;
        }
        if(req.body.slug){
          foundObject.slug = req.body.slug;
        }
        foundObject.save((err,updateObject) => {
          if(err){
            console.log(`Error ${err}`);
            res.sendStatus(500);
          }else{
            res.send(updateObject);
          }
        });

      }
    }
  });
});
  // NOTE: Delete blog
router.delete('/list-blogs/delete/:id',(req,res) => {
  let id = res.params.id;
  Blog.findOneAndRemove({_id : id}, (err) => {
    if(err){
      console.log(`Err: ${err}`);
      return res.sendStatus(500);
    }else{
      return res.sendStatus(200);
    }
  });
});
  // NOTE: Create blog
router.get('/create-blogs',isLoggedIn,(req,res) => {
  let notification = req.flash('successBlog')[0];
  res.render('sections/create-blogs',{
    pageTitle : 'Create Blogs',
    pageID: 'create-blogs',
    notification: notification,
    Notmessage: !notification,
  });
});

router.post('/create-blogs',isLoggedIn,(req,res) => {
  let insertBlog = new Blog();
      insertBlog.title = req.body.title;
      insertBlog.slug = req.body.slug ;
      insertBlog.images = 'background.jpg';
      insertBlog.price = req.body.price;
      insertBlog.author = req.user;
      insertBlog.save((err,result) => {
        req.flash('successBlog', 'Create Blog Sucessful !');
        res.redirect('/create-blogs');
      });
});

// NOTE: Handing Categories
router.get('/categories',(req,res) => {
  Category.getAllCategory((err,docs) => {
    let categoryChunks = [];
    let chunkSize = 4;
    for (var i = 0; i < docs.length; i+= chunkSize) {
      categoryChunks.push(docs.slice(i,i+chunkSize));
    }
    res.render('sections/categories',{
      pageTitle : 'Categories Blogs',
      pageID: 'category',
      categories: categoryChunks,
    });
  });
  // Category.find((err,docs) => {
  //   let categoryChunks = [];
  //   let chunkSize = 4;
  //   for (var i = 0; i < docs.length; i+= chunkSize) {
  //     categoryChunks.push(docs.slice(i,i+chunkSize));
  //   }
  //   res.render('sections/categories',{
  //     pageTitle : 'Categories Blogs',
  //     pageID: 'category',
  //     categories: categoryChunks,
  //   });
  // });
});

// NOTE: Handing Cart

router.get('/cart',(req,res) => {
  res.render('sections/cart',{
    pageTitle : 'Cart Blogs',
    pageID: 'cart',
  });
});


// NOTE: Handing Template Page

router.get('/about-us',(req,res) => {
  res.render('sections/about-us',{
    pageTitle : 'About Us Blogs',
    pageID: 'about-us',
  });
});




















module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('/');
}
