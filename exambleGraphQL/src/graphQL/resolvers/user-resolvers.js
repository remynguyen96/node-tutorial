import User from '../../models/User';
export default {
  signup: async (_, { fullName, ...rest }) => {
    try {
      const [firstName, ...lastName] = fullName.split(' ');
      const user = await User.create({ firstName, lastName, ...rest });
      console.log(user.createToken());
      return {
        token: user.createToken(),
      };
    } catch (e) {
      throw e;
    }
  },
  login: async (_, { email, password }) => {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error('User not exist !');
      }
      if (!user.authenticateUser(password)) {
        throw new Error('Password not correct !');
      }
      return {
        token: user.createToken(),
      };
    } catch (error) {
      throw error;
    }
  },
};
