/* eslint-disable no-unused-vars */
const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../utilities/auth");
const accountController = require("../controllers/account.js");

router.get("/register", accountController.register);
router.post("/register", accountController.registerPost);
router.get("/login", accountController.login);
router.post("/login", accountController.loginPost);
router.get("/logout", accountController.logout);

router.get("/index",  ensureAuthenticated, (req, res) => {
	res.render("pages/index", {
		headerText: "index",
		userAvailability: "true"
	});
});

module.exports = router;