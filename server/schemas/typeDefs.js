const typeDefs = `
    type Query {
        user: User
    }

    type mutation {
        login(email: String!, password: String!): Auth
        addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
        saveEvent(data: ID): User
    }

    type User {
        _id: ID
        firstName: String
        lastName: String
        email: String
    }

    type Event {
        _id: ID!
        description: String
        image: String
        link: String
        date: Date
        location: String
        name: String
        ticketQuantity: Number
        ticketPrice: Number
    }

    type Auth {
        token: ID!
        user: User
    }
`;

module.exports = typeDefs;
