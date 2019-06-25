const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Binnenhalen van story model
require('../models/User');
const User = mongoose.model('users');

router.get('/', (req, res) => {
	res.render('pages/register', {
		headerText: 'GREAT SUCCESS'
	});
});


router.post('/', (req, res) => {
		User.findOne({ username: req.body.username })
			.then(user => {
					const newUser = new User({
						username: req.body.username,
						password: req.body.password
					});
					// Gebruiken van bcrypt om wachtwoord te hashen
					bcrypt.genSalt(10, (err, salt) => {
						bcrypt.hash (newUser.password, salt, (err, hash) => {
							if (err) throw(err);
							newUser.password = hash;
							newUser.save()
								.then(user => {
									// Redirect met succesmelding
									console.log('GREAT SUCCESS!')
									res.redirect('/login');
								})
								.catch(err => {
									console.log(err);
									return;
								});
						});
					});
			});
	});


module.exports = router;