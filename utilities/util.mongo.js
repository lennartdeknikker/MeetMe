// User model import
const mongoose = require("mongoose");
require("../models/User");
const User = mongoose.model("user");
require("../models/Information");
const Information = mongoose.model("information");

require("dotenv").config();

const mongoUtilities = {};

// find a single user with the id from the session
mongoUtilities.findUser = function (id) {
	return User
		.findOne({
			_id: id
		})
		.then(function (user) {
			return user;
		});
};

// find user information by information-id
mongoUtilities.findInformationOfUser = function (user) {
	return Information
		.findOne({
			_id: user.information_id
		})
		.then(function (information) {
			return information;
		});
};

module.exports = mongoUtilities;