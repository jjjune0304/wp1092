import db from './db';

const userData = [
  {
      name: "123"
  }
]
const chatBoxData = [
    {
        name: "123_234",
        users: ["123", "234"],
        messages: []
    }
]
const messageData = [
    {
        sender: "60c419e26dc9390c189ae524",
        body: "123",
        chatBox: "60c424e412dc2631b466c5bf"
    }
]

const dataInit = async () => {
    // await db.User.insertMany(userData)
    // await db.ChatBox.insertMany(chatBoxData)
    // await db.Message.insertMany(messageData)
}

export { dataInit }
