const request = require("request");
const apiUtils = {};

apiUtils.getDogs = function () {
	let dogBreeds = [""];
	// Request dog breeds from an external API and save them as an array in "dogBreeds".
	request("https://dog.ceo/api/breeds/list/all", function (error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log("statusCode external Dog API request:", response && response.statusCode);
			let dogBreedsJSON = JSON.parse(body).message;
			for (let breed in dogBreedsJSON) {
				dogBreeds.push(breed);
			}
			return dogBreeds;
		} else {
			console.log("error", error, response && response.statusCode);
			dogBreeds = null;
			return dogBreeds;
		}
	});
};

apiUtils.getCats = function () {
	let catBreeds = [""];
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
				return catBreeds;
			} else {
				console.log("error", error, response && response.statusCode);
				catBreeds = null;
				return catBreeds;

			}

		});
};

module.exports = apiUtils;