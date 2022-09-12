const express = require("express");
const router = express.Router();
const head = require("../../../app");

const authController = require("../controllers/authorization");
const userExpense = require("../controllers/user");
const middleware = require("../../middleware/auth");

router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);

router.get("/expense", middleware.authenticate, userExpense.getExpenses);
router.post("/add-expense", middleware.authenticate, userExpense.addExpense);

router.post("/password/forgotpassword", authController.postMail);
router.post(
  "/delete-expense",
  middleware.authenticate,
  userExpense.deleteExpense
);

module.exports = router;
