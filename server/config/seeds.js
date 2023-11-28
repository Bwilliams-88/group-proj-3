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
        "https://depositphotos.com/photo/little-girl-feeding-birds-in-the-park-73982031.html",
      ticketPrice: 40,
      ticketQuantity: 300,
      date: "March 24, 2024",
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
        "https://www.fosters.com/story/sports/college/2011/10/17/wildcats-frustrated-by-slow-start/49867736007/",
      ticketPrice: 30,
      ticketQuantity: 500,
      date: "June 4, 2024",
      location: "Grosse Pointe Community Ice, Detroit, MI",
      description: "Battle of the Ice!! Detroit Demons vs River Rouge Rebels",
    },
    {
      name: "League Swimmer Diving Teams",
      link: "https://google.com",
      image: "https://swim.lifetime.life/programs/swim-team.html",
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
        "https://www.wsav.com/weather-news/storm-team-3-now/winter-olympics-2022-ice-skating-ice-rink-science/",
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
        "https://www.northernexpress.com/news/feature/on-your-mark-get-set-duck/",
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

  console.log("users seeded successfully!");

  process.exit();
});
