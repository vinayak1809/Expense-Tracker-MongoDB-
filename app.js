const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const fs = require("fs");
const mongoose = require("mongoose");

const app = express();

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "/api/server/public")));
app.use(bodyParser.json());
app.use(cors());

dotenv.config();

////////////////////////////////////////////////////
//routes
////////////////////////////////////////////////////

const authRoutes = require("./api/server/routes/authRoutes");
const userRoutes = require("./api/server/routes/userRoutes");
const premiumUserRoutes = require("./api/server/routes/premiumUserRoutes");

app.use(authRoutes);
app.use(userRoutes);
app.use(premiumUserRoutes);

////////////////////////////////////////////////////
//models
////////////////////////////////////////////////////

const mongooseClient = mongoose
  .connect(process.env.DATABASE_CONNECT)
  .then(() => {
    app.listen(4000);
  });
