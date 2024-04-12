import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
  sellerID: {
    type: String,
    required: true,
    unique: true, // Ensures no duplicate SellerIDs exist
  },
  productsID: {
    type: [String],
    default: [],
  },
  pendingProducts: {
    type: Array,
    default: [],
  },
//   authDetails: {
//     type: {
//       email: {
//         type: String,
//         required: true,
//         unique: true, // Ensures no duplicate emails exist
//       },
//       password: {
//         type: String,
//         required: true,
//       },
//     },
//     required: true,
//   },
 Phone:{
    type:Number
 }
});

const Seller = mongoose.model('Seller', sellerSchema);
export default Seller
