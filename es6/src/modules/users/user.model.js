import mongoose, { Schema } from 'mongoose';

import validator from 'validator';

import uniqueValidator from 'mongoose-unique-validator';

import { hashSync, compareSync } from 'bcrypt-nodejs';

import jwt from 'jsonwebtoken';

import Post from '../posts/posts.model';
import { passwordReg } from './user.validation';

import constants from '../../config/constants';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required !'],
    trim: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: '{VALUE} is not a valid email !',
    },
  },
  name: {
    type: String,
    required: [true, 'Name is required !'],
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required !'],
    trim: true,
    minLength: [5, 'Password need to bo longer !'],
    validate: {
      validator(password) {
        return passwordReg.test(password);
      },
      message: '{VALUE} is not valid password !',
    },
  },
  favorites: {
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
  },
},{timestamps: true});

UserSchema.plugin(uniqueValidator, {
  message: '{VALUE} already taken !',
});

// Middleware to ensure password is encrypted before saving user to database
UserSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    this.password = this._hashPassword(this.password);
  }
  return next();
});

UserSchema.methods = {
  _hashPassword(password) {
    return hashSync(password);
  },
  authenticateUser(password) {
    return compareSync(password, this.password);
  },
  createToken() {
    return jwt.sign(
      { _id: this._id },
      constants.JWT_SECRET,
      { expiresIn: 1800 } // 30 minutes
    );
  },
  toAuthJSON() {
    return {
      _id: this._id,
      email: this.email,
      token: `JWT ${this.createToken()}`,
    };
  },
  toJSON() {
    return {
      _id: this._id,
      name: this.name,
    };
  },
  _favorites: {
    async posts(postId) {
      if (this.favorites.posts.indexOf(postId) >= 0) {
        this.favorites.posts.remove(postId);
        await Post.decFavoriteCount(postId);
      } else {
        this.favorites.posts.push(postId);
        await Post.incFavoriteCount(postId);
      }

      return this.save();
    },

    isPostIsFavorite(postId) {
      if(this.favorites.posts.indexOf(postId) >= 0){
        return true;
      }

      return false;
    }
  },
};

export default mongoose.model('User', UserSchema);

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
