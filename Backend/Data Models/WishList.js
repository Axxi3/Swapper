import mongoose from "mongoose";

const WishListScheme=new mongoose.Schema({
    userID:{
        type: String,
    required: true,
    unique: true,
    },
    products:{
        type:Array,
        required:true
    }
})

const WishList=mongoose.model("WishList",WishListScheme)

export default WishList