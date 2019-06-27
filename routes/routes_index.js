// express setup
const express = require("express");
const router = express.Router();

// authentication imports
const { ensureAuthenticated } = require("../utilities/util.auth");

// controller imports
const accountController = require("../controllers/controller_account");
const profileController = require("../controllers/controller_index");
const informationController = require("../controllers/controller_information");
const pictureController = require("../controllers/controller_picture");

// register and login routing
router.get("/", accountController.login);
router.get("/register", accountController.register);
router.post("/register", accountController.registerPost);
router.get("/login", accountController.login);
router.post("/login", accountController.loginPost);
router.get("/logout", accountController.logout);

// profile routing
router.get("/available",ensureAuthenticated, profileController.indexAvailable);
router.get("/index",ensureAuthenticated, profileController.index);
router.get("/profile",  ensureAuthenticated, profileController.profile);

// change information routing
router.get("/information", ensureAuthenticated, informationController.loadInfo);
router.post("/information", ensureAuthenticated, informationController.saveInfo);

// change picture routing
router.get("/picture", ensureAuthenticated, pictureController.loadPicture);
router.post("/picture", ensureAuthenticated, pictureController.savePicture);

// settings routing
router.get("/settings", ensureAuthenticated, profileController.settings);
router.delete("/settings/:username", ensureAuthenticated, profileController.onDelete);

module.exports = router;