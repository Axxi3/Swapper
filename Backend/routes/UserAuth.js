
import express from "express"
import { signup } from "../controller/auth.controller.js"

const router =express.Router()

router.post("/sigup",signup)

export default router
