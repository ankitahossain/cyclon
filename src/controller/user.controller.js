const User = require("../models/user.model");
const { apiResponse } = require("../utils/apiResponse");
const { customError } = require("../utils/customError");
const { asynchandler } = require("../utils/asynchandler");
const {validateUser} = require("../validation/user.validation")
exports.registration = asynchandler(async(req, res)=>{
    const value = await validateUser (req)
   const {firstName, email,password} = value;

//save the user info into database

const user = new User({
    firstName,
    email,
    password
}).save()
  if(!user){
    throw new customError(500,"Registration failed. Please try again")
  }
  apiResponse.sendsuccess(res,201,"registration successful",user)
})
