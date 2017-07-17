const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

// NOTE: Controller
const UserController = require('../Controllers/UserController');
const CategoryController = require('../Controllers/CategoryController');
const BlogController = require('../Controllers/BlogController');


router.route('/user-login').post(UserController.login);
router.route('/user-register').post(UserController.signUp);

router.post('/create-category',checkAuthenticated,CategoryController.create);
router.get('/read-category',checkAuthenticated,CategoryController.read);
router.put('/update-category',checkAuthenticated,CategoryController.update);
router.delete('/delete-category',checkAuthenticated,CategoryController.delete);

router.post('/create-blogs',checkAuthenticated,BlogController.create);
router.get('/read-blogs',checkAuthenticated,BlogController.read);
router.post('/contact-mail',checkAuthenticated,BlogController.mail);


function checkAuthenticated(req, res, next) {
    if (!req.header('authorization')) {
        return res.status(401).json({
            errors: 'Unauthorized requested. Missing authentication header'
        });
    }
    let token = req.header('authorization').split(' ')[1];
    let payload = jwt.decode(token, process.env.JWT);
    if (!payload) {
        return res.status(401).json({
            errors: 'Unauthorized requested. Authentication header invalid'
        });
    }
    req.user = payload;
    next();
}



/** NOTE:
  * @desc Upload images with angular
  * @author Châu Nguyễn
  * @return save images in client (server) !
*/
const multer = require('multer');

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
