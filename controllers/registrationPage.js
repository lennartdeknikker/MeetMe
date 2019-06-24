function registrationPage(req, res) {

    res.render('pages/register', {
        headerText: "Register"
    });
}

module.exports = registrationPage;