require('dotenv').config();

const express = require('express');

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

function login(req, res) {
	db.collection('test').find({
		username: req.body.username,
		password: req.body.password
	}).toArray(done);

	function done(err, data) {
		if (!req.body.username || !req.body.password) {
				res.send('login failed');
			} else if (err) {
				next(err);
			} else if (data[0].password === req.body.password) {
				req.session.user = req.body.username;
				req.session.information_id = data[0].information_id;
				req.session.admin = true;
				res.redirect('/');
		}
	}
};

module.exports = login;