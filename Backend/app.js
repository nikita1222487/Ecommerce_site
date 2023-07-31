const express = require('express');
const app = express();
const cookieParser=require("cookie-parser")

const errorMiddleware=require("./middleware/error")
var bodyParser = require('body-parser')
const fileUpload=require("express-fileupload")
const dotenv=require('dotenv');
//config
dotenv.config({path:"config/config.env"})
const cors=require('cors')
const corsOptions = {
  credentials: true,
  ///..other options
};
app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(cookieParser())

app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())
//Route Imports

const product=require("./routes/productRoute")
const user=require("./routes/userRoute")
const order=require("./routes/orderRoute")
const payment=require("./routes/paymentRouter")
app.use("/api/v1",product);

app.use("/api/v1",user);

app.use("/api/v1",order);
app.use("/api/v1",payment)
// Middleware for error


app.use(errorMiddleware);

module.exports = app;