const mongoUtilities = require("../utilities/util.mongo");
const mongoose = require("mongoose");
let userAvailability = true;

// index page loader
exports.index = function (req, res) {
	userAvailability = false;
	res.render("pages/index", {
		userAvailability: userAvailability
	});
};

// index page loader when available
exports.indexAvailable = function (req, res) {
	userAvailability = true;
	res.render("pages/index", {
		userAvailability: userAvailability
	});
};

// profile page loader
exports.profile = function (req, res) {
	mongoUtilities.findUser(req.session.passport.user).then(function (user) {
		res.render("pages/profile", {
			headerText: "My Profile",
			backLink: "/index",
			profilePictureUrl: user.profilePictureUrl,
			aboutText: user.introduction
		});
	});
};

// profile page loader
exports.settings = function (req, res) {
	mongoUtilities.findUser(req.session.passport.user).then(function (user) {
		res.render("pages/settings", {
			headerText: "Settings",
			backLink: "/profile",
			username: user.username
		});
	});
};

exports.onDelete = function (req, res) {
	const User = mongoose.model("user");
	mongoUtilities.findUser(req.session.passport.user).then(function (user) {
		User.findOneAndRemove({
			username: user.username
		}).then(function () {
			res.redirect("/login");
		},
		err => {
			console.log(err);
		});
	});
};