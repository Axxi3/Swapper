import MessageModel from "../Data Models/MessageModel.js";

export const addMessage = async (req, res,next) => {
    const {chatId,senderId,text}=req.body
    const message= new MessageModel({
        chatId,
        senderId,
        text
    })

    try {
        const result=await message.save()
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

export const getMessages=async (req,res,next)=>{
    const {chatId}=req.query;
    console.log(chatId)

    try {
        const result= await MessageModel.find({chatId:chatId})
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}