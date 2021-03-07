require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// const db = require("./app/models");

// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Db');
// })

var corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));
// app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/session.routes')(app);
require('./app/routes/task.routes')(app);
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Moment." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
