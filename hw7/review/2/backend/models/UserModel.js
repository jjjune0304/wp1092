import mongoose from "mongoose";


const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true },
    chatBoxes: [{ type: mongoose.Types.ObjectId, ref: 'ChatBox' }],
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;