const { signToken, AuthenticationError } = require("../utils/auth");
const { User, Event } = require("../models/");

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        const userInfo = await User.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
    events: async () => {
      const events = await Event.find();
      console.log(events, "event");
      return events;
    },
  },

  Mutation: {
    addUser: async (parent, args, context) => {
      const userInfo = await User.create(args);
      const token = signToken(userInfo);
      return { userInfo, token };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw AuthenticationError;
      }
      const correctPw = await user.isCorrectPassword(password);
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
