var express = require('express');
var router = express.Router();


router.get('/chat',function(req,res){
  res.render('templates/chat',{
    'pageTitle' : 'Chat',
    'pageId' : 'chat',
    helpers: {
        script: function (conditional, options) {
          if(conditional === 'chat')
            return options.fn(this);
        },
    }
  });
});


module.exports = router;
