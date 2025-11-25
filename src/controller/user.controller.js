const User = require("../models/user.model");
const { apiResponse } = require("../utils/apiResponse");
const { customError } = require("../utils/customError");
const { asynchandler } = require("../utils/asynchandler");
const {validateUser} = require("../validation/user.validation")
const { emailSend}= require("../helper/helper")
exports.registration = asynchandler(async(req, res)=>{
    const value = await validateUser (req.body)
   const {firstName, email,password} = value;

// save the user in database
const user = new User({
    firstName,
    email,
    password
}).save()


  if(!user){
    throw new customError(500,"Registration failed. Please try again")
  }
  await emailSend(email)
  apiResponse.sendsuccess(res,201,"registration successful","user")
})
