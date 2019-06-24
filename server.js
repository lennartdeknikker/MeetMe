// REQUIRED MODULES
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const multer = require('multer');
const session = require('express-session');

// GLOBAL VARIABLES
const userId = "5cf6bef51c9d440000db960c";

const available = require('./controllers/available');
const getCats = require('./controllers/getCats');
// const getInformation = require('./controllers/getInformation');
const home = require('./controllers/home');
const information = require('./controllers/information');
const login = require('./controllers/login');
const loginPage = require('./controllers/loginPage');
const logout = require('./controllers/logout');
const pageNotFound = require('./controllers/pageNotFound');
const picture = require('./controllers/picture');
const profile = require('./controllers/profile');
const remove = require('./controllers/remove');
const saveInformation = require('./controllers/saveInformation');
const settings = require('./controllers/settings');
const savePicture = require('./controllers/savePicture');

// MULTER SETUP (for uploading images)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './static/upload');
    },
    filename: function (req, file, cb) {
        cb(null, userId + '.jpg');
    }
});
const upload = multer({
    storage: storage
});

require('dotenv').config();

// MONGODB SETUP
const mongo = require('mongodb');
let db = null;
const url = 'mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@profiles-ttwoc.mongodb.net/test?retryWrites=true';

mongo.MongoClient.connect(url, {
    useNewUrlParser: true
}, function (err, client) {
    if (err) {
        throw err;
    }
    db = client.db(process.env.DB_NAME);
});

/* AUTHENTICATION MIDDLEWARE
source: https://www.codexpedia.com/node-js/a-very-basic-session-auth-in-node-js-with-express-js/ */
function auth(req, res, next) {
    if (req.session && req.session.user === "lennartdeknikker" && req.session.admin)
        return next();
    else
        res.redirect('/login');
};

/* function auth(req, res, next) {
    console.log(req.session.user);
    db.collection('login').find({
        username: req.session.user
    }).toArray(done);
    function done(err, data) {
        console.log(data);
        if (err) {
            next(err);
        } else if (req.session && req.session.user === data[0].username && req.session.admin) {
            return next();
        } else {
        res.redirect('/login');
        }
}
} */

// EXPRESS ROUTING SETUP
express()
    .set('view engine', 'ejs')
    .use(express.static(__dirname + '/static'))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({
        extended: true
    }))
    .use(session({
        secret: '2C44-4D44-WppQ38S',
        resave: true,
        saveUninitialized: true
    }))
    .get('/', auth, home)
    .get('/login', loginPage)
    .post('/login', login)
    .get('/logout', logout)
    .get('/profile', auth, profile)
    .get('/information', auth, information)
    .post('/information', auth, saveInformation)
    .get('/picture', auth, picture)
    .post('/picture', auth, upload.single('profilePicture'), savePicture)
    .get('/settings', auth, settings)
    .delete('/settings/:id', auth, remove)
    .get('/available', auth, available)
    .get('*', pageNotFound)
    .listen(process.env.PORT, function () {
        console.log('listening on port: ' + process.env.PORT);
    });



    // Get User Info from MongoDB,
    function getInformation() {
        db.collection('information').find({
            _id: new mongo.ObjectID(userId)
        }).toArray(done);

        // then render the page.
        function done(err, data) {
            if (err) {
                next(err);
            } else {
                res.render('pages/information', {
                    headerText: "Change / Add Information",
                    backLink: "/profile",
                    data: data[0],
                    dogBreeds: dogBreeds,
                    catBreeds: catBreeds
                });
            }
        }
    }