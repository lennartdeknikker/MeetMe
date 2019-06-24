// index page loader
exports.index = function (req, res) {
	res.render("pages/index", {
		headerText: "index",
		userAvailability: "true"
	});
};
