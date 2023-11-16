const typeDefs = `
    type Query {
        user: User
    }

    type mutation {
        login(email: String!, password: String!): Auth
        addUser(name: String!, email: String!, password: String!): Auth
        saveEvent(data: ID): User
    }

    type User {
        _id: ID
        username: String
        email: String
    }

    type Event {
        _id: ID!
        description: String
        image: String
        link: String
    }

    type Auth {
        token: ID!
        user: User
    }
`;

module.exports = typeDefs;
