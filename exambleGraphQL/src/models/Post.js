import mongoose, {Schema} from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator'

const PostSchema = new Schema({
  title: {
    type: String,
    trim: true,
    minLength: [5, 'Title post need to be longer !'],
    maxLength: [120, 'Title post at least 120 letters !'],
    required: [true,'Title post is required !'],
  },
  alias: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true,'Slug post is required !'],
  },
  description: {
    type: String,
    required: [true,'Description post is required !'],
  },
  images: {
    type: String,
    trim: true,
  },
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Categories',
      required: [true, 'Category is required !'],
    }
  ],
  author:{
    type: Schema.Types.ObjectId,
    red: 'User'
    // required: [true, 'Author is required !'],
  },
  favoriteCount: {
    type: Number,
    default: 0,
  }
},{timestamp: true});

PostSchema.plugin(uniqueValidator, {
  message: '{VALUE} already taken !'
});

PostSchema.methods = {
  toJSON() {
    return {
      _id: this._id,
      title: this.title,
      alias: this.alias,
      images: this.images,
      description: this.description,
      categories: this.categories,
      author: this.author,
      favoriteCount: this.favoriteCount,
      createdAt: this.createdAt
    }
  }
}

export default mongoose.model('Post', PostSchema);
