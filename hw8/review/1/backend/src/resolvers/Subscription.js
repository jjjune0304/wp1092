const Subscription = {
    messages: {
      subscribe(parent, args, { db, pubsub }, info) {
        // const chatBox = db.ChatBox.findOne({name: chatBoxName});
  
        // if (!chatBox) {
        //   throw new Error('Chat box not found');
        // }
        return pubsub.asyncIterator(`message`);
      },
    },
  };
  
export { Subscription as default };

