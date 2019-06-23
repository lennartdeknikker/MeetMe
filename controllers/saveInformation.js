function saveInformation(req, res, next) {
    let savedData = req.body;
    if (savedData.animal === "dog") {
        savedData.catBreed = "";
    } else {
        savedData.dogBreed = "";
    }

    db.collection('information').updateOne({
        _id: new mongo.ObjectID(userId)
    }, {
        $set: savedData
    }, done);

    function done(err, data) {
        if (err) {
            next(err);
        } else {
            res.redirect('/profile');
        }
    }
}

module.exports = saveInformation;