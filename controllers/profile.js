function profile(req, res) {
    const headerText = "My Profile";
    const backLink = "/";
    db.collection('information').find({
        _id: new mongo.ObjectID(userId)
    }).toArray(done);

    function done(err, data) {
        if (err) {
            next(err);
        } else {
            res.render('pages/profile', {
                headerText: headerText,
                backLink: backLink,
                profilePictureUrl: data[0].profilePictureUrl,
                aboutText: data[0].introduction
            });
        }
    }
}

module.exports = profile;