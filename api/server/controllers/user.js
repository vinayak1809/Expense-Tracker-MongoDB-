const express = require("express");
const User = require("../src/models/user");
const JSAlert = require("alert");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getSignup = (req, res, next) => {
  res.render("user/signup", {
    pageTitle: "Add Product",
    path: "/",
    editing: false,
    formsCSS: true,
    login: false,
  });
};

exports.postSignup = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone_number = req.body.ph_num;
  const password = req.body.password;
  const saltRounds = 10;

  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      if (err) {
        res.json({ message: "Unable to create new user" });
      } else {
        User.create({
          name: name,
          email: email,
          phone_number: phone_number,
          password: hash,
        })
          .then((user) => {
            res.redirect("/login");
          })
          .catch((err) => {
            // console.log(err);
            res.status(403).json(err);
          });
      }
    });
  });
};

exports.getLogin = (req, res, next) => {
  res.render("user/signup", {
    path: "/",
    editing: false,
    formsCSS: true,
    login: true,
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findAll({ where: { email: email } })
    .then((user) => {
      if (user.length != 0) {
        bcrypt.compare(password, user[0].password, (err, response) => {
          if (err) {
            return res.status(402).json("something went wrong");
          } else if (response) {
            const token = jwt.sign(
              { user_id: user[0]._id },
              process.env.TOKEN_SECRET
            );

            res.json({ token: token, success: true, message: "successfull" });
            JSAlert("Successfuly logged in");
          } else {
            return res.status(404).json("invalid password");
          }
        });
      } else {
        return res.status(404).json("user not found");
      }
    })
    .catch((err) => {
      console.log(err, "err");
    });
};
