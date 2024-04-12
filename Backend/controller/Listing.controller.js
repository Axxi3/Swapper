
import Product from "../Data Models/Products.js";
import Seller from "../Data Models/Seller.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Product.create(req.body);

    const sellerExists = await Seller.findOne({ sellerID: listing.sellerID });

    if (sellerExists) {
      // Seller exists, update product list
      sellerExists.productsID.push(listing._id); // Append product ID
      await sellerExists.save(); // Save the updated seller document
      console.log(
        `Product '${listing._id}' added to seller '${listing.sellerID}'`
      );
    } else {
      // Seller doesn't exist, create a new one with the product
      const newSeller = await Seller.create({
        sellerID: listing.sellerID,
        productsID: [listing._id], // Start with the new product ID
      });
      console.log(
        `New seller '${listing.sellerID}' created with product '${listing._id}'`
      );
    }

   

    res.status(201).json({message:"Data added SuccessFully",success:true}); // Send response with updated seller
  } catch (error) {
    next(error);
  }
};
