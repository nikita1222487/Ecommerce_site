//Createing token and saving in cookies

const sendToken=(user,statusCode,res)=>{
    const token=user.getJWTToken();
    console.log("token2")
    console.log(token);
    const options ={
        expires:new Date(
            Date.now() + process.env.COOKIE_EXPIRE*24*60*60*1000
        ),
        httpOnly:true,
    };
    
    res.status(200).cookie("token",token,options).json({
        success:true,
        user,token
    })

}

module.exports=sendToken;