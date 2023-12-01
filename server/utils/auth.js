// server/utils/auth.js

const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const { User } = require("../models"); // Import your User model

const secret = "password";
const expiration = "2h";

function isTokenAboutToExpire(expirationTimestamp) {
  // Calculate the time remaining until the token expires
  const now = Date.now() / 1000; // current time in seconds
  const timeUntilExpiration = expirationTimestamp - now;

  // Check if the token is about to expire in, for example, 5 minutes
  const minutesBeforeExpiration = 5 * 60; // 5 minutes in seconds
  return timeUntilExpiration < minutesBeforeExpiration;
}

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
      console.log(data);

      if (isTokenAboutToExpire(data.exp)) {
        // Request a new token using your authentication method
        const newToken = await authService.requestNewToken();
        // Update req.user with the new token data
        req.user = { ...data, token: newToken };
      }

      req.user = data;
      return req;
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
