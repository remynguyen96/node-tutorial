const express = require('express'),
      app = express(),
      fs = require('fs'),
      path = require('path'),
      morgan = require('morgan'),
      helmet = require('helmet'),
      dotenv = require('dotenv').config(),
      // io = require('socket.io')(),
      // cors = require('cors');
      // validator = require('express-validator'),
      // passport = require('passport'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose');
// NOTE: MongDB
// mongoose.connect('mongodb://homestead:secret@ds157621.mlab.com:57621/blogs');
// mongoose.Promise = global.Promise;
// mongoose.connect(process.env.MONGODB_URI);
// const db = mongoose.connection;
// db.once('open',() => {
//     console.log('Connected to MongoDB');
// });
// db.on('error', console.error.bind(console, 'MongoDB connection error: '));

// NOTE: Settings send json and status app
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// NOTE: Settings Validator
// app.use(validator());

// NOTE: Setting url public
app.use(express.static(__dirname + '/assets'));
// app.use(express.static(path.join(__dirname, 'assets')));
// app.use(express.static(path.join(__dirname, 'client/dist')));

// NOTE: Settings Passport
// app.use(cors());
app.use(helmet());
// app.use(passport.initialize());
// app.use(passport.session());
// require('./Config/Passport')(passport);

// NOTE: Settings Router
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

// app.use('/api',require('./Routes/api'));

// app.use('/user',require('./Routes/user'));

app.use((req,res,next) => {
  let error = new Error('Not Found !');
  error.status = 404;
  next(error);
});

app.use((err,req,res,next) => {
  let error = app.get('env') === 'development' ? err : {};
  let status = err.status || 500;
  res.status(status).json({
    error : {
      message: error.message
    }
  });
  console.error(err);
});

app.get('/*',(req,res) => {
  res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

// fs.readFile('./message.txt','utf8', (err,result) => {
//   if (err) {
//      return console.error(err);
//   }
//   console.log(result.toString());
// });

// const CryptoJS = require('crypto-js');
// const iv = CryptoJS.enc.Base64.parse("#base64IV#");
// const passportCode   = process.env.PASSPORTCODE;
// function decryptCode(code){
//   let decrypted = CryptoJS.AES.decrypt(code, passportCode, {iv: iv});
//   return decrypted.toString(CryptoJS.enc.Utf8);
// }
// function encryptCode(code){
//   let encrypt = CryptoJS.AES.encrypt(code, passportCode, {iv: iv});
//   let encrypted = encrypt.toString();
//   return encrypted;
// }
// console.log(encryptCode('2007'));
// console.log(decryptCode('U2FsdGVkX1+iyhVquLe+HtHCwows0PeefRW/Qtex4ww='));

// NOTE: Settings Server
app.set('port',process.env.PORT || 4300 );
var server = app.listen(app.get('port'),() => {
  console.log(`Listening on port http://localhost:${app.get('port')}`);
});

// io.on('connection',(socket) => {
//   console.log('User connected !');
//   socket.on('disconnect',() => {
//     console.log('User disconnected');
//   });
//
//   socket.on('add-message',(data) => {
//     console.log(data);
//     io.emit('message', {type:'new-message', text: data});
//   });
// });

module.exports = app;
