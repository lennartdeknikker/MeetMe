const mongoUtilities = require("../utilities/util.mongo");

// index page loader
exports.index = function (req, res) {
	res.render("pages/index", {
		headerText: "index",
		userAvailability: "true"
	});
};

// profile page loader
exports.profile = function (req, res) {
	console.log(req.session.passport.user);
	mongoUtilities.findUser(req.session.passport.user).then(function (user) {
		mongoUtilities.findInformationOfUser(user).then(function (information) {
			res.render("pages/profile", {
				headerText: "My Profile",
				backLink: "/index",
				profilePictureUrl: information.profilePictureUrl,
				aboutText: information.introduction
			});
		});
	});
};