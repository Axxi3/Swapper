import express from "express"
import bcryptjs from "bcryptjs"
import UserOTPVerification from "../Data Models/UserOTPVerification.js"

const router=express.Router()

router.post("/verify-otp",async(req,res,next)=>{
    const {id,otp}=req.body
    console.log("OTp-called")
    
   const result=await UserOTPVerification.find({userID:id})
   if (result.length) {
    const otpDoc = result[0];
    bcryptjs.compare(otp, otpDoc.otp, async (err, isValid) => {
        if (err) {
            next(err);
        } else {
            if (isValid) {
                // OTP is valid, delete the document
                try {
                    await otpDoc.deleteOne();
                    res.status(201).json({ message: "OTP is valid", success: true, id: id });
                } catch (error) {
                    res.status(500).json({ success: false, message: "Error deleting OTP document" });
                }
            } else {
                res.status(500).json({ success: false, message: "OTP is invalid" });
            }
        }
    });
}
else {
    console.log("No user Found")
   }
})


export default router;