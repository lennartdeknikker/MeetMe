function available(req, res) {
    res.render('pages/index', {
        userAvailability: true
    });
}

module.exports = available;