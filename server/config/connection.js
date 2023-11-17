//server/config/connection.js
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI || { dbName: "NexEvent-Finder" });

module.exports = mongoose.connection;
