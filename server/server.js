// server/server.js
const path = require('path');
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongooseConnection = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

// MongoDB connection
mongooseConnection.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

mongooseConnection.once('open', () => {
  console.log('MongoDB connected successfully');
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: 'thisismysecrectkey',
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 24 hours
    resave: false,
  })
);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'register.html'));
});

app.post('/register', (req, res) => {
  // Registration logic

  // Assuming 'req.session.user' is set in your registration logic

  // Redirect or send some response
  res.send('User registered successfully!');
});

// Define your GraphQL schema
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello, world!',
  },
};

// Create an Apollo Server instance
const server = new ApolloServer({ typeDefs, resolvers });

// Apply the Apollo Server middleware to Express
server.applyMiddleware({ app });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`GraphQL Playground at http://localhost:${PORT}${server.graphqlPath}`);
});
