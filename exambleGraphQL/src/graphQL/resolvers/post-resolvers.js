import Post from '../../models/Post';

export default {
  getPost: async(_, {_id}) => {
    try {
      return Post.findById(_id);
    } catch(e) {
      throw e;
    }
  },
  getPosts: async(_, args) => {
    try {
      return Post.find({}).sort({createdAt: -1});
    } catch(e) {
      throw e;
    }
  },
}