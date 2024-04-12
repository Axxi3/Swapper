import express from "express";
import Seller from "../Data Models/Seller.js";

const router = express.Router();

router.get("/listed-products", async (req, res, next) => {
    const userID = req.query.id;

    try {
        // Query the database to find the seller by their ID
        const sellerExists = await Seller.findOne({ sellerID: userID });

        // Check if the seller exists
        if (!sellerExists) {
            return res.status(404).json({
                message: "Seller not found",
                success: false,
                numberOfItems: 0,
            });
        }

        // Seller found, return the details
        return res.status(200).json({
            message: "Seller found",
            success: true,
            numberOfItems: sellerExists.productsID.length,
            products: sellerExists.productsID,
        });
    } catch (error) {
        // Handle any errors that occur during the execution of the query
        console.error("Error retrieving seller:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message,
        });
    }
});

export default router;
