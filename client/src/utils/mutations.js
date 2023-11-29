//src/utils/mutations.js
import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        firstName
        lastName
        email
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
      }
    }
  }
`;

export const ADD_EVENT = gql`
  mutation addEvent(
    $eventId: ID!
    $name: String!
    $description: String!
    $image: String
    $link: String!
  ) {
    addEvent(
      eventId: $eventId
      name: $name
      description: $description
      image: $image
      link: $link
    ) {
      event {
        _id
        name
        description
        image
        link
      }
    }
  }
`;

export const REMOVE_EVENT = gql`
  mutation removeEvent($eventId: ID!) {
    removeEvent(eventId: $eventId) {
      event {
        _id
      }
    }
  }
`;
