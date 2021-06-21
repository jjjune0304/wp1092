const Query = {
    chatBoxes(parent, args, { db }, info) {
        return db.ChatBox.findOne({name : args.query});
    },
    users(parent, args, { db }, info) {
        // const filter = {};
        // const all = db.User.find(filter);
        return db.User.findOne({name : args.query})
    }
  };
  
  export { Query as default };
  