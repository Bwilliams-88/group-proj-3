const db = require('./connection');
const eventDB = require('./EventDB');
const { Event, User } = require('../models')

db.once('open', async () => {
    await eventDB('Event', 'events');
    await eventDB('User', 'users');

    const events = await Event.insertMany([
        {
            name: 'Competitive Bird Feeding',
            price: 40,
            quantity: 300,
            date: 'March 24, 2024'
        },
        {
            name: 'Soccer FC Austin Game',
            price: 20,
            quantity: 500,
            date: 'May 9, 2024'
        },
        {
            name: 'National Hockey Showoff',
            price: 30,
            quantity: 500,
            date: 'June 4, 2024'
        },
        {
            name: 'League Swimmer Diving Teams',
            price: 20,
            quantity: 800,
            date: 'December 17, 2024'
        },
        {
            name: 'Ice Skating Champion Battle',
            price: 20,
            quantity: 400,
            date: 'September 28, 2024'
        },
        {
            name: 'F1 Duck racing',
            price: 60,
            quantity: 700,
            date: 'January 7, 2024'
        }
    ]);
    console.log('events seeded successfully!');

    await User.create({
        firstName: 'Justin',
        Lastname: 'Ramos',
        email: 'justinsfakeemail@gmail.com',
        password: 'justinsfakepw123',
    });

    await User.create({
        firstName: 'Kamila',
        lastName: 'Montes',
        email: 'kamilasfakeemail@gmail.com',
        password: 'kamillasfakepw123'
    });

    console.log('users seeded successfully!');

    process.exit();
});