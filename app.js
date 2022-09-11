const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const store = require("store");

const app = express();

app.use(express.static(path.join(__dirname, "/api/server/public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/api/server/views"));

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

dotenv.config();

//routes
const userRoutes = require("./api/server/routes/user");

app.use(userRoutes);

//models
const sequelize = require("./api/server/util/database");

const User = require("./api/server/src/models/user");
const Expense = require("./api/server/src/models/expenses");

User.hasMany(Expense);
Expense.belongsTo(User);

sequelize
  .sync()
  .then(() => {
    app.listen(4000);
  })
  .catch((err) => {
    console.log(err);
  });
