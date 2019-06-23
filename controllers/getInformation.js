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

module.exports = getInformation;