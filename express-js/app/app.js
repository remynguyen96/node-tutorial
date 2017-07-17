var express = require('express');
var path = require('path');
var morgan = require('morgan');
var dataFile = require('./data/data.json');
var reload = require('reload');
var expressHbs = require('express-handlebars');
var io = require('socket.io')();
var validator = require('express-validator');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var app = express();


// NOTE: Settings app
app.set('port',process.env.PORT || 4000 );
app.set('appData',dataFile);
app.use(cookieParser());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//
mongoose.connect('localhost:27017/express');

// NOTE: Settings Router
app.use((req,res,next) => {
  res.header("Access-Control-Allow-Origin", "");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(require('./routes/index'));
app.use(require('./routes/speakers'));
app.use(require('./routes/chat'));

// NOTE: Send mail with nodemailer

// var nodemailer = require('nodemailer');
// let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'butterkid96@gmail.com',
//         pass: '7469976436'
//     }
// });
// let mailOptions = {
//     from: '"Demo Express Js With Remy Nguyen 👻" <remynguyen@enlightened.com>',
//     to: 'nguyentietngocchau@gmail.com, buttercut8@gmail.com',
//     subject: 'Hello ✔ this is mail send from express js', // Subject line
//     text: 'Hello world ?',
//     html: `
//       <h2>Remy Nguyen</h2>
//       <p>This is remy nguyen send mail demo from express</p>
//     `
// };
// transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//         return console.log(error);
//     }
//     console.log('Message %s sent: %s', info.messageId, info.response);
// });

// NOTE: Settings Views Engine
app.engine('.hbs', expressHbs({
  defaultLayout: 'master',
  extname: '.hbs',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
}));
app.set('views', path.join(__dirname,'views'));
app.set('view engine', '.hbs');
app.locals.siteTitle = 'Express Js';
app.use(express.static(path.join(__dirname, 'public')));

// NOTE: Settings Server
var server = app.listen(app.get('port'),function(){
  console.log(`Listening on port http://localhost:${app.get('port')}`);
});

io.attach(server);
// io.listen(server);
io.set("origins", "*:*");
io.on('connection',(socket) => {
  console.log('User Connected');
  // socket.on('disconnect',() =>{
  //   console.log("User Disconnect");
  // });
  socket.on('postMessage',(data)=> {
    // io.emit('updateMessage', data);
    console.log(data);
  });
});




reload(server,app);
