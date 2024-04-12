import express from "express"
import { createListing } from "../controller/Listing.controller.js"

const router = express.Router()

router.post("/create",createListing)

export default router