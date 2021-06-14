import mongoose from "mongoose";


const { Schema } = mongoose;

const messageSchema = new Schema({
    chatBox: { type: mongoose.Types.ObjectId, ref: 'ChatBox' },
    sender: { type: mongoose.Types.ObjectId, ref: 'User' },
    body: { type: String, required: true },
});

const MessageModel = mongoose.model('Message', messageSchema);

export default MessageModel;