// src/utils/queries.js
import { gql } from "@apollo/client";

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
  query GetEvent($eventId: ID!) {
    event(eventId: $eventId) {
      description
      _id
      admin {
        _id
      }
      date
      image
      likes {
        _id
      }
      location
      name
      ticketPrice
      ticketQuantity
    }
  }
`;


export const QUERY_ALL_EVENTS = gql`
  query GetAllEvents {
    events {
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

export const QUERY_CHECKOUT = gql`
  query getCheckout($tickets: [TicketInput]) {
    checkout(tickets: $tickets) {
      session
    }
  }
`;

export const QUERY_TICKET = gql`
  query getTicket($event: ID) {
    ticket(event: $ticket) {
      _id
      name
      description
      price
      quantity
      event {
        _id
      }
    }
  }
`;

// Fix the export for ADD_EVENT
export const ADD_EVENT = gql`
  mutation AddEvent($name: String!, $description: String!, $date: String!, $location: String!, $ticketQuantity: Int!, $ticketPrice: Int!, $image: String) {
    addEvent(name: $name, description: $description, date: $date, location: $location, ticketQuantity: $ticketQuantity, ticketPrice: $ticketPrice, image: $image) {
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

export const UPDATE_EVENT = gql`
  mutation UpdateEvent(
    $eventId: ID!
    $name: String
    $description: String
    $date: String
    $location: String
    $ticketQuantity: Int
    $ticketPrice: Float
    $image: String
  ) {
    updateEvent(
      eventId: $eventId
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
