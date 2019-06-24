/* eslint-disable no-unused-vars */
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const { ensureAuthenticated } = require("../utilities/auth");

// Binnenhalen van story model
require("../models/User");
const User = mongoose.model("user");

router.get("/login", (req, res) => {
	res.render("pages/login", {
		headerText: "log in"
	});
});

router.get("/index",  ensureAuthenticated, (req, res) => {
	res.render("pages/index", {
		headerText: "index",
		userAvailability: "true"
	});
});

router.post("/login", (req, res, next) => {
	let errors = [];

	// Validatie van gebruikersnaam
	function validateUserName(username) {
		let regEx = /^[a-zA-Z0-9]+$/;
		return regEx.test(username);
	}

	if (!validateUserName(req.body.username)) {
		errors.push({
			text: "You can only use the following characters for your username: a-z, A-z and 0-9"
		});
	}

	// Weergeven van flash messages bij fouten in registratie
	if (errors.length > 0) {
		res.render("pages/login", {
			headerText: "Log in",
			errors: errors
		});
	} else {
		passport.authenticate("local", {
			successRedirect: "/index",
			failureRedirect: "/login",
			failureFlash: true
		})(req, res, next);
	}
});

router.get("/register", (req, res) => {
	res.render("pages/register", {
		headerText: "register"
	});
});

router.post("/register", (req, res) => {
	User.findOne({
			username: req.body.username
		})
		.then(user => {
			if (user) {
				console.log("error_message", "Username is already in use!");
				res.redirect("/register");
			} else {
				// Als gebruiker nog niet bestaat -> gebruikersnaam mag aangemaakt worden
				let date = new Date;
				const newUser = new User({
					username: req.body.username,
					password: req.body.password,
					information_id: "123"
				});

				// Gebruiken van bcrypt om wachtwoord te hashen
				bcrypt.genSalt(10, (err, salt) => {
					bcrypt.hash(newUser.password, salt, (err, hash) => {
						if (err) throw (err);
						newUser.password = hash;
						newUser.save()
							.then(user => {
								// Redirect met succesmelding
								console.log("success_message",
									"You have successfully registered and you can now log in!"
								);
								res.redirect("/");
							})
							.catch(err => {
								console.log(err);
								return;
							});
					});
				});
			}
		});
});

// Uitloggen van gebruiker
router.get("/logout", (req, res) => {
	req.logout();
	console.log("success_message", "You have successfully logged out!");
	res.redirect("/");
});

module.exports = router;