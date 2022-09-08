const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const app = express();
app.use(express.static(path.join(__dirname, "./api/server/public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/api/server/views"));

app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.json());

dotenv.config();

//models
const User = require("./api/server/src/models/user");
const sequelize = require("./api/server/util/database");

//routes
const userRoutes = require("./api/server/routes/user");
app.use(userRoutes);

sequelize
  .sync()
  .then(() => {
    app.listen(4000);
  })
  .catch((err) => {
    console.log(err);
  });
