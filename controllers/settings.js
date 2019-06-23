function settings(req, res) {
    const headerText = "Settings";
    const backLink = "/profile";
    db.collection('information').find({
        _id: new mongo.ObjectID(userId)
    }).toArray(done);

    function done(err, data) {
        if (err) {
            next(err);
        } else {
            res.render('pages/settings', {
                headerText: headerText,
                backLink: backLink,
                id: data[0]._id
            });
        }
    }
}

module.exports = settings;