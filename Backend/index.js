import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import AuthRouter from "../Backend/routes/UserAuth.js";
import verifyEmail from "../Backend/routes/UserAuthentication.js"
import verifyOTP from "../Backend/routes/OTPAuthentication.js"
import loginRouter from "../Backend/routes/UserLogin.js"
import getUser from "../Backend/routes/GetUsers.js"
import createListing from "../Backend/routes/ProductListing.js"
import getProducts from "../Backend/routes/getProducts.js"
import sellerProduct from "../Backend/routes/getSellerListedProducts.js"
import productInfo from "../Backend/routes/getProductInfo.js"
import addtoWishlist from "../Backend/routes/AddToWishList.js"
import getwishlist from "../Backend/routes/getWishList.js"
import chatRouter from "../Backend/routes/ChatRouter.js"
import messageRouter from "../Backend/routes/MessageRouter.js"

dotenv.config();




const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to DB");
    app.listen(3000, () => {
      console.log("Server Started running on port 3000 ");
    });

app.use("/api/user",verifyEmail);
app.use("/api/user",verifyOTP)
app.use("/api/user",loginRouter)
app.use("/api/", getUser)
app.use("/api/", createListing)
app.use("/api/", getProducts)
app.use("/api/", sellerProduct)
app.use("/api/", productInfo)
app.use("/api/", addtoWishlist)
app.use("/api/", getwishlist)
app.use("/api", chatRouter)
app.use("/api/message",messageRouter)
   

    app.use("/api/user", AuthRouter);
    
    app.use((err, req, res, next) => {
      const statusCode = err.statusCode || 500;
      const message = err.message || "Internal server Error";
      return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
      });
    });



  })
  .catch((err) => {
    console.error(err);
  });

