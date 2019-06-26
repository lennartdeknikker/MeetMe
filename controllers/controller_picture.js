const mongoUtilities = require("../utilities/util.mongo");
const mongoose = require("mongoose");

exports.loadPicture = function (req, res) {
	mongoUtilities.findUser(req.session.passport.user).then(function (user) {
		res.render("pages/picture", {
			headerText: "Change picture",
			backLink: "/profile",
			profilePictureUrl: user.profilePictureUrl
		});
	});
};

exports.savePicture = function (req, res) {
	const User = mongoose.model("user");
	mongoUtilities.findUser(req.session.passport.user).then(function (user) {
		User.findOneAndUpdate({
			username: user.username
		}, {
			profilePictureUrl: req.file ? req.file.filename : null
		}).then(function () {
				res.redirect("/profile");
			},
			err => {
				console.log(err);
			});
	});
};