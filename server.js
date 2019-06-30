// IMPORTS
require("dotenv").config();

// required node modules
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const multer = require("multer");
const passport = require("passport");

const pictureController = require("./controllers/controller_picture");
const routes = require("./routes/routes_index");
const userId = "5cf6bef51c9d440000db960c";

// EXPRESS
const app = express();
const port = process.env.PORT || 8080;

// PASSPORT
require("./config/passport")(passport);

// DATABASE
const dbConfig = require("./config/mongo");
mongoose.connect(dbConfig.mongoURI, {
	useNewUrlParser: true
});
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
	console.log("Database has started.");
});
db.on("reconnected", () => {
	console.log("Database has reconnected.");
});
db.on("disconnected", () => {
	console.log("Database has disconnected.");
});

// MULTER
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./static/upload");
    },
    filename: function (req, file, cb) {
        cb(null, userId + ".jpg");
    }
});
const upload = multer({
    storage: storage
});

// MIDDLEWARE
// EJS templating engine
app.set("view engine", "ejs");

// Body parser
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());

// Session
app.use(session({
	secret: "2C44-4D44-WppQ38S",
	resave: true,
	saveUninitialized: true
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Global application variables
app.use((req, res, next) => {
	res.locals.user = req.user || null;
	next();
});

// set root location for static files
app.use(express.static(__dirname + "/static"));

// ROUTING
app.post("/picture", upload.single("profilePicture"), pictureController.savePicture);
app.use("/", routes);
app.listen(port, () => {
	console.log(`Server has started at localhost:${port}`);
});
