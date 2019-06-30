const mongoUtilities = require("../utilities/util.mongo");
const request = require("request");
const mongoose = require("mongoose");

exports.loadInfo = function (req, res) {
	let dogBreeds = [""];
	let catBreeds = [""];

	// Request dog breeds from an external API and save them as an array in "dogBreeds".
	request("https://dog.ceo/api/breeds/list/all", function (error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log("statusCode external Dog API request:", response && response.statusCode);
			let dogBreedsJSON = JSON.parse(body).message;
			for (let breed in dogBreedsJSON) {
				dogBreeds.push(breed);
			}
			// then call getCats()
			getCats();
		} else {
			console.log("error", error, response && response.statusCode);
			dogBreeds = null;
			getCats();
		}
	});

	// Request cat breeds from an external API and save them as an array in "catBreeds".
	function getCats() {
		request("https://api.thecatapi.com/v1/breeds", {
				"x-api-key": process.env.API_KEY_CATBREEDS
			},
			function (error, response, body) {
				if (!error && response.statusCode == 200) {
					console.log("statusCode external Cat API request:", response && response.statusCode);
					let catBreedsJSON = JSON.parse(body);
					for (let breed of catBreedsJSON) {
						catBreeds.push(breed.name);
					}
					// then call getInformation()
					getInformation();
				} else {
					console.log("error", error, response && response.statusCode);
					catBreeds = null;
					getInformation();
				}
			});
	}

	function getInformation() {
		mongoUtilities.findUser(req.session.passport.user).then(function (user) {
			res.render("pages/information", {
				headerText: "Change / Add Information",
				backLink: "/profile",
				data: user,
				dogBreeds: dogBreeds,
				catBreeds: catBreeds
			});
		});
	}

};

exports.saveInfo = function (req, res) {
	const User = mongoose.model("users");
	mongoUtilities.findUser(req.session.passport.user).then(function (user) {
		User.findOneAndUpdate({
			username: user.username
		}, {
			birthday: req.body.birthday,
			introduction: req.body.introduction,
			music: req.body.music,
			movies: req.body.movies,
			books: req.body.books,
			animal: req.body.animal,
			dogBreed: req.body.dogBreed,
			catBreed: req.body.catBreed
		}).then(function () {
				res.redirect("/profile");
			},
			err => {
				console.log(err);
			});
	});
};