const { json } = require("express");
const { asynchandler } = require("../utils/asynchandler");
const { apiResponse } = require("../utils/apiResponse");
const { customError } = require("../utils/CustomError");


/**
 * sayHi=async(req, res,next) => {
   try {
     await func(req,res)
   } catch (error) {
      next(error)
   }
}
 */
exports.sayHi = asynchandler( async(req, res)=>{
    // console.log(req.url)    
    //  throw new Error("dargavfmf")

     throw new customError(401,"Client Error","Email is missing")
    
   })
    

// exports.sayHi = () =>{
//     console.log("Hi")
// }