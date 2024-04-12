import mongoose from "mongoose";


const userSchema=new mongoose.Schema({
    Name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    isVerified:{
        type:Boolean,
        default:true
    }
},{timestamps:true})

const User=mongoose.model("User",userSchema)
export default User