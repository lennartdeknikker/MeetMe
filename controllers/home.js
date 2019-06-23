function home(req, res) {
    res.render('pages/index', {
        userAvailability: false
    });
}

module.exports = home;