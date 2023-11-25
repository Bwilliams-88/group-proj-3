import React from "react";
import { useQuery } from "@apollo/client";
import { GET_EVENT } from "../utils/queries";

const Home = () => {
    const { loading, error, data } = useQuery(GET_EVENT);

    console.log(data)
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>

    const { event } = data;

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
                    {event.map((event, index) => (
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