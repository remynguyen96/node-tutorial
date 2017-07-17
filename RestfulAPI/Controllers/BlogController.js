const Blog = require('../Models/Blog');
const multer = require('multer');
const Transporter = require('../Config/Mailer');

var storage = multer.diskStorage({
  destination: function(req,file,cb){
    cb(null,'./assets/images/blogs/');
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
      const newBlog = new Blog();
            newBlog.title = data.title;
            newBlog.slug = data.slug;
            newBlog.description = data.description;
            newBlog.author = data.author;
            newBlog.category = data.category;
            newBlog.images = req.file.filename;
            newBlog.save()
            .then(category => {
              return res.status(201).json({'status' : 'successful'});
            })
            .catch(err => {
              next(err);
            })
    });
  },

  read: (req, res, next) => {
    Blog.find({})
        .then(blog => {
          return res.status(200).json(blog)
        })
        .catch(err => {
          next(err);
        });
  },


  mail: (req,res,next) => {
      let mailOptions = {
          from: `"Demo Express Js With Remy Nguyen 👻" <remynguyen@enlightened.com>`,
          to: `${req.body.email}`,
          subject: `${req.body.subject} ✔`,
          html: `${req.body.content}`
      };
      Transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message %s sent: %s', info.messageId, info.response);
      });
      return res.status(200).json({'success' : `Message sent !`})
  },




};
