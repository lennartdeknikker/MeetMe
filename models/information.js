const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Aanmaken van schema voor een story
const InformationSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	birthday: {
		type: String,
		required: true
	},
	introduction: {
		type: String,
		required: true
	},
	music: {
		type: String,
		required: true
	},
	movies: {
		type: String,
		required: true
	},
	books: {
		type: String,
		required: true
	},
	animal: {
		type: String,
		required: true
	},
	dogBreed: {
		type: String,
		required: true
	},
	catBreed: {
		type: String,
		required: true
	},
	profilePictureUrl: {
		type: String,
		required: true
	}
});

mongoose.model("information", InformationSchema);