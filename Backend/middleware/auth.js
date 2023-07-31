const { off } = require("../app");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt=require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser=catchAsyncErrors(async(req,res,next)=>{
    const {token}=req.cookies;
    console.log(token,"token1");
    if(!token)
    {
        next(new ErrorHandler("Please log in to access this resource",401));
    }
    const decodedData=jwt.verify(token,process.env.JWT_SECRET);

    req.user=await User.findById(decodedData.id)
    next()

    })
exports.authorizeRoles=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
             new  ErrorHandler(`Role:${req.user.role} is not allowed to access this resource`)
        };
        next();

    };
}


