import express from "express"
import { addMessage, getMessages } from "../controller/Message.controller.js"

const router = express.Router()

router.post("/",addMessage)
router.get("/get",getMessages)

export default router