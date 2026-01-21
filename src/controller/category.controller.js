const { validate } = require("../models/user.model")
const { asynchandler } = require("../utils/asynchandler")
const { validateCategory } = require("../validation/category.validation")

exports.createCategory =asynchandler(async (req,res)=>{
 const value = await validateCategory(req)
 console.log(value)
}) 