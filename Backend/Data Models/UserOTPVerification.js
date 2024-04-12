
import mongoose from "mongoose";

const UserOTPVerificationSchema= mongoose.Schema({
    userID:String,
    otp:String,
    createdAt:Date,
    expiresAt:Date
}) 

const UserOTPVerification = mongoose.model("UserOTPVerification",UserOTPVerificationSchema)

export default UserOTPVerification