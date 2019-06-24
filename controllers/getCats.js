const request = require('request');

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

module.exports = getCats;