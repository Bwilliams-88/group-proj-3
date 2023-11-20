// server/server.js
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongooseConnection = require('./config/connection'); // Adjust the path as needed

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: 'thisismysecrectkey',
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 24 hours
    resave: false,
  })
);

// MongoDB connection
mongooseConnection.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

mongooseConnection.once('open', () => {
  console.log('MongoDB connected successfully');
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'register.html'));
});

app.post('/register', (req, res) => {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var userName = req.body.userName;
  var password = req.body.password;

  // Assuming 'con' is defined somewhere in your code
  // con.connect(...);

  // Assuming 'req.session.user' is set in your registration logic

  // Redirect or send some response
  res.send('User registered successfully!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
