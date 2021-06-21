import uuidv4 from 'uuid/v4';

const Mutation = {
    createUser(parent, args, { db, pubsub }, info) {
        var userNotExist = db.User.find({name : args.name}) === null
        console.log(args.name)
        if(userNotExist){
            return db.User.findOne({name : args.name})
        }
        else{
            var user = new db.User({name:args.name})
            console.log(user)
            user.save()
            return user;
        }
    },

    async createChatBox(parent, { name1, name2 },
                                { db, pubsub }, info)
    {
        if (!name1 || !name2) throw new Error("Missing chatBox name for CreateChatBox");
        var userNotExist = db.User.find({name : name2}) === null
        // if (userNotExist) {
        //     console.log ("User does not exist for CreateChatBox: " + name2);
        //     await createUser(db, name2);
        // }
        const newKey = name1 <= name2 ?
                    `${name1}_${name2}` : `${name2}_${name1}`;
        console.log(newKey)
        var chatBoxNotExist = db.ChatBox.find({name : newKey}) === null
        
        var users = []
        users.push(name1)
        users.push(name2)
        //console.log(users)
        // if(chatBoxNotExist){
        console.log(true)
        var messages = []
        var chatBox = new db.ChatBox({id: uuidv4(), name: newKey, users: users, messages: messages})
        chatBox.save()
        return chatBox
        // }
        // else{
        //     console.log(false)
        //     return db.ChatBox.findOne({name : newKey})
        // }
        
    },

    createMessage(parent, args,
        { db, pubsub }, info)
    {
        // var user = db.User.findOne({name : args.data.sender})
        var message = new db.Message({id: uuidv4(),...args.data})
        
        message.save()
        // var chatBox = db.ChatBox.findOne({name : args.data.chatBox})
        //console.log(chatBox)
        console.log(message)
       
        pubsub.publish(`message`, {
            messages: {
                chatBox: args.data.chatBox,
                data: message,
            },
        });

        console.log("create message")
        return message
    }
}

export default Mutation;