/* eslint-disable no-unused-vars */
// client/src/pages/Event.jsx
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_EVENT } from "../utils/queries";
import { useParams } from "react-router-dom";
import EditEventForm from "../components/EditEventForm";
import AuthService from "../utils/auth";

const Event = () => {
  const { eventId } = useParams();
  const { loading, error, data } = useQuery(GET_EVENT, {
    variables: {
      eventId: eventId,
    },
  });

  const [showEditForm, setShowEditForm] = useState(false);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { event } = data;

  // Check if the user is authenticated
  const isAuthenticated = AuthService.loggedIn();
  // If not authenticated, handle accordingly (redirect to login page, etc.)
  if (!isAuthenticated) {
    return <p>You are not authenticated. Please log in.</p>;
  }
  // Check if the logged-in user created the event
  const isEventCreator =
    isAuthenticated && AuthService.getProfile().id === event.admin._id;

  console.log("AuthService.getProfile().id:", AuthService.getProfile().id);
  console.log("event.admin._id:", event.admin._id);
  console.log("isEventCreator:", isEventCreator);

  const handleEditButtonClick = () => {
    // Show the edit form only if the user is the event creator
    if (isEventCreator) {
      setShowEditForm(true);
    } else {
      // Show an error message if the user is not the admin
      console.error("User is not the event creator:", AuthService.getProfile());
      alert("You are not the admin user. Editing is not allowed.");
    }
  };

  console.log("isEventCreator:", isEventCreator);

  return (
    <main>
      <div>
        <h1>{event.name}</h1>
        <p>Description: {event.description}</p>
        <p>Date: {event.date}</p>
        <p>Location: {event.location}</p>
        <p>Ticket Quantity: {event.ticketQuantity}</p>
        <p>Ticket Price: {event.ticketPrice}</p>
        <img src={event.image} alt="Event" />

        <h4>Likes:</h4>
        <ul>
          {event.likes.map((user) => (
            <li key={user._id}>
              {user.firstName} {user.lastName} ({user.email})
            </li>
          ))}
        </ul>

        {/* Conditionally render the button */}
        {isEventCreator && (
          <button onClick={handleEditButtonClick}>Edit Event</button>
        )}

        {/* Conditionally render the EditEventForm */}
        {showEditForm && <EditEventForm eventId={eventId} />}
      </div>
    </main>
  );
};

export default Event;