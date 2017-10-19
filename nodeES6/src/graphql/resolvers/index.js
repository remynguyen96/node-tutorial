import GraphQLDate from 'graphql-date';
import TweetResolvers from './tweet-resolves';
import UserResolvers from './user-resolves';
import User from '../../models/User';

export default {
  Date: GraphQLDate,
  Tweet: {
    user: ({ user }) => User.findById(user),
  },
  Query: {
    getTweet: TweetResolvers.getTweet,
    getTweets: TweetResolvers.getTweets,
  },
  Mutation: {
    createTweet: TweetResolvers.createTweet,
    updateTweet: TweetResolvers.updateTweet,
    deleteTweet: TweetResolvers.deleteTweet,
    signup: UserResolvers.signup,
    login: UserResolvers.login,
  },
};
