import express from "express";
import Product from "../Data Models/Products.js";


const router=express.Router();

router.get('/product-info',async(req,res,next)=>{
    const productID=req.query.id;

    try {
        const findProduct= await Product.find({_id:productID});
        if(!findProduct || findProduct == []){
            return res.status(404).json({message:"Product not found",success:false})
        }


        return res.status(200).json(findProduct)
    } catch (error) {
        next(error)
    }
})

export default router
