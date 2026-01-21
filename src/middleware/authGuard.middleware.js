const {customError} = require("../utils/customError.js")
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model.js");

exports.authGuard = async (req,_, next)=>{
    const token = req.headers.authorization || req.body ?.token;
    if(token){
      const decodedToken= jwt.verify(token,process.env.ACCESSTOKEN_SECRET);
      console.log(decodedToken);
    if(!decodedToken){
        throw new customError(401,"Unauthorized Access Token Missing");    
    }
     const findUser = await userModel.findById(decodedToken.userId);
    if(!findUser){
        throw new customError(401,"User not Found!");
    }else{
        
       let obj = {} ;
       obj.id = findUser._id;
       obj.email = findUser.email;
       obj.role = findUser.role;
       req.user = obj;
       next();
    }
    //todo:attach user to req object
     req.user = findUser ;

    }else{
        throw new customError(401,"Token not found");
     }
} 

