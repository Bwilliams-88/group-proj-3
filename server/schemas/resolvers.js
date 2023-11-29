//server/schemas/resolvers.js
const { signToken, AuthenticationError } = require("../utils/auth");
const { User, Event } = require("../models/");

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        const userInfo = await User.findOne({ _id: context.user._id });
        return userInfo;
      }
      throw new AuthenticationError("Not logged in");
    },
    events: async () => {
      const events = await Event.find();
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
        throw new AuthenticationError("Incorrect credentials");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
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
      throw new AuthenticationError("Not logged in");
    },
    addEvent: async (_, args, context) => {
      const user = authMiddleware(context);

      const event = new Event({
        ...args,
        admin: user._id,
      });

      await event.save();

      await User.findByIdAndUpdate(user._id, {
        $push: { events: event._id },
      });

      return event;
    },
  },
};

module.exports = resolvers;
