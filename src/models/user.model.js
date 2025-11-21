const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const {Schema,Types} = mongoose

const userSchema = new Schema({
    firstName:{
        type: String,
        trim: true,
        required: true,
    },
    lastName:{
        type: String,
        trim: true,
    },
    companyName:{
        type: String,
        trim: true,
    },
    email:{
        type: String,
        trim: true,
        unique: true,
        required: true,
    },
       password:{
        type: String,
        trim: true,
        required: true,
    },
    image:{
       type: String,
        trim: true, 
    },
    address:{
       type: String,
        trim: true, 
    },
    isEmailVerified:{
        type: Boolean,
        default: false,
    },
     isPhoneVerified:{
        type: Boolean,
        default: false,
    },
    role:{
        type: Types.ObjectId,
        ref:"Role",
    },
    permission:{
        type: Types.ObjectId,
        ref:"Permission",
    },
    reigon:{
        type: String,
        trim: true,
    },
    district:{
        type: String,
        trim: true,
    },
    city:{
        type: String,
        trim: true,
    },
    thana:{
        type: String,
        trim: true,
    },
    zipCode:{
        type: Number,
    },
    country:{
        type: String,
        trim: true,
        default:"Bangladesh",
    },
    dateofBirth:{
        type: Date,
    },
    gender:{
        type: String,
        enum:["male","female","custom"],
    },
    lastLogin:{
        type:Date,
    },
    lastLogout:{
        type:Date,
    },
    cart:[{
        type: Types.ObjectId,
        ref:"Product",
    },],
    wishList:[{
        type: Types.ObjectId,
        ref:"Product",
    },],
      newsLetterSubscribe: Boolean,
        resetPasswordOTP: Number,
         resetPasswordExpireTime :Date,
           resetPasswordExpireTime : Boolean,
           isBlocked : Boolean,
             refreshToken:{
                type: String,
                trim: true,
             },
             isActive:Boolean,
           



})

// schema middleware
userSchema.pre('save', async function(next){
    console.log(this.password)
    if(this.isModified('password'))
     {
        const saltPassword = await bcrypt.hash(this.password,10);
         this.password = saltPassword;
     }
     next()
})
module.exports = mongoose.model("User",userSchema)