const express = require("express");
const router = express.Router();
const head = require("../../../app");

const authController = require("../controllers/authorization");
const userExpense = require("../controllers/user");

router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);

router.get("/expense", userExpense.getExpenses);
router.post("/add-expense", userExpense.addExpense);

router.post("/delete-expense/:id", userExpense.deleteExpense);

module.exports = router;
