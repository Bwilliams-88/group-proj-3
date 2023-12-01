// server/utils/auth.js
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const { User } = require("../models"); // Import your User model

const secret = "password";
const expiration = "2h";

module.exports = {
  authenticationError: new GraphQLError("Could not authenticate user.", {
    extensions: {
      code: "UNAUTHENTICATED",
    },
  }),
  authMiddleware: async function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;
  
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }
  
    console.log("Extracted token:", token);
  
    if (!token) {
      throw new Error("Token not provided");
    }
  
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
  
      // Fetch user's events from the database
      // const userWithEvents = await User.findById(data._id).populate("events");
  
      // Update req.user to include events
      req.user = data
      return req
      
    } catch (error) {
      console.log("Invalid token:", error.message);
    }
  
    return req;
  },

  signToken: function ({ email, name, _id }) {
    const payload = { email, name, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
