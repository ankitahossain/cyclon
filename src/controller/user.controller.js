const User = require("../models/user.model");
const { apiResponse } = require("../utils/apiResponse");
const { customError } = require("../utils/customError");
const { asynchandler } = require("../utils/asynchandler");

exports.registration = asynchandler(async(req, res)=>{
    console.log(req.body)
  
})
