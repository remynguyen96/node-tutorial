const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

// NOTE: Model
const User = require('../Models/User');
const Blog = require('../Models/Blog');
const Category = require('../Models/Category');

// NOTE: Config Upload File
const multer = require('multer');


let message  =  [
  {name: 'remy', comment: 'Hello World 1'},
  {name: 'chau', comment: 'Hello World 2'},
  {name: 'nguyen', comment: 'Hello World 3'},
];

router.get('/message/:user',(req,res) => {
    let user = req.params.user
    let result = message.filter(item => item.name == user);
    return res.json(result);
});

router.get('/blog', (req,res) => {
  let allBlog = Blog.find((err,result) => {
    if(err){
      return handleError(err);
      // console.error.bind(console,'Error :');
      // return res.sendStatus(500);
    }
    return res.json(result);
  });
});

router.post('/sign-up',(req,res,next) => {
  let newUser = new User();
      newUser.name = req.body.name;
      newUser.email = req.body.email;
      newUser.password = newUser.encryptPassword(req.body.password);
      newUser.save((err,result) => {
        if(err){
          return res.json({success: false, msg: 'Failed to register user'});
        }else{
          return res.json({success: true, msg: 'User registered'});
        }
      });
});


router.post('/authenticate',(req,res,next) => {
  let email = req.body.email;
  let password = req.body.password;

  User.getUserByEmail(email,(err,user) => {
    if(err) return handleError(err);
    if(!user){
      return res.json({success: false, msg: 'User not found'});
    }
    if(!user.validPassword(password)){
      return res.json({success: false, msg: 'Wrong password'});
    }
    const token = jwt.sign(user,process.env.JWT, {
      expiresIn: 3600 // 1 hour
    });
    return res.json({
      token: 'JWT '+token,
      user: {
          id: user._id,
          name: user.name,
          email: user.email,
      }
    })
  });

});

router.get('/profile',passport.authenticate('jwt', {session: false}), (req,res,next) => {
  res.json({user: req.user})
});

// router.get('/profile',checkAuthenticated, (req,res,next) => {
//   res.json({user: req.user})
// });


function checkAuthenticated(req,res,next){
  if(!req.header('authorization')){
    return res.status(401).send({ message : 'Unauthorized requested. Missing authentication header !' });
  }
  let token = req.header('authorization').split(' ')[1];
  let payload = jwt.decode(token,process.env.JWT);
  if(!payload){
    return res.status(401).send({ message : 'Unauthorized requested. Authentication header invalid !' });
  }
  req.user = payload;
  next();
}



/** NOTE:
  * @desc Upload images with angular
  * @author Châu Nguyễn
  * @return save images in client (server) !
*/
var storage = multer.diskStorage({
  destination: function(req,file,cb){
    cb(null,'./client/src/assets/images/');
  },
  filename: (req,file,cb) => {
    if(!file.originalname.match(/\.(png|jpg|jpeg)$/)){
      let err = new Error();
          err.code = 'filetype';
        return cb(err);
    }else{
      let typeFile = file.originalname.split('.')[file.originalname.split('.').length -1];
      let nameFile = file.originalname.replace(`.${typeFile}`,'');
      cb(null, `${nameFile}-${Date.now()}.${typeFile}`);
    }
  }
});

var upload = multer({
   storage : storage,
   limits: {
      fileSize: 8000000
   }
}).single('file');

router.post('/upload',(req,res) =>  {
    console.log(req.body);
   upload(req, res, (err) =>  {
    console.log(req.file);
    if(err){
      if(err.code === 'LIMIT_FILE_SIZE'){
        return res.json({success: false, message: 'File size is too large. Max limit is 8MB'})
      }else if(err.code === 'filetype'){
        return res.json({success: false, message: 'File type is invalid. Must be .png,.jpg,.jpeg'})
      }else{
        return res.json({success: false, message: 'File was not able to be uploaded !'});
      }
    }
    return res.json({success: true, message: 'File was uploaded !'})
  });
});


module.exports = router;
