const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const { custom }=require("joi");
const jwt = require('jsonwebtoken');
const { customError } = require("../utils/customError");
const { Schema, Types } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        required: true,
    },
    lastName: {
        type: String,
        trim: true,
    },
    companyName: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        trim: true,
        required: true,
    },
    image: {
        type: String,
        trim: true,
    },
    address: {
        type: String,
        trim: true,
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    isPhoneVerified: {
        type: Boolean,
        default: false,
    },
    role: {
        type: Types.ObjectId,
        ref: "Role",
    },
    permission: {
        type: Types.ObjectId,
        ref: "Permission",
    },
    reigon: {
        type: String,
        trim: true,
    },
    district: {
        type: String,
        trim: true,
    },
    city: {
        type: String,
        trim: true,
    },
    thana: {
        type: String,
        trim: true,
    },
    zipCode: {
        type: Number,
    },
    country: {
        type: String,
        trim: true,
        default: "Bangladesh",
    },
    dateofBirth: {
        type: Date,
    },
    gender: {
        type: String,
        enum: ["male", "female", "custom"],
    },
    lastLogin: {
        type: Date,
    },
    lastLogout: {
        type: Date,
    },
    cart: [{
        type: Types.ObjectId,
        ref: "Product",
    },],
    wishList: [{
        type: Types.ObjectId,
        ref: "Product",
    },],
    newsLetterSubscribe: Boolean,
    resetPasswordOTP: Number,
    resetPasswordExpireTime: Date,
    resetPasswordExpireTime: Boolean,
    isBlocked: Boolean,
    refreshToken: {
        type: String,
        trim: true,
    },
    isActive: Boolean,




})

// schema middleware
userSchema.pre('save', async function (next) {
    console.log(this.password)
    if (this.isModified('password')) {
        const saltPassword = await bcrypt.hash(this.password, 10);
        this.password = saltPassword;
    }
    next()
})

// check already exist this email or not
userSchema.pre('save', async function (next) {
    const findUser = await this.constructor.findOne({ email: this.email })
    if (findUser && findUser._id.toString() !== this._id.toString()) {
        throw new customError(400, "User already exists with this email!")
    }
    next()
})

// generate accessToken method 
userSchema.method.generateAccessToken = function (){
     const accessToken = jwt.sign({
        userId: this._id,
        email: this.email,
        role: this.role,
     },
    process.env.ACCESSTOKEN_EXPIRES,
    process.env.ACCESSTOKEN_SECRET
)
 return accessToken;
    
}
// generate refreshToken method 
userSchema.method.generateRefreshToken = function (){
      return jwt.sign({
        userId: this._id,
        
     },
    process.env.REFRESHTOKEN_EXPIRES ,
    process.env.REFRESHTOKEN_SECRET 
)
 return accessToken;
    
}

// verify access token 
userSchema.method.verifyAccessToken =  function (token){
      return jwt.verify(token,process.env.ACCESSTOKEN_SECRET)
    
}

// verify refresh token 
userSchema.method.verifyRefreshToken =  function (token){
      return jwt.verify(token,process.env.REFRESHTOKEN_SECRET)
    
}





 
module.exports = mongoose.model("User", userSchema)