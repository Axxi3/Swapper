import express from "express"
import User from "../Data Models/Users.js";


const router=express.Router()

router.get("/user" , async(req,res,next)=>{
    const userId = req.query.id;

   try {
    let userExists= await User.find({_id:userId})
    if (userExists.length===0) return res.status(401).json("User not found") 
    
    //Return the user information
    res.status(200).send(userExists[0])

   } catch (error) {
    next(error)
   }

})


export default router