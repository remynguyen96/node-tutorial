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
  mongoose = require('mongoose');
MongoStore = require('connect-mongo')(session);

// NOTE: MongDB
// mongoose.connect('mongodb://homestead:secret@ds157621.mlab.com:57621/blogs');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to MongoDB');
});
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

// NOTE: Settings Views Engine
app.engine('.hbs', expressHbs({
  defaultLayout: 'master',
  extname: '.hbs',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');

// NOTE: Settings send json and status app
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}));
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
  store: new MongoStore({
    mongooseConnection: db
  }),
  cookie: {
    maxAge: 180 * 60 * 1000
  }
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
require('./config/Passport');

// NOTE: Settings Router
app.use((req, res, next) => {
  res.locals.signIn = req.isAuthenticated();
  res.locals.session = req.session;
  next();
});
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/', require('./routes/router'));
app.use('/auth', require('./routes/auth'));
app.use('/api', require('./routes/api'));
var Story = require('./models/Story');
var Person = require('./models/Person');
var User = require('./models/User');
var Post = require('./models/Post');





// app.use('/', (req, res) => {
  // let user = req.user;
  // var post = new Post({
  //   title: 'Post tutorial 1',
  //   categories: [{
  //     name: 'category-1',
  //     'cat_id': 1
  //   }, {
  //     name: 'category-2',
  //     'cat_id': 2
  //   }],
  //   user: user
  // });
  // post.save((err,post) => {
  //   if(err) return handleError(err);
  //   console.log(post);
  // });

      // var post = new Post;
      // post.categories.push({
      //   'name' : 'category-test',
      //   'cat_id': 4,
      // });
      // var newPost = post.categories.create({
      //   'name' : 'category-test2',
      //   'cat_id': 5
      // });
      // post.title = 'Post tutorial 2';
      // post.user = req.user;
      // post.save((err,post) => {
      //   if(err) return console.log(new Error(err));
      //   console.log(post);
      // });
// });


// var aaron = new Person({ _id: 0, name: 'Aaron', age: 100 });
// aaron.save(function (err) {
//   if (err) return handleError(err);
//   var story1 = new Story({
//     title: "Once upon a timex.",
//     _creator: aaron._id
//   });

//   story1.save(function (err) {
//     if (err) return handleError(err);

//   });
// });


// Story.findOne({'title' : 'Once upon a timex.'})
//       .populate('_creator')
//       .exec((err,story) => {
//         if(err) return handleError(err);
//         console.log(story);
//       })


// Story.findOne({'title' : 'Once upon a timex.'},(error,story) => {
//   if(error){
//     return handleError(error);
//   }
//   console.log(story);
// });


// Story.findOne({'title' : 'Once upon a timex.'})
//       .populate('_creator','name')
//       .exec((err,story) => {
//         if(err){
//           return handleError(err);
//         }
//         console.log(story);
//       });


// Story.find()
//       .populate({
//         path: 'fans',
//         match: { age: {$gte: 21}},
//         select: 'name -_id',
//         options: {limit: 5}
//       })
//       .exec((err,story) => {
//         if(err){
//           return handleError(err);
//         }
//         console.log(story);
//       });


// User.find({
//   'name' : 'Remy Nguyen',
//   'email' : 'remy@gmail.com',
// },'name email',(err,user) => {
//   if(err) return handleError(err);
//   console.log(user);
// });


// let member = User.find({
//     'name' : 'Remy Nguyen',
//     'email' : 'remy@gmail.com'
// });
// member.select('name email');
// member.exec((err,user) => {
//   if(err) return handleError(err);
//   console.log(user);
// });

// User.find({'name' : 'Remy Nguyen'})
//     .where('email').equals('remy@gmail.com')
//     .select('name email')
//     .limit(5)
//     .exec((err,user) => {
//       console.log(user)
//     });

const prettyLog = (log) => console.log(JSON.stringify(log));

const member = {
  name : 'Remy Nguyen',
  location : {
    state: 'Da Lat',
    country: 'Viet Nam'
  },
  professional: 'Mobile And Web Developer'
};

const { name , location } = member;

// const { name: testName } = member;
// prettyLog(testName);

// const { ...rest } = member;
// prettyLog(rest);


const animals = [
  {name: 'Dog', legs : 4},
  {name: 'Cat', legs : 4},
  {name: 'Fish', legs : 0},
]

// const [animal1,animal2] = animals

const [...rest] = animals


prettyLog(rest);




app.set('port', process.env.PORT || 4100);
var server = app.listen(app.get('port'), () => {
  console.log(`Listening on port http://localhost:${app.get('port')}`);
});

reload(server, app);
// module.exports = app;