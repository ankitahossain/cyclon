
const asyncHandler  = require("../utils/asynchandler")
const { customError } = require("../utils/customError");
const { validateCategory } = require("../validation/category.validation");
const { apiResponse } = require("../utils/apiResponse");
const categoryModel= require("../models/category.model");
const { createTestAccount } = require("nodemailer");

const createCategory = asyncHandler(async (req,res)=>{
 const {name} = await validateCategory(req);
 console.log(name);
}) 

module.exports ={createCategory};