const ErrorHander = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail.js");
const ErrorHandler = require("../utils/errorhandler");
const cloudinary=require("cloudinary")

//REgister a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  
  const myCloud=await cloudinary.v2.uploader.upload(req.body.avatar,{
    folder:"avatars",
    width:150,
    crop:"scale",
  })

  const { name, email, password } = req.body;
  // console.log(email)
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });
  console.log(user)
  const token = await user.getJWTToken();
  sendToken(user, 201, res);
});

//login user

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  //checking if userhas given password and email both

  if (!email || !password) {
    return next(new ErrorHander("Please enter email & password ", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  // console.log(user)
  if (!user) {
    return next(new ErrorHander("Invalid email or password", 401));
  }
  const isPasswordMatched = await user.comparePassword(password);
  console.log(isPasswordMatched);
  if (!isPasswordMatched) {
    return next(new ErrorHander("Invalid email or password", 401));
  }
  sendToken(user, 200, res);
});

//Logout user

exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged out ",
  });
});

//Forgot password

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHander("User not found ", 404));
  }
  //Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPassworkUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPassworkUrl} \n\n If you have not requested this email then please ignore it `;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Reocvery `,
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHander(error.message, 500));
  }
});

//Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  //creating token hash
  const resetPasswordToken = crypto
    .createHash("")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHander(
        "Reset passsword token is invalid or has been expired ",
        404
      )
    );
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match passsword", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  sendToken(user, 200, res);
});

//Get user Detail

exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  console.log(user,"user")
  res.status(200).json({
    success: true,
    user,
  });
});

//update user password

exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect ", 401));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("password does not match ", 401));
  }
  user.password = req.body.newPassword;
  await user.save();

  sendToken(user, 200, res);
});

//update user password

exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  //cloudnary 

  if(req.body.avatar!==""){
    const user=await User.findById(req.user.id)
    
    const imageId=user.avatar.public_id

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud=await cloudinary.v2.uploader.upload(req.body.avatar,{
      folder:"avatars",
      width:150,
      crop:"scale",
    })

    newUserData.avatar={
      public_id:myCloud.public_id,
      url:myCloud.secure_url,    }
  }

  const user =await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindModify: false,
  });
  res.status(200).json({
    success:true
  })
});



//Get all users (admin)

exports.getAllUser=catchAsyncErrors(async(req,res,next)=>{

  const users=await User.find();
  res.status(200).json({
    success:true,
    users
  })
})


//Get single user (admin)
exports.getSingleUser=catchAsyncErrors(async(req,res,next)=>{
  const user= await User.findById(req.params.id);
  if(!user){
    return next(new ErrorHander(`user does not exist with id:${req.params.id}`))
  }
  res.status(200).json({
    success: true,
    user,
  }) 
})

//update user role---Admin

exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role:req.body.role
  };
  //We will add cloudinary later
  const user =await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindModify: false,
  });
  res.status(200).json({
    success:true
  })
});


//Delete user ---Admin

exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user =await User.findById(req.params.id)

  if(!user){
    return next(new ErrorHander( `User does not exist with ID: ${req.params.id}`))
  }

  await user.remove();

  res.status(200).json({
    success:true,
    message:"User delete successfully "
  })
});

