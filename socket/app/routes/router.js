var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/',(req,res)=>{
  res.render('index',{
    pageTitle : 'Homepage',
    pageId : 'home',
  });
});


module.exports = router;
