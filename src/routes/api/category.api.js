const express = require('express');
const _  = express.Router();

const {createCategory} = require("../../controller/category.controller")
const{authGuard}= require('../../middleware/authGuard.middleware');
const {upload} = require("../../middleware/multer.middleware");
const multerError = require("../../middleware/multerError.middleware");

_.route('/create-category').post(upload.fields([{
    name:"image" ,maxCount:1
}]),multerError,createCategory);



module.exports = _;