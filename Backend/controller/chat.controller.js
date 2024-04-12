import chatModel from "../Data Models/ChatModel.js";


export const createChat=async(req,res,next)=>{
    const newChat = new chatModel({
        members:[req.body.senderId, req.body.receiverId]
    })

    try {
        const result = await newChat.save()
        res.status(200).json(result)
        
    } catch (error) {
        next(error)
    }
}

export const userChats = async (req, res, next) => {
    const userId = req.query.userId;
    console.log(userId)
    try {
        // Find chats where the user is a member
        const chats = await chatModel.find({
            members: { $in: [userId] } // Check if the user ID is in the 'members' array
        });
        res.status(200).json(chats);
    } catch (error) {
        next(error);
    }
};

export const findChat= async (req,res,next)=> {

    const {userOne,userTwo}=req.query;
    try {
        const chat= await chatModel.findOne({
            members:{$all:[userOne, userTwo]}
        })

        res.status(200).json(chat)
    } catch (error) {
        next(error)
    }
}