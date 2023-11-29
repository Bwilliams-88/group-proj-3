const db = require("./connection");
const { Event, User } = require("../models");
const cleanDB = require("./cleanDB");

db.once("open", async () => {
  await cleanDB("Event", "events");
  await cleanDB("User", "users");

  const events = await Event.insertMany([
    {
      name: "Competitive Bird Feeding",
      link: "https://google.com",
      image:
        "https://st4.depositphotos.com/20379936/27419/i/1600/depositphotos_274192892-stock-photo-wild-white-swans-resting-pond.jpg",
      ticketPrice: 40,
      ticketQuantity: 300,
      date: "March 24, 2023",
      location: "Grant Park, Chicago, IL",
      description:
        "A fun and friendly competition to help feed the local birds",
    },
    {
      name: "Soccer FC Austin Game",
      link: "https://google.com",
      image:
        "https://www.jchsofthebay.org/wp-content/uploads/2022/06/Copy-of-8V9A3132-1536x1025.jpg",
      ticketPrice: 20,
      ticketQuantity: 500,
      date: "May 9, 2024",
      location: "Emma Long Metropolitan Park, Austin, TX",
      description: "ITS A SHOWDOWN!!! Austin Aggies vs Dallas Diamondbacks",
    },
    {
      name: "National Hockey Showoff",
      link: "https://google.com",
      image:
        "https://www.fosters.com/gcdn/authoring/2011/10/17/NFDD/ghows-FD-c5d5e9fb-0271-4085-af50-07320a00c3e1-0092eb63.jpeg?width=640&height=426&fit=crop&format=pjpg&auto=webp",
      ticketPrice: 30,
      ticketQuantity: 500,
      date: "June 4, 2024",
      location: "Grosse Pointe Community Ice, Detroit, MI",
      description: "Battle of the Ice!! Detroit Demons vs River Rouge Rebels",
    },
    {
      name: "League Swimmer Diving Teams",
      link: "https://google.com",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Depart4x100.jpg/1280px-Depart4x100.jpg",
      ticketPrice: 20,
      ticketQuantity: 800,
      date: "December 17, 2024",
      location: "The YMCA, Montgomery, AL",
      description: "Come and enjoy a show from the Montgomery YMCA Barracudas",
    },
    {
      name: "Ice Skating Champion Battle",
      link: "https://google.com",
      image:
        "https://www.wsav.com/wp-content/uploads/sites/75/2022/02/GettyImages-1368865446.jpg?w=876&h=493&crop=1",
      ticketPrice: 20,
      ticketQuantity: 400,
      date: "September 28, 2024",
      location: "VFW Sports Center, Bismark, ND",
      description: "A Battle for the (Ice) Ages",
    },
    {
      name: "F1 Duck racing",
      link: "https://google.com",
      image:
        "https://af62359ed6764b37dd8d-a09ab6654f67c1c7801ec2e0698b9db1.ssl.cf2.rackcdn.com/images/Screen_Shot_2018-06-29_at_11.24.16_AM.png",
      ticketPrice: 60,
      ticketQuantity: 700,
      date: "January 7, 2024",
      location: "Green Bay, WI",
      description:
        "Who will QUACK under pressure at Fast & Furious Duck Racing",
    },
  ]);
  console.log("events seeded successfully!");

  await User.create({
    firstName: "Justin",
    lastName: "Ramos",
    email: "justinsfakeemail@gmail.com",
    password: "justinsfakepw123",
  });

  await User.create({
    firstName: "Kamila",
    lastName: "Montes",
    email: "kamilasfakeemail@gmail.com",
    password: "kamillasfakepw123",
  });

  await User.create({
    firstName: "Brandon",
    lastName: "Williams",
    email: "brandonsfakeemail@yahoo.com",
    password: "brandonsfakepw123",
    orders: [
      {
        events: [events[0]._id, events[0]._id, events[1]._id],
      },
    ],
  });

  console.log("users seeded successfully!");

  process.exit();
});
