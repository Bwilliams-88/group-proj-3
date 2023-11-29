//server/schemas/typeDefs.js

const typeDefs =`
  type Query {
    user: User
    events: [Event]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    saveEvent(data: ID): User
    addEvent(
      name: String!
      description: String!
      date: String!
      location: String!
      ticketQuantity: Int!
      ticketPrice: Float!
      image: String
    ): Event
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
  }

  type Like {
    _id: ID!
    firstName: String
    lastName: String
    email: String
  }

  type Event {
    _id: ID!
    name: String!
    description: String!
    date: String!
    location: String!
    ticketQuantity: Int!
    ticketPrice: Float!
    image: String
    admin: User!
    likes: [User]!
  }

  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;
