const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	name:  {
		type: String,
		required: true
	},
	birthday: {
		type: String,
		required: false
	},
	introduction: {
		type: String,
		required: false
	},
	music: {
		type: String,
		required: false
	},
	movies: {
		type: String,
		required: false
	},
	books: {
		type: String,
		required: false
	},
	animal: {
		type: String,
		required: false
	},
	dogBreed: {
		type: String,
		required: false
	},
	catBreed: {
		type: String,
		required: false
	},
	profilePictureUrl: {
		type: String,
		required: false
	}
});

mongoose.model("users", UserSchema);