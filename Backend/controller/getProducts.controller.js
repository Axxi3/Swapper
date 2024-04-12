import Product from "../Data Models/Products.js";


export const getProductsController= async(req,res,next)=>{
    try {
        const products= await Product.find()
        return res.status(200).json({success:true,data:products})
    } catch (error) {
        next(error)
    }
}