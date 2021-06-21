import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
});

const messageSchema = new Schema({
  sender: { type: String, ref: 'User' },
  body: { type: String, required: true },
  chatBox: { type: String, ref: 'ChatBox' }
});

const chatBoxSchema = new Schema({
  name: { type: String, required: true },
  users: [{ type: String }],
  messages: [{ type: String, ref: 'Message' }],
});

const User = mongoose.model('User', userSchema);
const ChatBox = mongoose.model('ChatBox', chatBoxSchema);
const Message = mongoose.model('Message', messageSchema);

const db = {
    User,
    ChatBox,
    Message,
};
  
export { db as default };

// module.exports = {
//     User,
//     ChatBox,
//     Message
//  }