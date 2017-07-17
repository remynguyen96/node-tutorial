var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');
var expressHbs = require('express-handlebars');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var validator = require('express-validator');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);
var app = express();

mongoose.connect('localhost:27017/shopping');

// view engine setup
app.engine('.hbs',expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('views', path.join(__dirname,'views'));
app.set('view engine', '.hbs');

// NOTE:
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// NOTE:
app.use(validator());

// NOTE:
app.use(cookieParser());
app.use(session({
  secret: 'mysuppersecret',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  }),
  cookie: { maxAge: 180 * 60 *1000 }
}));
app.use(flash());

// NOTE:
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: false
}));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));

// NOTE: passport
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport');

// NOTE: Router
app.use(function(req,res,next){
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  next();
});
var routes = require('./routes/index');
var userRouter = require('./routes/user');
app.use('/', routes);
app.use('/user', userRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
