const catchAsyncErrors=require("../middleware/catchAsyncErrors")

const stripe=require("stripe")(process.env.STRIPE_SECRET_KEY)
console.log("working")
exports.processPayment=catchAsyncErrors(async(req,res,next)=>{
    console.log("stripe",stripe)
    const myPayment=await stripe.paymentIntents.create({
        amount :req.body.amount,
        currency:"inr",
        metadata:{
            company:"Ecommerce",
        }
    });
    res.status(200).json( {success:true,client_secret:myPayment.client_secret})
});

exports.sendStripeApiKey=catchAsyncErrors(async(req,res,next)=>{
    res.status(200).json({stripeApiKey:process.send.STRIPE_API_KEY})
})