function pageNotFound(req, res) {
    res.status(404).render('pages/404');
}

module.exports = pageNotFound;