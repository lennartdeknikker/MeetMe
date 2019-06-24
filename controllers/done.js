const express = require('express');
const mongoose = require('mongoose');
let db = mongoose.connection;

module.exports = {
	done: function(err, data){
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
}