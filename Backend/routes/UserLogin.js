import express from "express"
import User from "../Data Models/Users.js";
import bcryptjs from "bcryptjs"

const router=express.Router()

router.post("/login",async(req,res,next)=>{
    const {email,password}=req.body;
    try {
        let userExists= await User.findOne({email: email}); 

        if(userExists){
            //check password
            bcryptjs.compare(password,userExists.password,async(err,isValid)=>{
                if(err) throw err;
                    
                if(!isValid){
                    return res.status(401).send("Invalid Password");
                } else {
                    return res.status(201).json({success:true,message:"User Exists",id:userExists._id,isVerified:userExists.isVerified})
                }


                
            })
        } else {
            res.status(500).json({success:false,message:"Email doesnot Exists"})
        }
    } catch (error) {
        next(error)
    }
})


export default router