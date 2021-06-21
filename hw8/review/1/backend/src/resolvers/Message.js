const Message= {
    sender(parent, args, { db }, info) {
        return db.User.findOne({name : parent.sender});
    },
    chatBox(parent, args, { db }, info) {
        return db.ChatBox.findOne({name : parent.chatBox});
    },
};
  
export { Message as default };
  
  