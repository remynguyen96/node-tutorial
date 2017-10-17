import GraphQLDate from 'graphql-date';
import CategoriesResolvers from './categories-resolvers';
import PostResolvers from './post-resolvers';
import UserResolvers from './user-resolvers';

export default {
  Date: GraphQLDate,
  Query: {
    getPost: PostResolvers.getPost,
    getPosts: PostResolvers.getPosts,
    getCategory: CategoriesResolvers.getCategory,
    getCategories: CategoriesResolvers.getCategories
  }
};