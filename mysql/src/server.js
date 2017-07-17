const express = require('express'),
      app = express(),
      path = require('path'),
      favicon = require('serve-favicon'),
      morgan = require('morgan'),
      reload = require('reload'),
      dotenv = require('dotenv').config(),
      expressHbs = require('express-handlebars'),
      io = require('socket.io')(),
      sassMiddleware = require('node-sass-middleware'),
      validator = require('express-validator'),
      session = require('express-session'),
      passport = require('passport'),
      flash = require('connect-flash'),
      bodyParser = require('body-parser'),
      cookieParser = require('cookie-parser'),
      mysql = require('mysql'),
      mysqlModel = require('mysql-model');

// NOTE: Connect Database Mysql
// var MyAppModel = mysqlModel.createConnection({
//   host     : process.env.DB_HOST,
//   user     : process.env.DB_USER,
//   password : process.env.DB_PASS,
//   database : process.env.DB_NAME
// });

// NOTE: View Engine
app.engine('.hbs', expressHbs({
  defaultLayout: 'master',
  extname: '.hbs',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
}));
app.set('views', path.join(__dirname,'views'));
app.set('view engine', '.hbs');


// NOTE: Settings send json and status app
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// NOTE: Settings Validator
app.use(validator());

// NOTE: Settings Cookie And Session
app.use(cookieParser());
app.use(flash());
app.use(session({
  secret: 'mysuppersecret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 180 * 60 *1000 }
}));

// NOTE: Setting build scss or sass
app.use(sassMiddleware({
  src: path.join(__dirname, 'assets'),
  dest: path.join(__dirname, 'assets')
}));

// NOTE: Setting url public
app.use(express.static(path.join(__dirname, 'assets')));
app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));
app.use(favicon(path.join(__dirname, 'assets', 'favicon.ico')));
app.locals.siteTitle = 'Blogs Express Js';

// NOTE: Settings Passport
app.use(passport.initialize());
app.use(passport.session());

// NOTE: Settings Router
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/',require('./routes/router'));

// NOTE: Settup Server
app.set('port', process.env.PORT || 4000);
var server = app.listen(app.get('port'),() => {
  console.log(`Listening on port http://localhost:${app.get('port')}`);
});

reload(server,app);
