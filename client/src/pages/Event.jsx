// client/src/pages/Event.jsx
import React from "react";
import { useQuery } from "@apollo/client";
import { GET_EVENT } from "../utils/queries";

const Event = () => {
  const { loading, error, data } = useQuery(GET_EVENT);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { event } = data;

  return (
    <div>
      <h1>{event.name}</h1>
      <p>Description: {event.description}</p>
      <p>Date: {event.date}</p>
      <p>Location: {event.location}</p>
      <p>Ticket Quantity: {event.ticketQuantity}</p>
      <p>Ticket Price: {event.ticketPrice}</p>
      <img src={event.image} alt="Event" />

      <h2>Likes:</h2>
      <ul>
        {event.likes.map((user) => (
          <li key={user._id}>
            {user.firstName} {user.lastName} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Event;
