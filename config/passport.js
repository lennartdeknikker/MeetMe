const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;

// Binnenhalen van User model
const User = mongoose.model("users");

module.exports = function(passport){
	// Implementatie van lokale passport strategie
	passport.use(new LocalStrategy({ usernameField: "username" }, (username, password, done) => {
		// Zoeken van gebruiker in database
		User.findOne({ username: username }).then(user => {
			if(!user) {
				return done(null, false, {
					message: "No user has been found!"
				});
			}

			// Matchen van wachtwoord
			bcrypt.compare(password, user.password, (err, isMatch) => {
				if(err) throw err;
				if(isMatch) {
					return done(null, user);
				} else {
					return done(null, false, {
						message: "Login credentials are incorrect!"
					});
				}
			});
		});
	}));

	// Handhaven van sessions
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});
};