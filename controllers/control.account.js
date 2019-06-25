// required modules
const passport = require("passport");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// User model import
require("../models/User");
const User = mongoose.model("user");

// registration loaders
exports.register = function (req, res) {
	res.render("pages/register", {
		headerText: "register",
		backLink: "/"
	});
};

exports.registerPost = function (req, res) {
	User.findOne({
			username: req.body.username
		})
		.then(user => {
			if (user) {
				console.log("error_message", "Username is already in use!");
				res.redirect("/register");
			} else {
				const newUser = new User({
					username: req.body.username,
					password: req.body.password,
					information_id: "5d11491f1c9d440000ee75d4"
				});

				// Bcrypt password hashing
				bcrypt.genSalt(10, (err, salt) => {
					bcrypt.hash(newUser.password, salt, (err, hash) => {
						if (err) throw (err);
						newUser.password = hash;
						newUser.save()
							.then(user => {
								// Redirect when succeeded
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

// login loaders
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

// logout loader
exports.logout = function (req, res) {
	req.logout();
	console.log("success_message", "You have successfully logged out!");
	res.redirect("/");
}