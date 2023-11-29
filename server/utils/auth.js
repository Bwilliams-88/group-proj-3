// server/utils/auth.js
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");

const secret = "password";
const expiration = "2h";

module.exports = {
  authenticationError: new GraphQLError("Could not authenticate user.", {
    extensions: {
      code: "UNAUTHENTICATED",
    },
  }),
  authMiddleware: function ({ req }) {
    try {
      // Get the token from the request headers
      const token = req.headers.authorization;

      if (!token) {
        throw new Error("Token not provided");
      }

      // Verify the token
      const { data } = jwt.verify(token, secret);
      req.user = data;

      return { req };
    } catch (error) {
      console.error("Authentication error:", error.message);
      return { req, error: this.authenticationError };
    }
  },
  signToken: function ({ email, name, _id }) {
    const payload = { email, name, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
