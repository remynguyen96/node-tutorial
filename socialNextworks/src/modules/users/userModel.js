import mongoose,{ Schema } from 'mongoose';
import { hashSync, compareSync } from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import constants from '../../config/constants';

const UserSchema = new Schema({
  google: {
    id: String,
    token: String,
    email: String,
    name: String
  }
});


export default mongoose.model('User',UserSchema);