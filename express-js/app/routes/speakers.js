var express = require('express');
var router = express.Router();


router.get('/speakers/:speakersID',function(req,res){
  var dataFile = req.app.get('appData');
  var speakers = dataFile.speakers[req.params.speakersID];
  res.send(`
    <link rel="stylesheet" href="/css/style.css">
    <h2>This is page speakers ${req.params.speakersID}</h2>
    <p>Name is ${speakers.name}</p>
    <p>Title is ${speakers.title}</p>
    <p>Summary is ${speakers.summary}</p>
    <img style="width:200px;height:200px" src="/images/speakers/${speakers.shortname}.jpg" alt="images">
    <script src="/reload/reload.js"></script>
  `);
});

module.exports = router;
