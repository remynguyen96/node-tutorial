const passport = require('passport');
const User = require('../models/User');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user,done) => {
  done(null,user.id);
});

passport.deserializeUser((id,done) => {
  User.findById(id,(err,user) => {
    done(err,user);
  });
});


passport.use('local.signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
  session: false
},(req,email,password,done) => {
  req.checkBody('name','Invalid name').notEmpty();
  req.checkBody('email','Invalid email').notEmpty().isEmail();
  req.checkBody('password','Invalid password').notEmpty().isLength({min: 5});
  req.checkBody('confirmPassword','Confirm Password Invalid').notEmpty().equals(req.body.password);
  let errors = req.validationErrors();
  if(errors){
    let messages = [];
    errors.forEach((err) => {
      messages.push(err.msg);
    });
    let oldValue = {
      'name' : req.body.name,
      'email' : req.body.email
    };
    return done(null,false,req.flash('error', messages),req.flash('oldValue', oldValue));
  }
  User.findOne({'email': email},(err,user) => {
    if(err){
      return done(err);
    }
    if(user){
      return done(null, false, {message: 'Email is already in use.'});
    }
    let newUser = new User();
        newUser.name = req.body.name;
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.token = req.body._csrf;
        newUser.save((err,result) => {
          if(err){
            return done(err);
          }
          return done(null,newUser);
        });
  });
}));



passport.use('local.signin',new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
  session: false
},(req,email,password,done) => {
  req.checkBody('email','Invalid email').notEmpty().isEmail();
  req.checkBody('password','Invalid password').notEmpty();
  var errors = req.validationErrors();
  if(errors){
    var messages = [];
    errors.forEach((error) => {
      messages.push(error.msg);
    });
    let oldValue = req.body.email;
    return done(null,false,req.flash('error', messages),req.flash('oldValue', oldValue));
  }
  User.findOne({'email': email},(err,user) => {
    if(err){
      return done(err);
    }
    let oldValue = req.body.email;
    if(!user){
      return done(null, false, {message: 'User not found.'},req.flash('oldValue', oldValue));
    }
    if(!user.validPassword(password)){
      return done(null, false, {message: 'Wrong password.'},req.flash('oldValue', oldValue))
    }
    return done(null,user);
  });
}));
