import mongoose from "mongoose";

const chatschema = mongoose.Schema(
  {
    members: {
      type: Array
    }
  },
  { timestamps: true } // Add timestamps option here
);

const chatModel = mongoose.model("Chat", chatschema);
export default chatModel;
