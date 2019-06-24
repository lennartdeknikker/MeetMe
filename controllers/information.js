require('dotenv').config();
const request = require('request');
const getCats = require('./getCats');
const userId = "5cf6bef51c9d440000db960c";
// const getInformation = require('./getInformation');

const mongo = require('mongodb');
let db = null;
const url = 'mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@profiles-ttwoc.mongodb.net/test?retryWrites=true';

mongo.MongoClient.connect(url, {
    useNewUrlParser: true
}, function (err, client) {
    if (err) {
        throw err;
    }
    db = client.db(process.env.DB_NAME);
});

function getInformation() {
	db.collection('information').find({
		_id: new mongo.ObjectID(userId)
	}).toArray(done);

	// then render the page.
	function done(err, data) {
		if (err) {
			next(err);
		} else {
			res.render('pages/information', {
				headerText: "Change / Add Information",
				backLink: "/profile",
				data: data[0],
				dogBreeds: dogBreeds,
				catBreeds: catBreeds
			});
		}
	}
}


function information(req, res, next) {
    let dogBreeds = [""];
    let catBreeds = [""];

    // Request dog breeds from an external API and save them as an array in 'dogBreeds'.
    request('https://dog.ceo/api/breeds/list/all', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log('statusCode external Dog API request:', response && response.statusCode);
            let dogBreedsJSON = JSON.parse(body).message;
            for (let breed in dogBreedsJSON) {
                dogBreeds.push(breed);
            }
            // then call getCats()
            getCats();
        } else {
            console.log('error', error, response && response.statusCode);
            dogBreeds = null;
            getCats();
        }
    });

    // Request cat breeds from an external API and save them as an array in 'catBreeds'.
    function getCats() {
        request('https://api.thecatapi.com/v1/breeds', {
                'x-api-key': process.env.API_KEY_CATBREEDS
            },
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log('statusCode external Cat API request:', response && response.statusCode);
                    let catBreedsJSON = JSON.parse(body);
                    for (let breed of catBreedsJSON) {
                        catBreeds.push(breed.name);
                    }
                    // then call getInformation()
                    getInformation();
                } else {
                    console.log('error', error, response && response.statusCode);
                    catBreeds = null;
                    getInformation();
                }
            });
		}

	function getInformation() {
        db.collection('information').find({
            _id: new mongo.ObjectID(userId)
        }).toArray(done);

        // then render the page.
        function done(err, data) {
            if (err) {
                next(err);
            } else {
                res.render('pages/information', {
                    headerText: "Change / Add Information",
                    backLink: "/profile",
                    data: data[0],
                    dogBreeds: dogBreeds,
                    catBreeds: catBreeds
                });
            }
        }
    }

}

module.exports = information;