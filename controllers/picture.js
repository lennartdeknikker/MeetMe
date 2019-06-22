function picture(req, res) {
    db.collection('information').find({
        _id: new mongo.ObjectID(userId)
    }).toArray(done);

    function done(err, data) {
        if (err) {
            next(err);
        } else {
            res.render('pages/picture', {
                headerText: "Change picture",
                backLink: "/profile",
                profilePictureUrl: data[0].profilePictureUrl
            });
        }
    }
}

module.exports = picture;