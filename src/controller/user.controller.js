const User = require("../models/user.model");
const { apiResponse } = require("../utils/apiResponse");
const { customError } = require("../utils/customError");
const { asynchandler } = require("../utils/asynchandler");
const { validateUser } = require("../validation/user.validation");
const { emailSend } = require("../helper/helper");
const { RegistrationTemplate } = require("../template/template");
const userModel = require("../models/user.model");
const crypto = require('crypto');

//Registration controller
exports.registration = asynchandler(async (req, res) => {
    // Validate user input
    const value = await validateUser(req.body);
    const { firstName, email, password } = value;

    //todo: save user to DB
    const user = await new userModel({ firstName, email, password }).save();

     if (!user) {
        throw new customError(500, "RegistrationFailed", "Registration failed. Please try again");
    }

    // todo:random OTP generate
   const otp= crypto.randomInt(100000,999999) ;
   const expireTime=Date.now() + 10 * 60 * 60 * 1000;
   console.log(otp);
   const verifyLink=`https://form.com/verify-email/${email}`;
   const template =RegistrationTemplate(firstName,verifyLink,otp,expireTime);
   await emailSend(email,template);
   user.resetPasswordExpireTime = expireTime;
   await user.save();
   apiResponse.sendsuccess(res,201,"Registration Successfull",{
      // todo:postman e jeno shudhu firstName are email ta dekhai
   firstName,email
   });
  
  




});

   //todo:login
exports.login=asynchandler(async(req,res)=>{
   const validatedData=await validateUser(req);
   const {email,phoneNumber,password}=validatedData;
   //todo: Find the user
   const user = await userModel.findOne({$or:[{email:email},{phoneNumber:phoneNumber}]});
   const isPasswordMatch = await user.compareHashPassword(password);

   //todo:check if user exsists and password matches
   if(!user || !isPasswordMatch){
      throw new customError(400,"Your Password or email does not match");

   }
   
  
   // console.log(isPasswordMatch);

    
     //todo:make an access and refresh token
   const accessToken= await user.generateAccessToken();
   const refreshToken= await user.generateRefreshToken();

   const isProduction=process.env.NODE_ENV == "production";
   
   res.cookie("refreshToken",refreshToken,{
      httpOnly: true ,
      secure: isProduction ? true : false , //todo:http / https
      sameSite:"lax",
      path: "/" ,
      maxAge: 7 * 24 * 60 *60 *1000, //todo:7days

   });
    console.log(refreshToken);


     return apiResponse.sendsuccess(res, 200, "Login Successful", {
        user: { firstName: user.firstName, email: user.email }
    });

   });
