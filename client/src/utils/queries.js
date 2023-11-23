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

export const QUERY_ALL_EVENTS = gql`
  {
    events {
      _id
      name
      description
      price
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
