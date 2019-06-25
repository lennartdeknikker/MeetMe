const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Binnenhalen van story model
require('../models/User');
const User = mongoose.model('users');

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

router.get('/', (req, res) => {
	res.render('pages/login', {
		headerText: 'GREAT SUCCESS'
	});
});


router.post('/', (req, res) => {
	db.collection('login').findOne({
		username: req.body.username,

	}, function(err, user) {
		console.log('User found ');
		// In case the user is not found
		if(err) {
			console.log('THIS IS ERROR RESPONSE')
			res.json(err)
		}
		if (user && user.password === req.body.password){
		  	console.log('User and password is correct')
		  	req.session.user = req.body.username;
			req.session.information_id = req.body.information_id;
			req.session.admin = true;
			res.redirect('/register');
		} else {
		  	console.log("Credentials wrong");
		  	res.json({data: "Login invalid"});
		}
	});
});

module.exports = router;