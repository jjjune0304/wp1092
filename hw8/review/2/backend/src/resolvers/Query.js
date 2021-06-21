const Query = {
  async msg(parent, {key}, { db }, info){
    let newmsg = await db.ChatBoxModel.find({name:key})
    newmsg = newmsg[0]
    if(!newmsg) throw new Error('Chatbox not dound');

    let returnchatbox={};
    returnchatbox.name = newmsg.name;
    returnchatbox.messages =await Promise.all(
      newmsg.messages.map((mId) => 
          db.MessageModel.findById(mId)),
    );
    console.log(returnchatbox)
    return returnchatbox
  },
  users(parent, args, { db }, info) {
    if (!args.query) {
      return db.users;
    }

    return db.users.filter((user) => {
      return user.name.toLowerCase().includes(args.query.toLowerCase());
    });
  },
  posts(parent, args, { db }, info) {
    if (!args.query) {
      return db.posts;
    }

    return db.posts.filter((post) => {
      const isTitleMatch = post.title
        .toLowerCase()
        .includes(args.query.toLowerCase());
      const isBodyMatch = post.body
        .toLowerCase()
        .includes(args.query.toLowerCase());
      return isTitleMatch || isBodyMatch;
    });
  },
  comments(parent, args, { db }, info) {
    return db.comments;
  },
  me() {
    return {
      id: '123098',
      name: 'Mike',
      email: 'mike@example.com',
    };
  },
  post() {
    return {
      id: '092',
      title: 'GraphQL 101',
      body: '',
      published: false,
    };
  },
};

export { Query as default };
