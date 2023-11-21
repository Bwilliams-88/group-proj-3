const { signToken, AuthenticationError } = require("../utils/auth");
const { User } = require("../models/");

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.User) {
        const userInfo = await User.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
  },
  Mutation: {
    addUser: async (parent, args, context) => {
      const userInfo = await User.create(args);
      const token = signToken(userInfo);
      return { userInfo, token };
    },
    login: async (parent, args, context) => {
      const user = await User.findOne({ email: args.email });
      if (!user) {
        throw AuthenticationError;
      }
      const correctPw = await User.isCorrectPassword(args.password);
      if (!correctPw) {
        throw AuthenticationError;
      }
      const token = signToken(user);
      return { user, token };
    },
    saveEvent: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedEvents: args.eventInfo } },
          { new: true, runValidators: true }
        );
        return user;
      }
      throw AuthenticationError;
    },
    addEvent: async (parent, args, context) => {
      const eventInfo = await User.create(args);
      return { eventInfo };
    },
  },
};

module.exports = resolvers;
