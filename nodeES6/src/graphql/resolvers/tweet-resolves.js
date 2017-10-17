import Tweet from '../../models/Tweet';
import { requiredAuth } from '../../auth';
// export default {
//   getTweet: (_, { _id }) => Tweet.findById(_id),
//   getTweets: () => Tweet.find({}).sort({ createdAt: -1 }),
//   createTweet: (_, args) => Tweet.create(args),
//   updateTweet: (_, { _id, ...rest }) =>
//     Tweet.findByIdAndUpdate(_id, rest, { new: true }),
//   deleteTweet: async (_, { _id }) => {
//     try {
//       await Tweet.findByIdAndUpdate(_id);
//       return {
//         message: 'Delete Success !',
//       };
//     } catch (error) {
//       throw error;
//     }
//   },
// };
export default {
  getTweet: async (_, { _id }, { user }) => {
    try {
      await requiredAuth(user);
      return Tweet.findById(_id);
    } catch (e) {
      throw e;
    }
  },
  getTweets: async (_, args, { user }) => {
    try {
      await requiredAuth(user);
      return Tweet.find({}).sort({ createdAt: -1 });
    } catch (e) {
      throw e;
    }
  },
  getUserTweets: async (_, args, { user }) => {
    try {
      await requireAuth(user);
      return Tweet.find({ user: user._id }).sort({ createdAt: -1 })
    } catch (error) {
      throw error;
    }
  },
  createTweet: async (_, args, { user }) => {
    try {
      await requiredAuth(user);
      return Tweet.create({ ...args, user: user._id });
    } catch (e) {
      throw e;
    }
  },
  updateTweet: async (_, { _id, ...rest }, { user }) => {
    try {
      await requiredAuth(user);
      const tweet = await Tweet.findOne({ _id, user: user._id });
      if (!tweet) {
        throw new Error('Not found!');
      }
      Object.entries(rest).forEach(([key, value]) => {
        tweet[key] = value;
      });
      return tweet.save();
      // return Tweet.findByIdAndUpdate(_id, rest, { new: true });
    } catch (e) {
      throw e;
    }
  },
  deleteTweet: async (_, { _id }, { user }) => {
    try {
      await requiredAuth(user);
      const tweet = await Tweet.findOne({ _id, user: user._id });
      if (!tweet) {
        throw new Error('Not found!');
      }
      await tweet.remove();
      // await Tweet.findByIdAndRemove(_id);
      return {
        message: 'Delete Success !',
      };
    } catch (e) {
      throw e;
    }
  },
};
