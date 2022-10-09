const express = require("express");
const router = express.Router();

const premiumController = require("../controllers/premiumUser");
const middleware = require("../../middleware/auth");

router.post("/order", middleware.authenticate, premiumController.postOrder);
router.post("/verify", middleware.authenticate, premiumController.verifyOrder);
router.get("/key", middleware.authenticate, premiumController.key);

module.exports = router;
