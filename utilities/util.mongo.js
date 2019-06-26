// User model import
const mongoose = require("mongoose");
require("../models/user");
const User = mongoose.model("user");

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

module.exports = mongoUtilities;