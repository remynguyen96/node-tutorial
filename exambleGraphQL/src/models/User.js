import mongoose, { Schema } from 'mongoose';
import {compareSync, hashSync} from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import constants from '../config/constants';

const UserSchema = new Schema ({
  email: {
    type: String,
    unique: true,
    required: true
  },
  firstName: String,
  lastName: String,
  avatar: String,
  password: {
    type: String,
    required: true
  }
},{timestamp: true});

UserSchema.pre('save', function(next) {
  if(this.isModified('password')) {
    this.password = this._hashPassword(this.password);
    return next();
  }
});

UserSchema.methods = {
  _hashPassword(password) {
    return hashSync(password);
  },
  authenticateUser(password) {
    return compareSync(password, this.password)
  },
  createToken() {
    return jwt.sign({_id: this._id}, constants.JWT_SECRET);
  }

}
// getUsers: [User]
// me(_id: ID): Me


// createCategories(name: String, slug: String, description: String): Categories
// updateCategories(_id: ID, name: String, slug: String, description: String): Categories
// deleteCategories(_id: ID): Status
// createPost(title: String, alias: String, description: String, categories: [Categories], images: String): Post
// updatePost(_id: ID, title: String, alias: String, description: String, categories: [Categories], images: String): Post
// deletePost(_id: ID): Status
// signup(email: String, fullName: String, password: String, avatar: String): Auth
// login(email: String, password: String): Auth

export default mongoose.model('User', UserSchema);