const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const store = require("store");
// var LocalStorage = require("node-localstorage").LocalStorage,
//   localStorage = new LocalStorage("./scratch");

const app = express();

app.use(express.static(path.join(__dirname, "/api/server/public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/api/server/views"));

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

dotenv.config();

// const authenticateTheToken = (req, res, next) => {
//   // const token =
//   //   req.body.token || req.query.token || req.headers["x-access-token"];
//   // console.log(store.get("token"), "ddd");
//   // token = store.get("token");
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];

//   console.log(authHeader);
//   if (!token) {
//     return res.status(403).send("A token is required for authentication");
//   } else {
//     const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
//     console.log(decoded, "decoded");
//     req.user = decoded;
//   }
// };
// // module.exports = verifyToken;
// app.use("/add-expense", authenticateTheToken);
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
