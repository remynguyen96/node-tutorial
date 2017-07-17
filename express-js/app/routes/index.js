var express = require('express');
var router = express.Router();
var fs = require('fs');
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended : false }));
var feedbackData = require('../data/feedback.json');

router.get('/',function(req,res){
    let dataFile = req.app.get('appData');
    let pagePhotos = [];
    dataFile.speakers.forEach(function(item){
      pagePhotos = pagePhotos.concat(item.artwork);
    });
    res.render('templates/index',{
      pageTitle : 'Homepage',
      pageId : 'home',
      artwork : pagePhotos,
      // layout: 'master2',
      helpers: {
          script: function (conditional, options) {
            if(conditional === 'home')
              return options.fn(this);
          },
      }
    });
});
////////////////////////

router.get('/api',function(req,res){
  res.json(feedbackData);
});

router.post('/api',function(req,res){
  feedbackData.unshift(req.body);
  fs.writeFile('app/data/feedback.json',JSON.stringify(feedbackData),'utf8',function(err){
    if(err){
      console.log(err);
    }
  });
  res.json(feedbackData);
});

router.delete('/api/:id',function(req,res){
  feedbackData.splice(req.params.id,1);
  fs.writeFile('app/data/feedback.json',JSON.stringify(feedbackData),'utf8',function(err){
    if(err){
      console.log(err);
    }
  });
  res.json(feedbackData);
});


router.get('/feedback',function(req,res){
  res.render('templates/feedback',{
    pageTitle : 'Feedback',
    pageId : 'feedback',
    helpers: {
            script: function (conditional, options) {
              if(conditional === 'feedback'){
                return options.fn(this);
              }else{
                return options.inverse(this);
              }
            },
            msg: function(params){
              return `hello guy this is ${params}`;
            },
        }
  });
});


module.exports = router;
