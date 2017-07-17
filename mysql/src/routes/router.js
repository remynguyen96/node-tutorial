const express = require('express');
const router = express.Router();

// NOTE: Config Upload File
const multer = require('multer');
const upload = multer();


// NOTE: Settings All Router


router.get('/',(req,res) => {
  res.render('sections/homepage',{
    pageTitle : 'Homepage',
  });
});


module.exports = router;
