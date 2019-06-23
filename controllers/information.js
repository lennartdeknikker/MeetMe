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
}

module.exports = information;