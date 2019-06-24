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

/* require("dotenv").config();
const userId = "5cf6bef51c9d440000db960c";

const mongo = require("mongodb");
let db = null;
const url = "mongodb+srv://" + process.env.DB_USER + ":" + process.env.DB_PASS + "@profiles-ttwoc.mongodb.net/test?retryWrites=true";

mongo.MongoClient.connect(url, {
    useNewUrlParser: true
}, function (err, client) {
    if (err) {
        throw err;
    }
    db = client.db(process.env.DB_NAME);
}); */