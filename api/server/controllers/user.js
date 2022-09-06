const express = require("express");
const User = require("../src/models/user");
var JSAlert = require("alert");

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
  User.findAll({ where: { email: email } }).then((user) => {
    if (user.length == 0) {
      User.create({
        name: name,
        email: email,
        phone_number: phone_number,
        password: password,
      })
        .then((result) => {
          JSAlert("Successfuly signed up");
          res.redirect("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      JSAlert("User already exists, Please Login");
    }
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
      if (user[0].password == password) {
        JSAlert("Successfuly logged in");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
