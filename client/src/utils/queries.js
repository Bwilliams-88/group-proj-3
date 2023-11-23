import { gql } from "@apollo/client"; // eslint-disable-line no-unused-vars

export const GET_USER = gql`
  query GetUser {
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
  query GetEvent {
    event {
      _id
      name
      description
      date
      location
      ticketQuantity
      ticketPrice
      image
      likes {
        _id
        // Include other user fields as needed
        firstName
        lastName
        email
      }
    }
  }
`;
