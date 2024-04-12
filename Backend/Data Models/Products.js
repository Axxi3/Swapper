import mongoose from "mongoose";

const ProductScheme= new mongoose.Schema({
    class: {
        type: String,
       
      },
      image: {
        type: Array,
        
      },
      noOfWishList: {
        type:Array,
        default: [],
      },
      price: {
        type: Number,
        required: true,
      },
      dateTime: {
        type: Date,
        default: Date.now,
      },
      description: {
        type: String,
        required: true,
      },
      sellerID:{
        type: String,
        required: true,
      },
      name:{
        type: String,
        required: true,
      },
      downloadLink:{
        type:String,
        default:null
      }
},{timestamps:true})


const Product = mongoose.model('Product', ProductScheme);

export default Product