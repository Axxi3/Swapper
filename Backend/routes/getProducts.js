import express from "express"
import { getProductsController } from "../controller/getProducts.controller.js"

const router=express.Router()

router.get("/products",getProductsController)

export default router