import express from "express";
import WishList from "../Data Models/WishList.js";

const router = express.Router();

router.get('/wishlist', async (req, res, next) => {
    const { id } = req.query;

    try {
        const userExists = await WishList.findOne({ userID:id });
        if (userExists) {
            res.status(200).json({ success: true, userExists });
        } else {
            res.status(404).json({ success: false, message: "User not found" });
        }
    } catch (error) {
        next(error);
    }
});

export default router;
