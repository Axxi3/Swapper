import express from "express"
import { createChat, findChat, userChats } from "../controller/chat.controller.js"

const router =express.Router()

router.post("/chat",createChat)
router.get("/chat",userChats)
router.get("/chat/find/", findChat)

export default router