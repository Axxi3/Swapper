import express from "express";
import WishList from "../Data Models/WishList.js";




const router= express.Router()


router.post('/addtoWishList', async (req, res, next) => {
    const { userID, product } = req.body;

    try {
        // Check if the wishlist already exists for the user
        let wishlist = await WishList.findOne({ userID });

        if (wishlist) {
            // Wishlist exists, update it
            wishlist.products.push(product);
            await wishlist.save();
            res.status(200).json({ message: 'Product added to wishlist' });
        } else {
            // Wishlist does not exist, create a new one
            wishlist = new WishList({
                userID,
                products: [product]
            });
            await wishlist.save();
            res.status(200).json({ message: 'New wishlist created and product added' });
        }
    } catch (error) {
        // Handle errors
        console.error(error);
    next(error)
    }
});


// router.get('/addtoWishList', async (req, res, next) => {
//     const {userID,product}=req.params;


//      try {
//         // Check if the wishlist already exists for the user
//                let wishlist = await WishList.findOne({ userID });
        
//                 if (wishlist) {
//                     // Wishlist exists, update it
//                     wishlist.products.push(product);
//                     await wishlist.save();
//                     res.status(200).json({ message: 'Product added to wishlist' });
//                 } else {
//                     // Wishlist does not exist, create a new one
//                     wishlist = new WishList({
//                         userID,
//                         products: [product]
//                     });
//                     await wishlist.save();
//                     res.status(200).json({ message: 'New wishlist created and product added' });
//                 }
//             } catch (error) {
//                 // Handle errors
//                 console.error(error);
//             next(error)
//             }
// })

export default router
