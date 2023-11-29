//server/config/connection.js
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/nexteventDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("MongoDB connected successfully");
});

module.exports = db;
