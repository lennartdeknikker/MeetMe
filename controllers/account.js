const passport = require("passport");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


// Binnenhalen van story model
require("../models/User");
const User = mongoose.model("user");

exports.register = function (req, res) {
	res.render("pages/register", {
		headerText: "register"
	});
};

exports.login = function (req, res) {
	res.render("pages/login", {
		headerText: "log in"
	});
};

exports.loginPost = function (req, res, next) {
	passport.authenticate("local", {
		successRedirect: "/index",
		failureRedirect: "/login"
	})(req, res, next);
};

exports.logout = function (req, res) {
	req.logout();
	console.log("success_message", "You have successfully logged out!");
	res.redirect("/");
}

exports.registerPost = function (req, res) {
	User.findOne({
			username: req.body.username
		})
		.then(user => {
			if (user) {
				console.log("error_message", "Username is already in use!");
				res.redirect("/register");
			} else {
				// Als gebruiker nog niet bestaat -> gebruikersnaam mag aangemaakt worden
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
};