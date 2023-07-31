const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const { query } = require("express");

//Create Product --> Admin
exports.createProduct = catchAsyncErrors(async (req, res) => {
  req.body.user=req.user.id
  // console.log("got request", req.body);
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

//Get all product
exports.getAllProducts = catchAsyncErrors(async (req, res,next) => {

  const resultPerPage = 6;
  const productsCount =await Product.countDocuments();
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
   

    // let products=await apiFeature.query;

    // let filteredProductsCount=products.length;

    // apiFeature.pagination(resultPerPage);

    const products = await apiFeature.query;
  console.log(products)
  // console.log(products)
  res.status(200).json({
    success:true,
    products,
    productsCount,resultPerPage,
    // filteredProductsCount
  });
});

//Update Product--- Admin

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res
      .status(500)
      .json({ success: false, message: "Product not found" });
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
});
//Delete product

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product not found ",
    });
  }
  await product.remove();
  res.status(200).json({
    success: true,
    message: "Product deleted succes fully ",
  });
});

//get product detials

exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found ", 404));
    // res.status(500).json({
    //     success:false,
    //     message:"Product not found"
    // })
  }
  res.status(200).json({
    success: true,
    product,
  });
});


//Create new review or Update the review 

exports.createProductReview= catchAsyncErrors(async(req,res,next)=>{
  const {rating ,comment ,productId}= req.body




  const review ={
    user:req.user._id,
    name:req.user.name,
    rating:Number(rating), 
    comment 
  }
  const product=await Product.findById(productId);

  const isReviewed=product.reviews.find(rev=>rev.user.toString()===req.user._id.toString())

  if(isReviewed){
    product.reviews.forEach(rev=>{
      if(rev=>rev.user.toString()===req.user._id.toString())
      {
        
        
        (rev.rating=rating),
        (rev.comment=comment)
      }
    })
  }else{
    product.reviews.push(review)
    product.numberOFReviews=product.reviews.length;
  }

  let avg=0
  product.reviews.forEach(rev=>
    {
      avg+=rev.rating
    })
  product.ratings=avg/product.reviews.lemgth;

    await product.save({validateBeforeSave:false});
    res.status(200).json({
      success:true
    })
})

//GEt all product reviews
exports.getProductReviews=catchAsyncErrors(async(req,res,next)=>{
  const product=await Product.findById(req.query.Id);
  // console.log(req.query.id)
  if(!product){
    return next(new ErrorHandler("Product not found",404));
  }

  res.status(200).json({
    success:true,
    reviews:product.reviews,

  })
})

//Delete reviews

exports.deleteReview =catchAsyncErrors(async(req,res,next)=>{
  const product=await Product.findById(req.query.productId)

  if(!product)
  {
    return next(new ErrorHandler("Product not found ",404));
  }
  const review= product.reviews.filter(rev=>rev._id.toString() !== req.query.id.toString())

  let avg=0
  reviews.forEach(rev=>
    {
      avg+=rev.rating
    })
  const ratings=avg/reviews.lemgth;
  const numOfReviews =reviews.length;

  await product.findByIdAndUpdate(req,query.productId,{
    reviews,
    ratings,
    nmOfReviews
  },{
    new:true,
    runValidators:true,
    useFindAndModify:false
  })

  res.status(200).json({
    success:true,
  })
})




////Task to do /////
//remove pagination bug