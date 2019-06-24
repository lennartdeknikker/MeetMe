// express setup
const express = require("express");
const router = express.Router();

// authentication imports
const { ensureAuthenticated } = require("../utilities/auth");

// controller imports
const accountController = require("../controllers/account.js");
const profileController = require("../controllers/profile");

// register and login routing
router.get("/register", accountController.register);
router.post("/register", accountController.registerPost);
router.get("/login", accountController.login);
router.post("/login", accountController.loginPost);
router.get("/logout", accountController.logout);

// profile routing
router.get("/index",  ensureAuthenticated, profileController.index);

module.exports = router;