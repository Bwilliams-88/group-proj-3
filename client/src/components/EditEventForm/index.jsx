//client/src/components/EditEventForm/index.jsx
import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_EVENT, GET_EVENT } from "../../utils/queries";

const EditEventForm = ({ eventId }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    location: "",
    ticketQuantity: 0,
    ticketPrice: 0,
    image: "",
  });

  // Use the useMutation hook to handle the updateEvent mutation
  const [updateEvent] = useMutation(UPDATE_EVENT);

  // Use the useQuery hook to fetch the current event data
  const { loading, error, data } = useQuery(GET_EVENT, {
    variables: { eventId },
  });

  // Update the form data when the query data changes
  useEffect(() => {
    if (data && data.event) {
      const { event } = data;
      setFormData({
        name: event.name,
        description: event.description,
        date: event.date,
        location: event.location,
        ticketQuantity: event.ticketQuantity,
        ticketPrice: event.ticketPrice,
        image: event.image,
      });
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call the updateEvent mutation with the new event details
      await updateEvent({
        variables: {
          eventId: eventId,
          ...formData,
        },
      });

      // Optionally, you can handle success or navigate the user to a different page
      console.log("Event updated successfully!");
    } catch (error) {
      console.error("Error updating event:", error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <form onSubmit={handleFormSubmit}>
      <label htmlFor="name">Event Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
      />

      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        name="description"
        value={formData.description}
        onChange={handleInputChange}
      ></textarea>

      {/* Add other form fields for date, location, ticketQuantity, ticketPrice, and image */}

      <button type="submit">Update Event</button>
    </form>
  );
};

export default EditEventForm;
