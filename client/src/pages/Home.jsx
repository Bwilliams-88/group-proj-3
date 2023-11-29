/* client/src/pages/Home.jsx */
/* eslint-disable no-unused-vars */
import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_EVENTS } from "../utils/queries";


const Home = () => {

    const { loading, error, data } = useQuery(QUERY_ALL_EVENTS);

    console.log("Loading:", loading);
    console.log("Error:", error);
    console.log("Data:", data);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    // Check if data and events exist before destructuring
    const events = data && data.events ? data.events : [];

    const containerStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    };

    const eventDivStyle = {
        backgroundColor: '#AF7577',
        border: '1px solid #6F4574',
        padding: '15px',
        margin: '10px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px #000'
    };

    return (
        <main>
            <div>
                <h1>Event Tracker Homepage</h1>
                <div style={containerStyle}>
                    {events.map((event, index) => (
                        <div key={index} style={eventDivStyle}>
                            <h1>{event.name}</h1>
                            <p>Description: {event.description}</p>
                            <p>Date: {event.date}</p>
                            <p>Location: {event.location}</p>
                            <p>Ticket Quantity: {event.ticketQuantity}</p>
                            <p>Ticket Price: {event.ticketPrice}</p>
                            <img src={event.image} alt={`Event ${index + 1}`} />
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};
export default Home;
