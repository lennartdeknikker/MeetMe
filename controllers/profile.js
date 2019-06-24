// index page loader
exports.index = function (req, res) {
	res.render("pages/index", {
		headerText: "index",
		userAvailability: "true"
	});
};

// profile page loader
require("dotenv").config();
const userId = "5cf6bef51c9d440000db960c";

const mongo = require("mongodb");
let db = null;
const url = "mongodb+srv://" + process.env.DB_USER + ":" + process.env.DB_PASS + "@profiles-ttwoc.mongodb.net/test?retryWrites=true";

mongo.MongoClient.connect(url, {
    useNewUrlParser: true
}, function (err, client) {
    if (err) {
        throw err;
    }
    db = client.db(process.env.DB_NAME);
});

exports.profile = function (req, res) {
    const headerText = "My Profile";
    const backLink = "/";
    db.collection("information").find({
        _id: new mongo.ObjectID(userId)
    }).toArray(done);

    function done(err, data) {
        if (err) {
            next(err);
        } else {
            res.render("pages/profile", {
                headerText: headerText,
                backLink: backLink,
                profilePictureUrl: data[0].profilePictureUrl,
                aboutText: data[0].introduction
            });
        }
    }
}