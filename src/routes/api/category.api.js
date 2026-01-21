const express = require('express');
const authController = require("../../controller/user.controller");
const{authGuard}= require('../../middleware/authGuard.middleware');
const _ = express.Router();

_.route("/create-category").post()

module.exports = _;