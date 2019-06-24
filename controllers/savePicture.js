require('dotenv').config();
const userId = "5cf6bef51c9d440000db960c";

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


// Save profile picture
function savePicture(req, res) {
    db.collection('information').updateOne({
        _id: new mongo.ObjectID(userId)
    }, {
        $set: {
            profilePictureUrl: req.file ? req.file.filename : null
        }
    }, done);

    function done(err, data) {
        if (err) {
            next(err);
        } else {
            res.redirect('/profile');
        }
    }
}

module.exports = savePicture;