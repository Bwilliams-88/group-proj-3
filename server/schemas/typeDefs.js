const typeDefs = `
    
    type Query {
        user: User
        events: [Event]
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
        saveEvent(data: ID): User
        addEvent(name: String!, description: String!, image: String, link: String!): User
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
        description: String
        image: String
        date: String
        location: String
        name: String
        ticketQuantity: Int
        ticketPrice: Int
        likes: [Like]
    }

    type Auth {
        token: ID!
        user: User
    }
`;

module.exports = typeDefs;
