var express = require('express');
var router = express.Router();
var multer  = require('multer');

var Cart = require('../models/cart');
var Product = require('../models/product');
var Order = require('../models/order');
/* GET home page. */
router.get('/', function(req, res, next) {
  var successMsg = req.flash('success')[0];
  Product.find(function(err, docs){
    var productChunks = [];
    var chunkSize = 3;
    var docsLength = docs.length;
    for (var i = 0; i < docsLength; i+= chunkSize) {
      productChunks.push(docs.slice(i, i + chunkSize));
    }
    // console.log(productChunks);
    res.render('shop/index', {
      title: 'Shopping Cart',
       products: productChunks,
        successMsg : successMsg,
         noMessage : !successMsg
    });
  });
});
/* GET Add to cart */
router.get('/add-to-cart/:id',function(req,res,next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  Product.findById(productId,function(err,product){
    if(err){
      return res.redirect('/');
    }
    cart.add(product,product.id);
    req.session.cart = cart;
    // console.log(req.session.cart);
    res.redirect('/');
  });
});
/* GET Reduce one to cart */
router.get('/reduce/:id',function(req,res,next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.reduceByOne(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');
});
/* GET Reduce one to cart */
router.get('/remove/:id',function(req,res,next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.removeItem(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');
});
/* GET shopping cart */
router.get('/shopping-cart',function(req,res,next){
  if(!req.session.cart){
    return res.render('shop/shopping-cart',{products: null});
  }
  var cart = new Cart(req.session.cart);
  res.render('shop/shopping-cart',{
    products: cart.generateArray(),
    totalPrice: cart.totalPrice,
    totalQty: cart.totalQty,
  });
});
/* GET checkout */
router.get('/checkout',isLoggedIn, function(req,res,next){
  if(!req.session.cart){
    res.redirect('/shopping-cart');
  }
  var cart = new Cart(req.session.cart);
  var errMsg = req.flash('error');
  res.render('shop/checkout', {total: cart.totalPrice, errMsg : errMsg, noError: !errMsg});
  req.session.errors = null;
});
/* POST checkout */
router.post('/checkout',function(req,res,next){
  if(!req.session.cart){
    res.redirect('/shopping-cart');
  }
  req.checkBody('name','Name is required').notEmpty();
  req.checkBody('address','Address is required').notEmpty();
  req.checkBody('paymentId','Cart number is required').notEmpty().isNumeric();
  var errors = req.validationErrors();
  if(errors){
    req.flash('error',errors);
    res.redirect('/checkout');
  }else{
    var cart = new Cart(req.session.cart);
    var order = new Order({
        user: req.user,
        cart: cart,
        address: req.body.address,
        name: req.body.name,
        paymentId: req.body.paymentId
    });
    order.save(function(err, result) {
      req.flash('success', 'Successfully bought product!');
      req.session.cart = null;
      res.redirect('/');
    });
  }
});
/* create products */
router.get('/create-products',function(req,res,next){

});


var storage = multer.diskStorage({
  destination: function(req,file,cb){
    cb(null,'./public/images/');
  },
  filename: function(req,file,cb){
    // cb(null,file.fieldname + '-' + Date.now());
    if(!file.originalname.match(/\.(png|jpg|jpeg)$/)){
      let err = new Error();
          err.code = 'filetype';
        return cb(err);
    }else{
      cb(null,file.originalname + '_' + Date.now());
    }
  }
});

var upload = multer({
   storage : storage,
   limits: {fileSize: 8000000 }
}).single('file');

/* upload File */
router.get('/upload-images',function(req,res){
    res.render('shop/upload');
});

router.post('/upload-images',function(req,res) {
  upload(req,res,function(err){
    console.log(req.file);
    if(err){
      if(err.code === 'LIMIT_FILE_SIZE'){
        return res.json({success: false, message: 'File size is too large. Max limit is 8MB'})
      }else if(err.code === 'filetype'){
        return res.json({success: false, message: 'File type is invalid. Must be .png,.jpg,.jpeg'})
      }else{
        return res.json({success: false, message: 'File was not able to be uploaded !'})
      }
    }else{
      return res.json({success: true, message: 'File was uploaded !'})
    }
  });
});

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('/user/signin');
}
