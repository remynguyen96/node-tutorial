const express = require('express');
const router = express.Router();

// NOTE: Config Upload File
const multer = require('multer');
const upload = multer();

// NOTE: CSRF And Passport
const passport = require('passport');
const csrf = require('csurf');
const csrfProtection = csrf();
router.use(csrfProtection);



// NOTE: Profile And Loggout

router.get('/profile',isLoggedIn, (req,res,next) => {
  res.render('auth/profile',{
    pageTitle : 'Profile User',
    pageID: 'profile',
  });
});

router.get('/logout', isLoggedIn, (req, res, next) => {
    req.logout();
    res.redirect('/');
});

router.use('/', notLoggedIn, (req, res, next) => {
    next();
});

// NOTE: Sign In

router.get('/sign-in',(req,res) => {
  let messages = req.flash('error');
  let oldValue = req.flash('oldValue');
  res.render('auth/sign-in',{
    pageTitle : 'Sign In',
    pageID: 'sign-in',
    csrfToken: req.csrfToken(),
    messages: messages,
    oldEmail: oldValue[0],
    hasErrors: messages.length > 0
  });
});

router.post('/sign-in',passport.authenticate('local.signin',{
  failureRedirect: '/auth/sign-in',
  failureFlash: true,
}),(req,res,next) => {
  if(req.session.oldUrl){
    var oldUrl = req.session.oldUrl
    req.session.oldUrl = null;
    res.redirect(oldUrl);
  }else{
    res.redirect('/auth/profile');
  }
});


// NOTE: Sign Up

router.get('/sign-up',(req,res) => {
  let messages = req.flash('error');
  let oldValue = req.flash('oldValue');
  res.render('auth/sign-up',{
    pageTitle : 'Sign Up',
    pageID: 'sign-up',
    csrfToken: req.csrfToken(),
    messages: messages,
    old: oldValue[0],
    hasErrors: messages.length > 0
  });
});

router.post('/sign-up',passport.authenticate('local.signup',{
  failureRedirect: '/auth/sign-up',
  failureFlash: true,
}),(req,res,next) => {
  if(req.session.oldUrl){
    var oldUrl = req.session.oldUrl
    req.session.oldUrl = null;
    res.redirect(oldUrl);
  }else{
    res.redirect('/auth/profile');
  }
});


module.exports = router;

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}

function notLoggedIn(req,res,next){
  if(!req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}
