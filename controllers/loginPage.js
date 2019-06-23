function loginPage(req, res) {

    res.render('pages/login', {
        headerText: "Log In"
    });
}

module.exports = loginPage;