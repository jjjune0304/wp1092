const mongoose = require('mongoose');
const http = require('http');
const WebSocket = require('ws');
const express = require('express');
const path = require('path');
const uuid = require('uuid');

const mongo = require('./mongo');

const app = express();

/* -------------------------------------------------------------------------- */
/*                               MONGOOSE MODELS                              */
/* -------------------------------------------------------------------------- */
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  chatBoxes: [{ type: mongoose.Types.ObjectId, ref: 'ChatBox' }],
});

const messageSchema = new Schema({
  //chatBox: { type: mongoose.Types.ObjectId, ref: 'ChatBox' },
  sender: { type: mongoose.Types.ObjectId, ref: 'User' },
  body: { type: String, required: true },
});

const chatBoxSchema = new Schema({
  name: { type: String, required: true },
  users: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  messages: [{ type: mongoose.Types.ObjectId, ref: 'Message' }],
});

const UserModel = mongoose.model('User', userSchema);
const ChatBoxModel = mongoose.model('ChatBox', chatBoxSchema);
const MessageModel = mongoose.model('Message', messageSchema);

/* -------------------------------------------------------------------------- */
/*                                  UTILITIES                                 */
/* -------------------------------------------------------------------------- */
const makeName = (name, to) => {
  return [name, to].sort().join('_');
};

/* -------------------------------------------------------------------------- */
/*                            SERVER INITIALIZATION                           */
/* -------------------------------------------------------------------------- */
const server = http.createServer(app);

//開一個新的web socket server
const wss = new WebSocket.Server({
  server,
});

app.use(express.static(path.join(__dirname, 'public')));

const validateUser = async (name) => {
  const existing = await UserModel.findOne({ name }); //看看這個名字的使用者在不在
  if (existing) return existing; //如果存在，則回傳存在的user
  return new UserModel({ name }).save();//如果不存在，則新增一個並回傳
};

const validateChatBox = async (name, participants) => {
  let box = await ChatBoxModel.findOne({ name });
  if (!box) box = await new ChatBoxModel({ name, users: participants }).save(); //如果不存在這個chatbox 新增一個chatbox
  return box
    .populate('users')
    .populate({ path: 'messages', populate: 'sender' })
    .execPopulate();
};

// (async () => {
//   const a = await validateUser('a');
//   const b = await validateUser('b');

//   console.log(a);

//   const cbName = makeName('a', 'b');

//   const chatBox = await validateChatBox(cbName, [a, b]);

//   console.log(chatBox);
// })();

const chatBoxes = {}; // keep track of all open AND active chat boxes
const connnection=[];

wss.on('connection', function connection(client) {
  client.id = uuid.v4();
  client.box = ''; // keep track of client's CURRENT chat box
  

  client.sendEvent = (e) => client.send(JSON.stringify(e));

  client.on('message', async function incoming(message) {  //message從client來的時候的處理
    message = JSON.parse(message);

    const { type } = message;

    switch (type) {
      // on open chat box
      case 'CHAT': {
        const {
          data: { name, to },
        } = message;

        const chatBoxName = makeName(name, to);

        const sender = await validateUser(name);
        const receiver = await validateUser(to);
        const chatBox = await validateChatBox(chatBoxName, [sender, receiver]);
        

        //***********先將之前使用者在的chatbox從記錄中刪除*ㄘㄨㄜ
        // if client was in a chat box, remove that. //*
        if (chatBoxes[client.box])
        {                                             //*
          // user was in another chat box            //*
          chatBoxes[client.box].delete(client); 
         }                                            //*
       //***********************************************

        // use set to avoid duplicates
        client.box = chatBoxName;
        if (!chatBoxes[chatBoxName]) chatBoxes[chatBoxName] = new Set(); // make new record for chatbox
        
        
        chatBoxes[chatBoxName].add(client); // add this open connection into chat box
        //console.log("(1)",chatBoxes)
        client.sendEvent({
          type: 'CHAT',
          data: {
            friend:to,
            key:chatBoxName,
            messages: chatBox.messages.map(({ sender: { name }, body }) => ({
              name,
              body,
            })),
          },
        });

        break;
      }

      case 'MESSAGE': {
        const {
          data: { name, to, body },
        } = message;
        const chatBoxName = makeName(name, to);
        
        const sender = await validateUser(name);
        const receiver = await validateUser(to);
        const chatBox = await validateChatBox(chatBoxName, [sender, receiver]);
        

        const newMessage = new MessageModel({ sender, body });
        //console.log("ppppppppppp")
        await newMessage.save();
        //console.log("hahaha")

        chatBox.messages.push(newMessage);
        await chatBox.save();

        //console.log("(2)",chatBoxes)
        //console.log("see",chatBoxes[chatBoxName])

        //broadcast給某個對話中的user
        chatBoxes[chatBoxName].forEach((client) => {
          client.sendEvent({
            type: 'MESSAGE',
            data: {
              key:chatBoxName,
              message: {
                name,
                body,
              },
            },
          });
        });
        //broadcast給某個對話中的user
      }
    
      case 'MESSAG': {
        const {
          data: { name, to, body },
        } = message;
        const chatBoxName = makeName(name, to);
        
        const sender = await validateUser(name);
        const receiver = await validateUser(to);
        const chatBox = await validateChatBox(chatBoxName, [sender, receiver]);
        

        const newMessage = new MessageModel({ sender, body });
        await newMessage.save();

        chatBox.messages.push(newMessage);
        await chatBox.save();

      
          client.sendEvent({
            type: 'MESSAG',
            data: {
              key:chatBoxName,
              message: {
                name,
                body,
              },
            },
          });
          

    
            




          
          //console.log("#######################################")
          //console.log("chatboxName",chatBoxes[chatBoxName])
          

          

      
      }








    }

    // disconnected
    client.once('close', () => {
      chatBoxes[client.box].delete(client);
    });
  });
});

mongo.connect();

server.listen(8080, () => {
  console.log('Server listening at http://localhost:8080');
});