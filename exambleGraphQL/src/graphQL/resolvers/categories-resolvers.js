import Categories from '../../models/Categories';

export default {
  getCategory: async(_, {_id}) => {
    try {
      return Categories.findById(_id);
    } catch(e) {
      throw e;
    }
  },
  getCategories: async(_, args) => {
    try {
      return Categories.find({}).sort({createdAt: -1});
    } catch(e) {
      throw e;
    }
  },
}