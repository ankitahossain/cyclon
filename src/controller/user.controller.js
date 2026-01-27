
const { apiResponse } = require("../utils/apiResponse");
const { customError } = require("../utils/customError");
const  asyncHandler  = require("../utils/asynchandler");
const { validateUser } = require("../validation/user.validation");
const { emailSend } = require("../helper/helper");
const { RegistrationTemplate } = require("../template/template");
const { resetpasswordemailtemplate } = require("../template/template")
const userModel = require("../models/user.model");
const crypto = require('crypto');
const { log } = require("console");

exports.registration = asyncHandler(async (req, res) => {
  const validatedData = await validateUser(req);
  const { firstName, email, phoneNumber, password } = validatedData;
  if (email == undefined && phoneNumber == undefined) {
    throw new customError(401, "email/phoneNumber required!!");
  }

  console.log(email);

  //todo:save the user inofo into database
  const finduser = await new UserModel({
    firstName,
    email: email || null,
    phoneNumber: phoneNumber || null,
    password,
  }).save();

  if (!finduser) {
    throw new customError(500, "user registration failed Try again later");
  }

  //todo:random OTP generate
  const otp = crypto.randomInt(100000, 999999);
  //todo:otp saving in the database
  finduser.resetPasswordOTP = otp;
  console.log(otp);
  const expireTime = Date.now() + 10 * 60 * 60 * 1000;
  if (user.email) {
    const verifyLink = `https://form.com/verify-email/${email}`;
    const template = RegistrationTemplate(
      firstName,
      verifyLink,
      otp,
      expireTime,
    );
    await emailSend(email, template);
  }

  //phone

  if (user.phoneNumber) {
    const verifyLink = `https://form.com/verify/${phoneNumber}`;
    const smsbody = `hi ${user.firstName},complete your registration here: ${verifyLink}
    This link will expre in [X hours/days].`;
    const smsInfo = await smsSend("01753441158", smsbody);
    if (smsInfo.response_code !== 202) {
      console.log("SMS not send", smsInfo);
    }
    console.log(smsInfo);
  }

  finduser.resetPasswordExpireTime = expireTime;
  //todo:saving otp and expire time to database
  await finduser.save();

  apiResponse.sendSuccess(res, 201, "Registration Successfull", {
    // todo:postman e jeno shudhu firstName are email ta dekhai
    firstName,
    email,
  });
});


//todo:login
exports.login = asyncHandler(async (req, res) => {
   const validatedData = await validateUser(req);
   const { email, phoneNumber, password } = validatedData;
   //todo: Find the user
   const user = await userModel.findOne({ $or: [{ email: email }, { phoneNumber: phoneNumber }] });
   const isPasswordMatch = await user.compareHashPassword(password);

   //todo:check if user exsists and password matches
   if (!user || !isPasswordMatch) {
      throw new customError(400, "Your Password or email does not match");

   }


   // console.log(isPasswordMatch);


   //todo:make an access and refresh token
   const accessToken = await user.generateAccessToken();
   console.log("Access Token:", accessToken);
   const refreshToken = await user.generateRefreshToken();
   console.log("Refresh Token:", refreshToken);

   const isProduction = process.env.NODE_ENV == "production";

   res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProduction ? true : false, //todo:http / https
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000, //todo:7days

   });
   console.log(refreshToken);

   // save the refresh token in db

   user.refreshToken = refreshToken

   return apiResponse.sendsuccess(res, 200, "Login Successful", {
      user: { firstName: user.firstName, email: user.email }
   });

});


// todo:email verification
exports.emailVerification = asyncHandler(async (req, res) => {
   if (!otp || !email) {
      throw new customError("401", "OTP or mail not found")
   }

   const findUser = await userModel.findOne({
      $and: [{ email: email, resetPasswordOTP: otp, resetPasswordExpireTime: { $gt: Date.now() }, }],
   });
   if (!finduser) {
      throw new customError(401, "Otp or time expire try again");
   }


   findUser.resetPasswordOTP = null;
   findUser.resetPasswordExpireTime = null;
   findUser.isEmailVerified = true;
   await findUser.save();


   apiResponse.sendsuccess(res, 200, "Email verified successfully", { email: findUser.email, firstName: findUser.firstName });

})


// todo: forget password
exports.forgetPassword = asyncHandler(async (req, res) => {
   const { email, firstName } = req.body;
   if (!email) {
      throw new customError(401, "Email missing");
   }
   const user = await userModel.findOne({ email: email })
   if (!user) {
      throw new customError("401", "User not found")
   }
   //todo:random OTP generate
   const otp = crypto.randomInt(100000, 999999);
   const expireTime = Date.now() + 10 * 60 * 60 * 1000;
   const verifyLink = 'http://form.com/resetpassoword/${email}';
   const template = resetpasswordemailtemplate(firstName, verifyLink, otp, expireTime);
   await emailSend(email, template);

   apiResponse.sendsuccess(res, 301, "check your email", null);
})


exports.resetPassword = asyncHandler(async (req, res) => {
   const { email, newPassword, confirmPassword } = req.body
   if (!newPassword) {
      throw new customError(401, "New password missing")
   }
   if (!confirmPassword) {
      throw new customError(401, "confirm password missing")
   }

   if (newPassword !== confirmPassword) {
      throw new customError(401, "password or confirm password does not match")
   }

   // find the user 
   const findUser = await userModel.findOne({ email })

   if (!findUser) {
      throw new customError(401, "User not found")
   }

   findUser.password = newPassword;
   findUser.resetPasswordOTP = null;
   findUser.resetPasswordExpireTime = null;
   await findUser.save();
   apiResponse.sendsuccess(res, 200, "Password reset successfully", findUser)


})



// logout 
exports.logout = asyncHandler(async (req, res) => {
   const findUser = await userModel.findOne({email:req.user.email})
   console.log(req.user);

   if (!findUser) {
      throw new customError(401, "User not found");
   }

   

   const isProduction=process.env.NODE_ENV == "production";
   

   //todo:clear the cookies
   res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: isProduction ? true : false,
      samSite: "none",
      path: "/", //This must match the path used when setting the cookie
   });

   // if(!refreshToken){
   //    throw new customError(401, "Refresh not found")
   // }



   findUser.refreshToken = null
   await findUser.save();
   apiResponse.sendsuccess(res, 200, "Logout Successfull", findUser);
})


// get me
exports.getMe = asyncHandler(async(req, res)=>{
   const id = req.user.id;
   const findUser = await userModel.findById(id);
   if(!findUser){
      throw new customError(401,"User not found")
   }
   apiResponse.sendsuccess(res,200,"User retrieved successfully",findUser)
})

// get refresh token
exports.refreshToken = asyncHandler(async(req,res)=>{
   const token = req.headers.cookoie.replace("refreshToken=","");
   console.log(token);

   if(!token){
      throw new customError(401,"Token not found!");
   }
   const findUser = await user.findOne({refreshToken:token});
   log(findUser);

   const accessToken = await findUser.generateAccessToken();
   
   apiResponse.sendsuccess(res, 200, "Email verified successfully", {accessToken:accessToken, firstName: findUser.firstName,email: findUser.email});
})



