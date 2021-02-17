const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes/api");
const path = require("path");
require("dotenv").config();

console.log("inside index.js script")
console.log(process.env.NODE_ENV)

const app = express();

const port = process.env.PORT || 5000;

//connect to the database
if (process.env.NODE_ENV == "test") {
  console.log("TEST DB IS WORKING", process.env.NODE_ENV);
  mongoose
    .connect(process.env.RECIPY_TEST, { useNewUrlParser: true })
    .then(() => console.log(`Test Database connected successfully`))
    .catch((err) => console.log(err));
} else if (process.env.NODE_ENV == "development"){
  console.log("DEV IS WORKING", process.env.NODE_ENV);
  mongoose
    .connect(process.env.RECIPY_DEV, { useNewUrlParser: true })
    .then(() => console.log(`Dev Database connected successfully`))
    .catch((err) => console.log(err));
} else {
  console.log("PROD IS WORKING", process.env.NODE_ENV);
  mongoose
    .connect(process.env.RECIPY_PROD, { useNewUrlParser: true })
    .then(() => console.log(`Prod Database connected successfully`))
    .catch((err) => console.log(err));
}
//since mongoose promise is depreciated, we overide it with node's promise
mongoose.Promise = global.Promise;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.json());

app.use("/api", routes);

app.use((err, req, res, next) => {
  console.log(err);
  next();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
