const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { customError } = require("../utils/customError");
const { Schema, Types } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        
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
    region: {
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
    isBlocked: Boolean,
    refreshToken: {
        type: String,
        trim: true,
    },
    isActive: Boolean,
});

// Password Hashing
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const saltPassword = await bcrypt.hash(this.password, 10);
        this.password = saltPassword;
    }
    next()
})



// Check already this email exists or not
userSchema.pre('save', async function (next) {
    const findUser = await this.constructor.findOne({ email: this.email })
    if (findUser && findUser._id.toString() !== this._id.toString()) {
        throw new customError(400, "User already exists with this email!")
    }
    next()
})


userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        userId: this._id,
        email: this.email,
        role: this.role,
    },
    process.env.ACCESSTOKEN_SECRET, 
    { expiresIn: process.env.ACCESSTOKEN_EXPIRES }
    );
    return accessToken;
}


userSchema.methods.compareHashPassword = async function (humanPass)  {
    return await bcrypt.compare(humanPass,this.password)
}

userSchema.methods.generateRefreshToken = function (){
    return jwt.sign({
        userId: this._id,
    },
    process.env.REFRESHTOKEN_SECRET,
    { expiresIn: process.env.REFRESHTOKEN_EXPIRES }
    );
}

userSchema.methods.verifyAccessToken = async function (token){
    return await jwt.verify(token,process.env.ACCESSTOKEN_SECRET)
};

userSchema.methods.verifyRefreshToken = async function (token){
    return await jwt.verify(token,process.env.REFRESHTOKEN_SECRET)
}
 


module.exports = mongoose.model("User", userSchema)