//server/config/connection.js
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://ramosjustin728:NLHN0SMrlVdvyU3J@nexteventdb.3osg9xc.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("MongoDB connected successfully");
});

module.exports = db;
