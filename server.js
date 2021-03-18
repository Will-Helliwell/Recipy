const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes/api");
const path = require("path");
require("dotenv").config();
const passport = require("passport");
const users = require("./routes/users");
const favorites = require("./routes/favorites")

const cors = require("cors");

const app = express();
app.use(cors());

const port = process.env.PORT || 5000;

const testDB = require("./config/keys").mongoTEST;
const devDB = require("./config/keys").mongoDEV;
const prodDB = process.env.mongoPROD;

//connect to the database
if (process.env.NODE_ENV == "test") {
  console.log("TEST DB IS WORKING", process.env.NODE_ENV);
  mongoose
    .connect(testDB, { useNewUrlParser: true })
    .then(() => console.log(`Test Database connected successfully`))
    .catch((err) => console.log(err));
} else if (process.env.NODE_ENV == "development") {
  console.log("DEV IS WORKING", process.env.NODE_ENV);
  mongoose
    .connect(devDB, { useNewUrlParser: true })
    .then(() => console.log(`Dev Database connected successfully`))
    .catch((err) => console.log(err));
} else {
  console.log("PROD IS WORKING", process.env.NODE_ENV);
  mongoose
    .connect(prodDB, { useNewUrlParser: true })
    .then(() => console.log(`Prod Database connected successfully`))
    .catch((err) => console.log(err));
}
//since mongoose promise is depreciated, we overide it with node's promise
mongoose.Promise = global.Promise;

app.use(cors()) // Use this after the variable declaration

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

app.use("/api", routes);

app.use((err, req, res, next) => {
  console.log(err);
  next();
});

app.use(express.static(path.join(__dirname, "client", "build")))
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);
app.use("/api/favorites", favorites);
app.listen(9999)
