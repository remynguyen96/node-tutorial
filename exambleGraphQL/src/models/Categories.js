import mongoose, {Schema} from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator'

const CategorySchema = new Schema({
  name: {
    type: String,
    trim: true,
    minLength: [5, 'Name cateogory need to be longer !'],
    maxLength: [120, 'Name cateogory at least 120 letters !'],
    required: [true,'Name cateogory is required !'],
  },
  slug: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true,'Slug cateogory is required !'],
  },
  description: {
    type: String,
    required: [true,'Description cateogory is required !'],
  },
  author:{
    type: Schema.Types.ObjectId,
    red: 'User'
    // required: [true, 'Author is required !'],
  }
},{timestamp: true});

CategorySchema.plugin(uniqueValidator, {
  message: '{VALUE} already taken !'
});


CategorySchema.methods = {
  toJSON() {
    return {
      _id: this._id,
      name: this.name,
      slug: this.slug,
      description: this.description,
      author: this.author,
      createdAt: this.createdAt
    }
  }
}

export default mongoose.model('Categories', CategorySchema);
