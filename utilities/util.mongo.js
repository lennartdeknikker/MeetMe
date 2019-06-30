// User model import
const mongoose = require("mongoose");
require("../models/users");
const User = mongoose.model("users");

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