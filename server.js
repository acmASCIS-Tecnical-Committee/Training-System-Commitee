const express = require("express"); // include express so we can use it -> app
const mongoose = require("mongoose"); // to connect to the db
const bodyParser = require("body-parser"); // use bodyparser to parse req.body
const settings = require("./config/settings"); // to import ports from settings



const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB config
const db = require("./config/keys").mongodbURI;

// connect to mongodb
mongoose
  .connect(db , { useFindAndModify: false })
  .then(() => console.log("Database Connected."))
  .catch(err => console.log(err));


// use localhost:5000
app.listen(settings.backendPort, () =>
  console.log("server running " + settings.backendPort)
);
