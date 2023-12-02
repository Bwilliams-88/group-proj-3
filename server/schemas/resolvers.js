// server/schemas/resolvers.js

const { signToken, AuthenticationError } = require("../utils/auth");
const { User, Event } = require("../models/");
const { authMiddleware } = require("../utils/auth");

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        const userInfo = await User.findOne({ _id: context.user._id }).populate(
          "events"
        );
        return userInfo;
      }
      throw AuthenticationError;
    },
    events: async () => {
      console.log("hello!!!");
      const events = await Event.find();
      console.log(events);
      return events;
    },
    event: async (_, {eventId}) => {
      try {
        const events = await Event.findById(eventId);
      return events
      } catch (error) {
        console.log(error)
      }
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
        ).populate("events");
        return user;
      }
      throw AuthenticationError;
    },
    addEvent: async (_, args, context) => {
      console.log("hi");
      //const user = authMiddleware(context);
      console.log("this is user in add event: ", context.user);
      console.log(args);
      const event = Event.create({
        ...args,
        admin: context.user._id,
      });

      await User.findByIdAndUpdate(context.user._id, {
        $push: { events: event._id },
      });
    },
  },
};

module.exports = resolvers;
