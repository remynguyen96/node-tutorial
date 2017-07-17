module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const devConfig = {
  MONGO_URL: 'localhost:27017/es6',
  JWT_SECRET: 'ILOVELIFE',
  PASSPORTCODE: 'I-LOVE-MOM',
  MAIL_HOST: 'smtp.mailtrap.io',
  MAIL_PORT: '2525',
  MAIL_USERNAME: 'a1285327665551',
  MAIL_PASSWORD: '0875bbf87059c7'
};

const testConfig = {
  MONGO_URL: 'localhost:27017/es6'
};

const prodConfig = {
  MONGO_URL: 'localhost:27017/es6'
};

const defaultConfig = {
  PORT: process.env.PORT || 4000
};

function envConfig(env) {
  switch (env) {
    case 'development':
      return devConfig;
    case 'test':
      return testConfig;
    default:
      return prodConfig;
  }
}

exports.default = Object.assign({}, defaultConfig, envConfig(process.env.NODE_ENV));

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(3);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _validator = __webpack_require__(31);

var _validator2 = _interopRequireDefault(_validator);

var _mongooseUniqueValidator = __webpack_require__(10);

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _bcryptNodejs = __webpack_require__(21);

var _jsonwebtoken = __webpack_require__(25);

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _posts = __webpack_require__(4);

var _posts2 = _interopRequireDefault(_posts);

var _user = __webpack_require__(5);

var _constants = __webpack_require__(0);

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const UserSchema = new _mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required !'],
    trim: true,
    validate: {
      validator(email) {
        return _validator2.default.isEmail(email);
      },
      message: '{VALUE} is not a valid email !'
    }
  },
  name: {
    type: String,
    required: [true, 'Name is required !'],
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required !'],
    trim: true,
    minLength: [5, 'Password need to bo longer !'],
    validate: {
      validator(password) {
        return _user.passwordReg.test(password);
      },
      message: '{VALUE} is not valid password !'
    }
  },
  favorites: {
    posts: [{
      type: _mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }]
  }
}, { timestamps: true });

UserSchema.plugin(_mongooseUniqueValidator2.default, {
  message: '{VALUE} already taken !'
});

// Middleware to ensure password is encrypted before saving user to database
UserSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = this._hashPassword(this.password);
  }
  return next();
});

UserSchema.methods = {
  _hashPassword(password) {
    return (0, _bcryptNodejs.hashSync)(password);
  },
  authenticateUser(password) {
    return (0, _bcryptNodejs.compareSync)(password, this.password);
  },
  createToken() {
    return _jsonwebtoken2.default.sign({ _id: this._id }, _constants2.default.JWT_SECRET, { expiresIn: 1800 // 30 minutes
    });
  },
  toAuthJSON() {
    return {
      _id: this._id,
      email: this.email,
      token: `JWT ${this.createToken()}`
    };
  },
  toJSON() {
    return {
      _id: this._id,
      name: this.name
    };
  },
  _favorites: {
    async posts(postId) {
      if (this.favorites.posts.indexOf(postId) >= 0) {
        this.favorites.posts.remove(postId);
        await _posts2.default.decFavoriteCount(postId);
      } else {
        this.favorites.posts.push(postId);
        await _posts2.default.incFavoriteCount(postId);
      }

      return this.save();
    },

    isPostIsFavorite(postId) {
      if (this.favorites.posts.indexOf(postId) >= 0) {
        return true;
      }

      return false;
    }
  }
};

exports.default = _mongoose2.default.model('User', UserSchema);

// var emailValidator = [
//     validate({
//         validator: 'matches',
//         arguments: /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/,
//         message: 'Name must be at least 3 characters, max 40, no special characters or numbers, must have space in between name.'
//     }),
//     validate({
//         validator: 'isLength',
//         arguments: [3, 40],
//         message: 'Email should be between {ARGS[0]} and {ARGS[1]} characters'
//     })
// ];
//
// // Username Validator
// var usernameValidator = [
//     validate({
//         validator: 'isLength',
//         arguments: [3, 25],
//         message: 'Username should be between {ARGS[0]} and {ARGS[1]} characters'
//     }),
//     validate({
//         validator: 'isAlphanumeric',
//         message: 'Username must contain letters and numbers only'
//     })
// ];
//
// // Password Validator
// var passwordValidator = [
//     validate({
//         validator: 'matches',
//         arguments: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/,
//         message: 'Password needs to have at least one lower case, one uppercase, one number, one special character, and must be at least 8 characters but no more than 35.'
//     }),
//     validate({
//         validator: 'isLength',
//         arguments: [8, 35],
//         message: 'Password should be between {ARGS[0]} and {ARGS[1]} characters'
//     })
// ];
// // User Mongoose Schema
// var UserSchema = new Schema({
//     name: { type: String, required: true, validate: nameValidator },
//     username: { type: String, lowercase: true, required: true, unique: true, validate: usernameValidator },
//     password: { type: String, required: true, validate: passwordValidator, select: false },
//     email: { type: String, required: true, lowercase: true, unique: true, validate: emailValidator },
//     active: { type: Boolean, required: true, default: false },
//     temporarytoken: { type: String, required: true },
//     resettoken: { type: String, required: false },
//     permission: { type: String, required: true, default: 'moderator' }
// });

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(3);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _slug = __webpack_require__(30);

var _slug2 = _interopRequireDefault(_slug);

var _mongooseUniqueValidator = __webpack_require__(10);

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PostSchema = new _mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Title is required !'],
    minLength: [3, 'Title need to be longer !'],
    unique: true
  },
  slug: {
    type: String,
    trim: true,
    lowercase: true
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'Description is required !'],
    minLength: [10, 'Description need to be longer !']
  },
  author: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  favoriteCount: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

PostSchema.plugin(_mongooseUniqueValidator2.default, {
  message: '{VALUE} already taken!'
});

PostSchema.pre('validate', function (next) {
  this._slugify();

  next();
});

PostSchema.methods = {
  _slugify() {
    this.slug = (0, _slug2.default)(this.title);
  },
  toJSON() {
    return {
      _id: this._id,
      title: this.title,
      slug: this.slug,
      description: this.description,
      author: this.author,
      favoriteCount: this.favoriteCount,
      createdAt: this.createdAt
    };
  }
};

PostSchema.statics = {
  createPost(args, author) {
    return this.create(Object.assign({}, args, {
      author
    }));
  },

  list({ skip = 0, limit = 5 } = {}) {
    return this.find().sort({ createdAt: -1 }).skip(skip).limit(limit).populate('author');
  },

  incFavoriteCount(postId) {
    return this.findByIdAndUpdate(postId, { $inc: { favoriteCount: 1 } });
  },

  decFavoriteCount(postId) {
    return this.findByIdAndUpdate(postId, { $inc: { favoriteCount: -1 } });
  }
};

exports.default = _mongoose2.default.model('Post', PostSchema);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passwordReg = undefined;

var _joi = __webpack_require__(9);

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const passwordReg = exports.passwordReg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
// 1 number 1 Upppercase > 6 character

exports.default = {
  signUp: {
    body: {
      name: _joi2.default.string().required(),
      email: _joi2.default.string().email().required(),
      password: _joi2.default.string().regex(passwordReg).required()
    }
  }
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authJwt = exports.authLocal = undefined;

var _passport = __webpack_require__(11);

var _passport2 = _interopRequireDefault(_passport);

var _passportLocal = __webpack_require__(29);

var _passportLocal2 = _interopRequireDefault(_passportLocal);

var _passportJwt = __webpack_require__(28);

var _user = __webpack_require__(2);

var _user2 = _interopRequireDefault(_user);

var _constants = __webpack_require__(0);

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const localOpts = {
  usernameField: 'email'
  // passwordField: 'password',
  // passReqToCallback: true,
};

const localStrategy = new _passportLocal2.default(localOpts, async (email, password, done) => {
  try {
    const user = await _user2.default.findOne({ email });

    if (!user) {
      return done(null, false);
    } else if (!user.authenticateUser(password)) {
      return done(null, false);
    }
    return done(null, user);
  } catch (e) {
    return done(e, false);
  }
});

// Jwt strategy

const jwtOpts = {
  jwtFromRequest: _passportJwt.ExtractJwt.fromAuthHeader('authorization'),
  secretOrKey: _constants2.default.JWT_SECRET
};

const jwtStrategy = new _passportJwt.Strategy(jwtOpts, async (payload, done) => {
  try {
    const user = await _user2.default.findById(payload._id);

    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (e) {
    return done(e, false);
  }
});

_passport2.default.use(localStrategy);
_passport2.default.use(jwtStrategy);

const authLocal = exports.authLocal = _passport2.default.authenticate('local', { session: false });
const authJwt = exports.authJwt = _passport2.default.authenticate('jwt', { session: false });

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("express-validation");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("http-status");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("joi");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("mongoose-unique-validator");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _mongoose = __webpack_require__(3);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _constants = __webpack_require__(0);

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-console */

_mongoose2.default.Promise = global.Promise;

try {
  _mongoose2.default.connect(_constants2.default.MONGO_URL);
} catch (err) {
  _mongoose2.default.createConnection(_constants2.default.MONGO_URL);
}

_mongoose2.default.connection.once('open', () => console.log('      MongoDB Running')
// .on('error', err => {
//   throw err;
// });
).on('error', console.error.bind(console, 'MongoDB connection error: '));

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _morgan = __webpack_require__(26);

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = __webpack_require__(22);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _compression = __webpack_require__(23);

var _compression2 = _interopRequireDefault(_compression);

var _helmet = __webpack_require__(24);

var _helmet2 = _interopRequireDefault(_helmet);

var _passport = __webpack_require__(11);

var _passport2 = _interopRequireDefault(_passport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

exports.default = app => {
  if (isProd) {
    app.use((0, _compression2.default)());
    app.use((0, _helmet2.default)());
  }

  app.use(_bodyParser2.default.json());
  app.use(_bodyParser2.default.urlencoded({ extended: true }));
  app.use(_passport2.default.initialize());

  if (isDev) {
    app.use((0, _morgan2.default)('dev'));
  }
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = __webpack_require__(20);

var _user2 = _interopRequireDefault(_user);

var _posts = __webpack_require__(17);

var _posts2 = _interopRequireDefault(_posts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { authJwt } from '../services/auth.services';


exports.default = app => {
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });
  app.use('/api/users', _user2.default);
  app.use('/api/posts', _posts2.default);
  // app.get('/hello', authJwt, (req, res) => res.send({ status: 'successful !' }));
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(1);

var _express2 = _interopRequireDefault(_express);

var _constants = __webpack_require__(0);

var _constants2 = _interopRequireDefault(_constants);

__webpack_require__(12);

var _middleware = __webpack_require__(13);

var _middleware2 = _interopRequireDefault(_middleware);

var _modules = __webpack_require__(14);

var _modules2 = _interopRequireDefault(_modules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();

// NOTE: Setup Middleware
/* eslint-disable no-console */

(0, _middleware2.default)(app);

// NOTE: Setup Router
(0, _modules2.default)(app);

// NOTE: User reduce with array
// const names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];
// const countedNames = names.reduce((allNames, value, index, arr) => {
//   if (value in allNames) {
//     allNames[value]++;
//   }
//   else {
//     allNames[value] = 1;
//   }
//   return allNames;
// }, {});

// NOTE: Part 1
// const test1 = 'demo';
// const test2 = {
//   a: 'demo 1',
//   b: 'demo 2',
//   c: 'demo 3',
//   d: 'demo 4',
// };
// const test = [test1,test2];
// for(const i in test2) {
//   console.log(test2[i]);
// }
// for(const i of test) {
//   console.log(i);
// }

// NOTE: Part2
// function greeting(name) {
//   return {
//     sayHi() {
//       console.log(`Say Hi ${name}`);
//     },
//     sayBye() {
//       console.log(`Say Bye ${name}`);
//     }
//   }
// }
// const {sayHi: hi, sayBye: bye} = greeting('Remy Nguyen');
// hi();
// NOTE: Part4
// const [x,y,z] = [1,2,4,5,6,7,8];

// const {length : len} = 'asdsadsadbc';
// console.log(len);

// const [x,...y] = 'abc';
// console.log(x);
// console.log(y);

// function log(x){
//   console.log(x);
//   return 'yes';
// }
// const [ x=log('hello') ] = [];
// const [ x=log('hello') ] = [123213];

// NOTE: Part5
// function* gen(input){
//   const netIN = yield(input);
//   yield(netIN);
// };
// const it = gen('Init');
// console.log(it.next());
// console.log(it.next('NextInput'));

// function* allNumber(){
//   for (let n= 0; ; n++) {
//     yield(n);
//   }
// }
// const [x,y,z] = allNumber();
// console.log(x);
// console.log(y);
// console.log(z);

// function* bookRepo(number) {
//   const list = [
//     {title : 'List 1'},
//     {title : 'List 2'},
//     {title : 'List 3'},
//     {title : 'List 4'},
//     {title : 'List 5'},
//   ];
//   let out = [];
//   for (const item of list) {
//     out.push(item);
//     if(out.length >= number) {
//       number = yield out;
//       out = [];
//     }
//   }
//   yield out;
// }

// const repo = bookRepo(2);
// console.log(repo.next());
// console.log(repo.next(2));
// console.log(repo.next(2));


// import fs from 'fs';
// const readFileNew = filename =>
//   new Promise((resolve, reject) => {
//     fs.readFile(filename, 'utf8', (err, result) => {
//       if (err) return reject(err);
//       resolve(result.toString());
//     });
//   });
// readFileNew('./src/message.txt').then(
//   result => console.log(result),
//   err => console.log(err),
// );

// NOTE: Setup Server
app.listen(_constants2.default.PORT, err => {
  if (err) {
    throw err;
  } else {
    console.log(`
      Server running on port : ${_constants2.default.PORT}
      -----------------------------
      Running on ${process.env.NODE_ENV}
      -----------------------------
    `);
  }
});

// yarn add -D babel-preset-env babel-plugin-transform-object-rest-spread
// yarn add -D webpack babel-core babel-loader webpack-node-externals
// yarn add -D eslint eslint-config-equimper
// yarn add mongoose body-parser helmet compression && yarn add -D morgan

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPost = createPost;
exports.getPostById = getPostById;
exports.getPostsList = getPostsList;
exports.updatePost = updatePost;
exports.deletePost = deletePost;
exports.favoritePost = favoritePost;
exports.uploadImage = uploadImage;

var _httpStatus = __webpack_require__(8);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _multer = __webpack_require__(27);

var _multer2 = _interopRequireDefault(_multer);

var _posts = __webpack_require__(4);

var _posts2 = _interopRequireDefault(_posts);

var _user = __webpack_require__(2);

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-console */

async function createPost(req, res) {
  try {
    const post = await _posts2.default.createPost(req.body, req.user._id);
    return res.status(_httpStatus2.default.CREATED).json(post);
  } catch (e) {
    return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
  }
}

async function getPostById(req, res) {
  try {
    const promise = await Promise.all([_user2.default.findById(req.user.id), _posts2.default.findById(req.params.id).populate('author')]);
    const favorite = promise[0]._favorites.isPostIsFavorite(req.params.id);
    const post = promise[1];
    //   const post = await Post.findById(req.params.id).populate('author');
    return res.status(_httpStatus2.default.OK).json(Object.assign({}, post.toJSON(), {
      favorite
    }));
  } catch (e) {
    return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
  }
}

async function getPostsList(req, res) {
  // http://localhost:4000/api/posts?limit=3&skip=2
  const skip = parseInt(req.query.skip, 0);
  const limit = parseInt(req.query.limit, 0);
  try {
    const promise = await Promise.all([_user2.default.findById(req.user._id), _posts2.default.list({ skip, limit })]);

    const posts = promise[1].reduce((arr, post) => {
      const favorite = promise[0]._favorites.isPostIsFavorite(post._id);
      arr.push(Object.assign({}, post.toJSON(), {
        favorite
      }));
      return arr;
    }, []);

    return res.status(_httpStatus2.default.OK).json(posts);
    // const posts = await Post.list({ skip, limit });
    // const posts = await Post.find().populate('author');
  } catch (e) {
    return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
  }
}

async function updatePost(req, res) {
  try {
    const post = await _posts2.default.findById(req.params.id);
    if (!post.author.equals(req.user._id)) {
      return res.sendStatus(_httpStatus2.default.UNAUTHORIZED);
    }
    Object.keys(req.body).forEach(key => {
      post[key] = req.body[key];
    });

    return res.status(_httpStatus2.default.OK).json((await post.save()));
  } catch (e) {
    return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
  }
}

async function deletePost(req, res) {
  try {
    const post = await _posts2.default.findById(req.params.id);
    if (!post.author.equals(req.user._id)) {
      return res.sendStatus(_httpStatus2.default.UNAUTHORIZED);
    }

    await post.remove();
    return res.sendStatus(_httpStatus2.default.OK);
  } catch (e) {
    return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
  }
}

async function favoritePost(req, res) {
  try {
    const user = await _user2.default.findById(req.user._id);
    await user._favorites.posts(req.params.id);
    return res.sendStatus(_httpStatus2.default.OK);
  } catch (e) {
    return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
  }
}

const storage = _multer2.default.diskStorage({
  destination(req, file, cb) {
    cb(null, './dist/assets/images');
  },
  filename: (req, file, cb) => {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      const err = new Error();
      err.code = 'filetype';
      return cb(err);
    }
    const typeFile = file.originalname.split('.')[file.originalname.split('.').length - 1];
    const nameFile = file.originalname.replace(`.${typeFile}`, '');
    cb(null, `${nameFile}-${Date.now()}.${typeFile}`);
  }
});

const upload = (0, _multer2.default)({
  storage,
  limits: {
    fileSize: 8000000
  }
}).single('file');

async function uploadImage(req, res) {
  try {
    upload(req, res, err => {
      console.log(req.file);
      if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(_httpStatus2.default.BAD_REQUEST).json({ success: false, message: 'File size is too large. Max limit is 8MB' });
        } else if (err.code === 'filetype') {
          return res.status(_httpStatus2.default.BAD_REQUEST).json({ success: false, message: 'File type is invalid. Must be .png,.jpg,.jpeg' });
        }
        return res.status(_httpStatus2.default.BAD_REQUEST).json({ success: false, message: 'File was not able to be uploaded !' });
      }
      return res.status(_httpStatus2.default.OK).json({ success: true, message: 'File was uploaded !' });
    });
  } catch (e) {
    return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
  }
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(1);

var _expressValidation = __webpack_require__(7);

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _posts = __webpack_require__(16);

var PostController = _interopRequireWildcard(_posts);

var _auth = __webpack_require__(6);

var _posts2 = __webpack_require__(18);

var _posts3 = _interopRequireDefault(_posts2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = new _express.Router();

routes.get('/', _auth.authJwt, PostController.getPostsList);

routes.post('/', _auth.authJwt, (0, _expressValidation2.default)(_posts3.default.createPost), PostController.createPost);

routes.get('/:id', _auth.authJwt, PostController.getPostById);

routes.patch('/:id', _auth.authJwt, (0, _expressValidation2.default)(_posts3.default.updatePost), PostController.updatePost);

routes.delete('/:id', _auth.authJwt, PostController.deletePost);

routes.post('/:id/favorite', _auth.authJwt, PostController.favoritePost);

routes.post('/upload', PostController.uploadImage);

exports.default = routes;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = __webpack_require__(9);

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  createPost: {
    body: {
      title: _joi2.default.string().min(3).required(),
      description: _joi2.default.string().min(10).required()
    }
  },
  updatePost: {
    body: {
      title: _joi2.default.string().min(3),
      description: _joi2.default.string().min(10)
    }
  }
};

//   createPost: {
//     body: {
//       title: Joi.string().required().min(5).trim(),
//       slug: Joi.string().required().min(5).lowercase().trim(),
//       description: Joi.string().required().min(5),
//     }
//   },

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signUp = signUp;
exports.login = login;

var _httpStatus = __webpack_require__(8);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _user = __webpack_require__(2);

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function signUp(req, res) {
  try {
    const user = await _user2.default.create(req.body);
    return res.status(_httpStatus2.default.CREATED).json(user.toAuthJSON());
  } catch (e) {
    return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
  }
}

function login(req, res, next) {
  res.status(_httpStatus2.default.OK).json(req.user.toAuthJSON());
  // res.status(HTTPStatus.OK).json(req.user.toAuthJSON());
  // res.status(200).json(req.user.createToken());
  return next();
}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(1);

var _expressValidation = __webpack_require__(7);

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _auth = __webpack_require__(6);

var _user = __webpack_require__(19);

var UserController = _interopRequireWildcard(_user);

var _user2 = __webpack_require__(5);

var _user3 = _interopRequireDefault(_user2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = new _express.Router();

routes.post('/sign-up', (0, _expressValidation2.default)(_user3.default.signUp), UserController.signUp);
routes.post('/login', _auth.authLocal, UserController.login);
// routes.get('/demo', (req, res) =>  res.json('lorem'));

exports.default = routes;

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("bcrypt-nodejs");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("multer");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("passport-jwt");

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("slug");

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = require("validator");

/***/ })
/******/ ]);