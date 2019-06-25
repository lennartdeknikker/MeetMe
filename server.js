/* eslint-disable no-undef */
/* eslint-disable no-console */
require("dotenv").config();

// Binnenhalen van node modules
const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const multer = require("multer");
const passport = require("passport");

// global variable to save the profile picture using the userID.
const userId = "5cf6bef51c9d440000db960c";

// Initiëren van applicatie
const app = express();
const port = process.env.PORT || 8080;

// Binnenhalen van routes
const routes = require("./routes/routes.index");

// Binnenhalen van passport config
require("./config/passport")(passport);

// require("dotenv").config();
// const mongooseURL = process.env.MONGO_DB_URL;

// Database setup -----------------------------------------
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

// Middleware setup ---------------------------------------
// EJS templating engine
app.set("view engine", "ejs");

// Body parser middleware
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());

// Sessions voor applicatie initialiseren
app.use(session({
	secret: "2C44-4D44-WppQ38S",
	resave: true,
	saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Flash message middleware
app.use(flash());

// Globale variablen voor applicatie
app.use((req, res, next) => {
	res.locals.user = req.user || null;
	next();
});

// Definiëren van public resources
app.use(express.static(__dirname + "/static"));

// MULTER SETUP (for uploading images)
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


// Routes op server ---------------------------------------
app.get("/", (req, res) => {
	res.render("pages/login", {
		headerText: "log in"
	});
});

app.post("/picture", upload.single("profilePicture"), savePicture);

app.get("/about", (req, res) => {
	res.render("about");
});

app.use("/", routes);

app.listen(port, () => {
	console.log(`Server has started at localhost:${port}`);
});

// Save profile picture
function savePicture(req, res) {
    db.collection("information").updateOne({
        _id: new mongo.ObjectID(userId)
    }, {
        $set: {
            profilePictureUrl: req.file ? req.file.filename : null
        }
    }, done);

    function done(err, data) {
        if (err) {
            next(err);
        } else {
            res.redirect("/profile");
        }
    }
}