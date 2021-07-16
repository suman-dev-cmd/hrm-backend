const User = require('../model/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken')
const sendEmail = require('../utils/sendEmail')
const cloudinary = require('cloudinary')
const crypto = require('crypto');
exports.registerUser = catchAsyncErrors(async (req, res,next) => {
    const result = await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:'avatars',
        width:150,
        crop:"scale"
    })
    const {name,email,password} = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id: result.public_id,
            url:result.secure_url
        }
    });
    const token = user.getJwtToken();
    res.status(201).json({
        success:true,
        token 
    })
});

exports.loginUser = catchAsyncErrors(async (req, res,next) => {
    const {email,password} = req.body;
    console.log(email)
    console.log(password)
   if(!email || !password){
       return next(new ErrorHandler('Please Enter email & password',400))
   }
   const user = await User.findOne({email}).select('+password')
   if(!user){
    return next(new ErrorHandler('Invalid Email or Password',401))

   }
   const isPasswordMatched = await user.comperePassword(password);
   if(!isPasswordMatched){
    return next(new ErrorHandler('Password not matched',401))

   }
   const token = user.getJwtToken();
   res.status(201).json({
       success:true,
       token 
   })
});