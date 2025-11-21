const express = require('express')
const testController = require("../../controller/testcontroller")
const _ = express.Router();

_.route("/test").get(testController.sayHi)
module.exports = _;