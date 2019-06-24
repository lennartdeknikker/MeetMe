const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Aanmaken van schema voor een story
const UserSchema = new Schema({
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	information_id: {
		type: String,
		required: true
	}
});

mongoose.model("user", UserSchema);