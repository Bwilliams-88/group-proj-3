import { gql } from "@apollo/client"; // eslint-disable-line no-unused-vars

export const GET_USER = gql`
  GetUser {
    user {
        _id
        firstName
        lastName
        email
        savedEvents
    }
  }
`;

export const GET_EVENT = gql`
  GetEvent {
    event {
        _id
        name
    }
  }
`;
