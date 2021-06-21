const ChatBox = {
    messages(parent, args, { db }, info) {
        // return Promise.all(
        //     parent.messages.map((mId) => 
        //         db.Message.findById(mId)),
        // );
        // return Promise.all(
        //     parent.messages.map(({chatBox}) => 
        //         db.Message.find({chatBox: chatBox})),
        // );
        // return db.Mesage.filter((message) => {
        //       return message.chatBox === parent.name;
        // });
        console.log(parent.name)
        return db.Message.find({chatBox : parent.name});
    },
};
  
export default ChatBox;
  