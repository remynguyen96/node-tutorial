const Category = require('../Models/Category');
const multer = require('multer');

var storage = multer.diskStorage({
  destination: function(req,file,cb){
    cb(null,'./assets/images/categories/');
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
}).single('images');

module.exports = {


  create: (req, res, next) => {
    upload(req, res, (err) => {
      let data = JSON.parse(req.body.data);
      if(err){
        if(err.code === 'LIMIT_FILE_SIZE'){
          return res.json({success: false, message: 'File size is too large. Max limit is 8MB'})
        }else if(err.code === 'filetype'){
          return res.json({success: false, message: 'File type is invalid. Must be .png,.jpg,.jpeg'})
        }else{
          return res.json({success: false, message: 'File was not able to be uploaded !'});
        }
      }
      const newCategory = new Category();
            newCategory.title = data.title;
            newCategory.slug = data.slug;
            newCategory.images = req.file.filename;
            newCategory.save()
            .then(category => {
              return res.status(201).json({'status' : 'successful'});
            })
            .catch(err => {
              next(err);
            })
    });
  },

  read: (req, res, next) => {
    Category.find({})
                 .then(category => {
                    return res.status(200).json(category)
                 })
                 .catch(err => {
                    next(err);
                 });
  },

  update: (req, res, next) => {
    const allCategories = new Category();
    allCategories.find({})
                 .then(category => {
                    return res.status(200).json(category)
                 })
                 .catch(err => {
                    next(err);
                 });
  },

  delete: (req, res, next) => {
    const allCategories = new Category();
    allCategories.find({})
                 .then(category => {
                    return res.status(200).json(category)
                 })
                 .catch(err => {
                    next(err);
                 });
  },





};
