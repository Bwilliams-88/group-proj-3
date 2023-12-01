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
    $name: String!
    $description: String!
    $date: String!
    $location: String!
    $ticketQuantity: Int!
    $ticketPrice: Int!
    $image: String
  ) {
    addEvent(
      name: $name
      description: $description
      date: $date
      location: $location
      ticketQuantity: $ticketQuantity
      ticketPrice: $ticketPrice
      image: $image
    ) {
      _id
      name
      description
      date
      location
      ticketQuantity
      ticketPrice
      image
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
