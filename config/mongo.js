module.exports = {
	mongoURI: "mongodb+srv://" + process.env.DB_USER + ":" + process.env.DB_PASS +
		"@profiles-ttwoc.mongodb.net/test?retryWrites=true"
};