const express = require('express');
const authController = require("../../controller/user.controller");
const _ = express.Router();
_.route("/registration").post(authController.registration);
_.route("/login").post(authController.login);
module.exports = _ ;