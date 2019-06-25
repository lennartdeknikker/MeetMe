const mongoUtilities = require("../utilities/util.mongo");
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