import mongoose, { Schema } from 'mongoose';
import slug from 'slug';
import uniqueValidator from 'mongoose-unique-validator';

const PostSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, 'Title is required !'],
      minLength: [3, 'Title need to be longer !'],
      unique: true,
    },
    slug: {
      type: String,
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      trim: true,
      required: [true, 'Description is required !'],
      minLength: [10, 'Description need to be longer !'],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    favoriteCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

PostSchema.plugin(uniqueValidator, {
  message: '{VALUE} already taken!',
});

PostSchema.pre('validate', function(next) {
  this._slugify();

  next();
});

PostSchema.methods = {
  _slugify() {
    this.slug = slug(this.title);
  },
  toJSON() {
    return {
      _id: this._id,
      title: this.title,
      slug: this.slug,
      description: this.description,
      author: this.author,
      favoriteCount: this.favoriteCount,
      createdAt: this.createdAt,
    };
  },
};

PostSchema.statics = {
  createPost(args, author) {
    return this.create({
      ...args,
      author,
    });
  },

  list({ skip = 0, limit = 5 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('author');
  },

  incFavoriteCount(postId) {
      return this.findByIdAndUpdate(postId, { $inc: { favoriteCount: 1 } });
  },

  decFavoriteCount(postId) {
    return this.findByIdAndUpdate(postId, { $inc: { favoriteCount: -1 } });
  },
};

export default mongoose.model('Post', PostSchema);
