function login(req, res) {
    db.collection('login').find({
        username: req.body.username
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
}

module.exports = login;